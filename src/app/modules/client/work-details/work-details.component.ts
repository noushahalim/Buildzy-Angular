import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css']
})
export class WorkDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute, private clientService: ClientService, private fb: FormBuilder){}

  work:any
  error: string | null = null;
  reviewForm!: FormGroup;

  ngOnInit(): void {
    const workId = this.route.snapshot.paramMap.get('id');
    if (workId) {
      this.clientService.workDetails(workId).subscribe(
        (response) => {
          this.work = response;
          this.error = null;
        },
        (error) => {
          console.log(error);
          this.error = 'Failed to load work details. Please try again later.';
        }
      );
    }

    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating });
  }

  getRatingText(rating: number): string {
    const ratingTexts = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return rating > 0 ? ratingTexts[rating - 1] : 'Rate your experience';
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      const review ={
        rating:Number=this.reviewForm.value.rating,
        comment:String=this.reviewForm.value.comment,
        engineerId:String=this.work.engineerId
      }
      this.clientService.reviewSubmit(review).subscribe(
        (response)=>{
          this.reviewForm.reset({ rating: 0, comment: '' });
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }
}
