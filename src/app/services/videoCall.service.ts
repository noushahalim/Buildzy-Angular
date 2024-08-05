import { Injectable } from "@angular/core";
import { ChatService } from './chat.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class VideoCallService {
    private peerConnection: RTCPeerConnection | null = null;
    private localStream: MediaStream | null = null;
    private remoteStream: MediaStream | null = new MediaStream();
    private callStatus = new BehaviorSubject<string>('idle');
    private currentReceiver: string | null = null;

    private localVideoElement: HTMLVideoElement | null = null;
    private remoteVideoElement: HTMLVideoElement | null = null;

    constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: true,
    };

    iceServers = {
        iceServers: [
            {
                urls: environment.turnUrl,
                username: environment.turnUsername,
                credential: environment.turncredential
            },
            {
              urls: 'stun:stun.l.google.com:19302'
            }
        ]
    };

    constructor(private chatService: ChatService) {}

    getCallStatus() {
        return this.callStatus.asObservable();
    }

    setVideoElements(localVideo: HTMLVideoElement, remoteVideo: HTMLVideoElement) {
        this.localVideoElement = localVideo;
        this.remoteVideoElement = remoteVideo;
        this.updateVideoStreams();
    }

    async startCall(receiver: string) {
        this.currentReceiver = receiver;
        this.callStatus.next('calling');
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(this.constraints);

            this.peerConnection = new RTCPeerConnection(this.iceServers);

            this.localStream.getTracks().forEach(track => {
                if (this.peerConnection && this.localStream) {
                    this.peerConnection.addTrack(track, this.localStream);
                }
            });

            this.peerConnection.ontrack = (event) => {
                event.streams[0].getTracks().forEach(track => {
                    if (this.remoteStream) {
                        this.remoteStream.addTrack(track);
                    }
                });
            };

            this.peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    this.chatService.sendSignalingMessage({
                        type: 'candidate',
                        candidate: event.candidate,
                        receiver: receiver
                    });
                }
            };

            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);

            this.chatService.sendSignalingMessage({
                type: 'offer',
                offer: offer,
                receiver: receiver
            });

            this.updateVideoStreams();

        } catch (error) {
            console.error('Error starting call:', error);
            this.callStatus.next('idle');
        }
    }

    async handleOffer(offer: RTCSessionDescriptionInit, sender: string) {
        this.currentReceiver = sender;
        this.callStatus.next('receiving');
        try {
            this.peerConnection = new RTCPeerConnection(this.iceServers);

            this.peerConnection.ontrack = (event) => {
                event.streams[0].getTracks().forEach(track => {
                    if (this.remoteStream) {
                        this.remoteStream.addTrack(track);
                    }
                });
            };

            this.peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    this.chatService.sendSignalingMessage({
                        type: 'candidate',
                        candidate: event.candidate,
                        receiver: sender
                    });
                }
            };

            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

            this.updateVideoStreams();

        } catch (error) {
            console.error('Error handling offer:', error);
            this.callStatus.next('idle');
        }
    }

    async acceptCall() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(this.constraints);

            this.localStream.getTracks().forEach(track => {
                if (this.peerConnection && this.localStream) {
                    this.peerConnection.addTrack(track, this.localStream);
                }
            });

            const answer = await this.peerConnection!.createAnswer();
            await this.peerConnection!.setLocalDescription(answer);

            this.chatService.sendSignalingMessage({
                type: 'answer',
                answer: answer,
                receiver: this.currentReceiver!
            });

            this.callStatus.next('inCall');
            this.updateVideoStreams();
        } catch (error) {
            console.error('Error accepting call:', error);
            this.callStatus.next('idle');
        }
    }

    rejectCall() {
        this.chatService.sendSignalingMessage({
            type: 'reject',
            receiver: this.currentReceiver!
        });
        this.endCall();
    }

    async handleAnswer(answer: RTCSessionDescriptionInit) {
        if (this.peerConnection) {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            this.callStatus.next('inCall');
        }
    }

    async handleIceCandidate(candidate: RTCIceCandidateInit) {
        if (this.peerConnection) {
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
    }

    handleReject() {
        this.endCall();
    }

    endCall(sendMessage: boolean = true) {
        if (sendMessage && this.currentReceiver) {
            this.chatService.sendSignalingMessage({
                type: 'endCall',
                receiver: this.currentReceiver
            });
        }
    
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        if (this.remoteStream) {
            this.remoteStream.getTracks().forEach(track => track.stop());
            this.remoteStream = new MediaStream();
        }
    
        if (this.localVideoElement) {
            this.localVideoElement.style.display = 'none';
        }
        if (this.remoteVideoElement) {
            this.remoteVideoElement.style.display = 'none';
        }
    
        this.currentReceiver = null;
        this.callStatus.next('idle');
    }
    
    handleRemoteEndCall() {
        this.endCall(false);
    }
    

    toggleAudio() {
        if (this.localStream) {
            const audioTrack = this.localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
            }
        }
    }

    toggleVideo() {
        if (this.localStream) {
            const videoTrack = this.localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
            }
        }
    }

    getLocalStream(): MediaStream | null {
        return this.localStream;
    }

    getRemoteStream(): MediaStream | null {
        return this.remoteStream;
    }

    private updateVideoStreams() {
        if (this.localVideoElement) {
            this.localVideoElement.srcObject = this.localStream;
            this.localVideoElement.style.display = this.localStream ? 'block' : 'none';
        }
        if (this.remoteVideoElement) {
            this.remoteVideoElement.srcObject = this.remoteStream;
            this.remoteVideoElement.style.display = this.remoteStream ? 'block' : 'none';
        }
    }
}
