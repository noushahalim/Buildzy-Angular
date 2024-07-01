import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-work-request',
  templateUrl: './work-request.component.html',
  styleUrls: ['./work-request.component.css']
})
export class WorkRequestComponent implements OnInit{
  workRequestForm: FormGroup;
  clientName: string = '';
  clientId: string = ''

  constructor(private fb: FormBuilder, private engineerService: EngineerService, private route:ActivatedRoute, private router:Router) {
    this.workRequestForm = this.fb.group({
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectLocation: ['', Validators.required],
      projectType: ['Residential', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      clientName: [{ value: this.clientName, disabled: true }, Validators.required],
      clientId: [{ value: this.clientId, disabled: true }, Validators.required],
      estimatedCost: ['', Validators.required],
      milestones: this.fb.array([
        this.fb.control('Pending', Validators.required),
        this.fb.control('Started', Validators.required),
        this.fb.control('50% Completed', Validators.required),
        this.fb.control('Completed', Validators.required)
      ])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = params['id'];
      this.workRequestForm.patchValue({ clientId: this.clientId });
    })

    this.engineerService.clientDetails(this.clientId).subscribe(
      (response)=>{
        this.clientName=response.fullName
        this.workRequestForm.patchValue({ clientName: this.clientName });
      },
      (error)=>{
        console.error(error);
      }
    )
  }

  get milestones(): FormArray {
    return this.workRequestForm.get('milestones') as FormArray;
  }

  addMilestone(): void {
    this.milestones.push(this.fb.control('', Validators.required));
  }

  onSubmit(): void {
    if (this.workRequestForm.valid) {
      const formData = this.workRequestForm.getRawValue();
      this.engineerService.submitWorkRequest(formData).subscribe(
        response => {
          console.log(response);
          this.router.navigate([`/engineer/chatDetails/${this.clientId}`])
        },
        error => {
          console.error('Error submitting work request', error);
        }
      );
    }
  }
}
