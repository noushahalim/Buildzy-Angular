import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EngineerService } from 'src/app/services/engineer.service';
import { StatesDistrictsService } from 'src/app/services/statesDistricts.service';
import { State } from 'src/app/models/statesAndDistricts';

@Component({
  selector: 'shared-company-registration-form',
  templateUrl: './company-registration-form.component.html',
  styleUrls: ['./company-registration-form.component.css']
})
export class CompanyRegistrationFormComponent implements OnInit{

  registerForm!:FormGroup
  constructor(private formBuilder:FormBuilder , private engineerService:EngineerService , private statesDistrictsService:StatesDistrictsService){}

  imageUrl:string=''
  imageFile: any = null;
  @Input() isEditing = false;
  @Input() header:string=''
  statesAndDistricts!: State[];
  states: string[] = []; 
  selectedState: string = '';
  districts: string[] = [];
  

  @Output() registerData = new EventEmitter<any>
   companyDetails: any;

  ngOnInit() {
    this.statesAndDistricts = this.statesDistrictsService.statesAndDistricts;
    this.states = this.statesAndDistricts.map(state => state.state);
    if(this.isEditing){
      this.registerForm = this.formBuilder.group({
        companyName:['' ,[Validators.required]],
        image:[[]],
        companyEmail:['',[Validators.required,Validators.email]],
        companyMobile:[null,[Validators.required,Validators.pattern('^[0-9]{10}$')]],
        experiance:[null,[Validators.required]],
        state:['',[Validators.required]],
        district:['',[Validators.required]],
        description:['',[Validators.required]]
      })  
    }
    else{
      this.registerForm = this.formBuilder.group({
        companyName:['' ,[Validators.required]],
        image:[[],[Validators.required]],
        companyEmail:['',[Validators.required,Validators.email]],
        companyMobile:[null,[Validators.required,Validators.pattern('^[0-9]{10}$')]],
        experiance:[null,[Validators.required]],
        state:['',[Validators.required]],
        district:['',[Validators.required]],
        description:['',[Validators.required]]
      })
    }
    
    if (this.isEditing) {
      this.engineerService.companyDetails().subscribe(
        (response)=>{
          this.companyDetails = response
          const { logo, ...otherDetails } = this.companyDetails; 
          this.imageUrl = logo; 
          this.registerForm.patchValue(otherDetails); 
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    
  }

  onStateChange(event: any) {
    this.selectedState = event.target.value;
    this.districts = this.statesAndDistricts
      .find(state => state.state === this.selectedState)?.districts || [];
  }
 
  onImageChange(e: any){
    this.registerForm.value.image = e.target.files[0];
    this.imageUrl = URL.createObjectURL(e.target.files[0]);

    this.imageFile = e.target.files[0];
  }

  onSubmit(){
    
    if(this.registerForm.valid){
      this.emitData();
    } else {
      console.log('Form not valid');
    }
  }

  emitData() {
    const formData= new FormData()
    if(this.imageFile) {
      formData.append('image',this.imageFile);
    }
    formData.append('companyName',this.registerForm.value.companyName)
    formData.append('companyEmail',this.registerForm.value.companyEmail)
    formData.append('companyMobile',this.registerForm.value.companyMobile)
    formData.append('experiance',this.registerForm.value.experiance)
    formData.append('state',this.registerForm.value.state)
    formData.append('district',this.registerForm.value.district)
    formData.append('description',this.registerForm.value.description)
    this.registerData.emit(formData)
  }
}
