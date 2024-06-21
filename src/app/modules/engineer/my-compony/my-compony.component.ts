import { Component } from '@angular/core';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-my-compony',
  templateUrl: './my-compony.component.html',
  styleUrls: ['./my-compony.component.css']
})
export class MyComponyComponent {
  componyDetails: any;
  error: any;

  constructor(private engineerService:EngineerService){}

  ngOnInit() {
    this.engineerService.componyDetails().subscribe(
      (response)=>{
        this.componyDetails = response
      },
      (error)=>{
        this.error = error
      }
    )
  }
}
