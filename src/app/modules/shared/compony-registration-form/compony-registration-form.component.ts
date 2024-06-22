import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EngineerService } from 'src/app/services/engineer.service';
import { StatesDistrictsService } from 'src/app/services/statesDistricts.service';
import { State } from 'src/app/models/statesAndDistricts';

@Component({
  selector: 'shared-compony-registration-form',
  templateUrl: './compony-registration-form.component.html',
  styleUrls: ['./compony-registration-form.component.css']
})
export class ComponyRegistrationFormComponent implements OnInit{

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
   componyDetails: any;

  ngOnInit() {
    this.statesAndDistricts = this.statesDistrictsService.statesAndDistricts;
    this.states = this.statesAndDistricts.map(state => state.state);
    if(this.isEditing){
      this.registerForm = this.formBuilder.group({
        componyName:['' ,[Validators.required]],
        image:[[]],
        componyEmail:['',[Validators.required,Validators.email]],
        componyMobile:[null,[Validators.required,Validators.pattern('^[0-9]{10}$')]],
        experiance:[null,[Validators.required]],
        state:['',[Validators.required]],
        district:['',[Validators.required]],
        description:['',[Validators.required]]
      })  
    }
    else{
      this.registerForm = this.formBuilder.group({
        componyName:['' ,[Validators.required]],
        image:[[],[Validators.required]],
        componyEmail:['',[Validators.required,Validators.email]],
        componyMobile:[null,[Validators.required,Validators.pattern('^[0-9]{10}$')]],
        experiance:[null,[Validators.required]],
        state:['',[Validators.required]],
        district:['',[Validators.required]],
        description:['',[Validators.required]]
      })
    }
    
    if (this.isEditing) {
      this.engineerService.componyDetails().subscribe(
        (response)=>{
          this.componyDetails = response
          const { logo, ...otherDetails } = this.componyDetails; 
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
    formData.append('componyName',this.registerForm.value.componyName)
    formData.append('componyEmail',this.registerForm.value.componyEmail)
    formData.append('componyMobile',this.registerForm.value.componyMobile)
    formData.append('experiance',this.registerForm.value.experiance)
    formData.append('state',this.registerForm.value.state)
    formData.append('district',this.registerForm.value.district)
    formData.append('description',this.registerForm.value.description)
    this.registerData.emit(formData)
  }
}
