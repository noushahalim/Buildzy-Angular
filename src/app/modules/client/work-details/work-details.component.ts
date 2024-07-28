import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css']
})
export class WorkDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute, private clientService: ClientService, private fb: FormBuilder){}

  work:any
  invoiceDetails:any
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

      this.clientService.invoiceDetails(workId).subscribe(
        (response) => {
          this.invoiceDetails = response;
        },
        (error) => {
          console.log(error);
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

  // invvoice 
  workInvoice(id: string) {
    const data = document.getElementById('invoice-content');
    if (!data) return;
  
    // Remove the class that hides the invoice
    data.classList.remove('hide-on-print');
  
    // Force any images to load before rendering
    const images = Array.from(data.getElementsByTagName('img'));
    Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => { img.onload = img.onerror = resolve; });
    })).then(() => {
      // Render the invoice
      html2canvas(data, {
        scale: 2, // Increase resolution
        useCORS: true, // Allow loading cross-origin images
        backgroundColor: '#ffffff' // Force white background
      }).then((canvas) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save('Buildzy_invoice.pdf');
  
        // Add the class back to hide the invoice
        data.classList.add('hide-on-print');
      });
    });
  }
}
