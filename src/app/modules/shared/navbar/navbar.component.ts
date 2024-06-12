import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private commonService:CommonService, private formBuilder:FormBuilder){}

  logined:boolean=false
  profileChangeForm!:FormGroup
  
  ngOnInit() {
    if(this.commonService.token){
      this.logined=true
    }
    this.profileChangeForm = this.formBuilder.group({
      image:[[],Validators.required]
    })



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
    if(this.profile=='hidden'){
      this.profile='block'
    }
    else{
      this.profile='hidden'
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
      const data= new FormData()
      data.append('image',this.imageFile)
      
      this.commonService.profileChange(data).subscribe(
        (response)=>{
          console.log('success')
          this.showChangeProfileModal=false
        },
        (error:any)=>{
          console.log(error)
        }
      )
    }
    else {
      console.error('Form is invalid:', this.profileChangeForm.errors);
    }
  }
}
