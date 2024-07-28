import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-engineer-work-details',
  templateUrl: './engineer-work-details.component.html',
  styleUrls: ['./engineer-work-details.component.css']
})
export class EngineerWorkDetailsComponent implements OnInit {
  work: any;
  invoiceDetails:any
  error: string | null = null;
  milestonesChanged = false;
  originalMilestones: boolean[] = [];

  constructor(private route: ActivatedRoute, private engineerService: EngineerService) {}

  ngOnInit(): void {
    const workId = this.route.snapshot.paramMap.get('id');
    if (workId) {
      this.engineerService.engineerWorkDetails(workId).subscribe(
        (response) => {
          this.work = response;
          this.originalMilestones = this.work.milestones.map((m: any) => m.status);
          this.error = null;
        },
        (error) => {
          console.log(error);
          this.error = 'Failed to load work details. Please try again later.';
        }
      );

      this.engineerService.invoiceDetails(workId).subscribe(
        (response) => {
          this.invoiceDetails = response;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  canToggleMilestone(index: number): boolean {
    if (this.originalMilestones[index]) return false;
    if (index === 0) return true;
    return this.work.milestones[index - 1].status;
  }

  onMilestoneChange(index: number): void {
    if (!this.canToggleMilestone(index)) {
      this.work.milestones[index].status = this.originalMilestones[index];
      return;
    }

    if (!this.work.milestones[index].status) {
      for (let i = index + 1; i < this.work.milestones.length; i++) {
        if (!this.originalMilestones[i]) {
          this.work.milestones[i].status = false;
        }
      }
    }
    this.checkMilestonesChanged();
  }

  checkMilestonesChanged(): void {
    this.milestonesChanged = this.work.milestones.some((milestone: any, index: number) => 
      milestone.status !== this.originalMilestones[index]
    );
  }

  updateMilestones(): void {
    this.engineerService.updateMilestones(this.work._id, this.work.milestones).subscribe(
      (response) => {
        console.log('Milestones updated successfully:', response);
        this.originalMilestones = this.work.milestones.map((m: any) => m.status);
        this.milestonesChanged = false;
      },
      (error) => {
        console.error('Error updating milestones:', error);
      }
    );
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