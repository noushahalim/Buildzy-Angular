import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'engineer-navbar',
  templateUrl: './engineer-navbar.component.html',
  styleUrls: ['./engineer-navbar.component.css']
})
export class EngineerNavbarComponent {
  constructor(private commonService:CommonService, private formBuilder:FormBuilder, private route:Router){}

  logined:boolean=false
  profileChangeForm!:FormGroup
  profileImage:string=''
  name:string=''
  email:string=''
  buttonDisabled:boolean=false
  accessType:string | null=''
  notificationCount=0
  
  ngOnInit() {
    if(this.commonService.token){
      this.logined=true
      this.commonService.notificationCount().subscribe(
        (response)=>{
          this.notificationCount=response
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    this.profileChangeForm = this.formBuilder.group({
      image:[[],Validators.required]
    })
    if(this.commonService.profileImage){
      this.profileImage=this.commonService.profileImage
    }
    this.name= this.commonService.fullName
    this.email= this.commonService.email
    this.accessType = localStorage.getItem('accessType')
  }
  style1:string='pl-2 pr-2 h-8 text-sm text-[#303771] hover:text-white hover:bg-[#303771] duration-300 md:text-base lg:text-lg xl:text-xl'
  style2:string='rounded pl-4 pr-4 h-10 text-sm bg-green-900 text-white hover:text-green-900 hover:bg-white hover:border duration-300 md:text-base lg:text-lg xl:text-xl'
  style3:string='shadow-xl w-full pl-2 pr-2 h-8 text-sm text-[#303771] hover:text-white hover:bg-[#303771] duration-300'
  style4:string='w-full rounded pl-2 pr-2 h-6 text-sm bg-green-900 text-white hover:text-green-900 hover:bg-white hover:border duration-300 '
  menu:string='hidden'
  profile:string='hidden'
  showChangeProfileModal:boolean=false
  previewImageSrc:string=''
  imageFile:any = null
  
  menuClicked(){
    if(this.menu=='hidden'){
      this.menu='block'
    }
    else{
      this.menu='hidden'
    }
  }
  profileClicked(){
    if(this.name && this.email){
      if(this.profile=='hidden'){
        this.profile='block'
      }
      else{
        this.profile='hidden'
      }
    }
    else{
      this.commonService.profileDetails().subscribe(
        (response)=>{
          this.commonService.fullName = response.fullName;
          this.commonService.email = response.email;
          this.name = response.fullName;
          this.email = response.email;
          this.profile='block'
        },
        (error:any)=>{
          console.log(error)
        }
      )
    }
  }
  changeProfile(){
    this.showChangeProfileModal=true
    this.profile='hidden'
  }
  closeModal(){
    this.showChangeProfileModal=false
  }
  onImageUpload(event:any){
    this.profileChangeForm.value.image = event.target.files[0];
    this.previewImageSrc = URL.createObjectURL(event.target.files[0]);
    this.imageFile = event.target.files[0]
  }
  submitProfilePicture(){
    if (this.profileChangeForm.valid){
      this.buttonDisabled=true
      const data= new FormData()
      data.append('image',this.imageFile)
      
      this.commonService.profileChange(data).subscribe(
        (response)=>{
          console.log('success')
          localStorage.setItem('profileImage',response.profileImage)
          this.commonService.profileImage=response.profileImage
          this.profileImage=response.profileImage
          this.showChangeProfileModal=false
          this.buttonDisabled=false
        },
        (error:any)=>{
          console.log(error)
          this.buttonDisabled=false
        }
      )
    }
    else {
      console.error('Form is invalid:', this.profileChangeForm.errors);
    }
  }

  myCompany(){
    this.route.navigate(['/engineer/myCompany'])
  }

  logout(){
    localStorage.clear()
    window.location.reload();
  }
}
