import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compony-details',
  templateUrl: './compony-details.component.html',
  styleUrls: ['./compony-details.component.css']
})
export class ComponyDetailsComponent implements OnInit{
  componyDetails: any;
  error: any;

  constructor(private route:ActivatedRoute){}

  ngOnInit() {
    this.route.data.subscribe(
      (data)=>{
        this.componyDetails = data['componyDetails'];
      },
      (error)=>{
        this.error = error
      }
    )
  }
}
