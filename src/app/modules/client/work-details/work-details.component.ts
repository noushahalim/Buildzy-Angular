import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css']
})
export class WorkDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute, private clientService: ClientService){}

  work:any
  error: string | null = null;

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
  }
}
