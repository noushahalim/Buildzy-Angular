import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { componyRegistration } from 'src/app/models/componyRegistration';
import { EngineerService } from 'src/app/services/engineer.service';

@Component({
  selector: 'app-compony-edit',
  templateUrl: './compony-edit.component.html',
  styleUrls: ['./compony-edit.component.css']
})
export class ComponyEditComponent {
  constructor(private engineerService:EngineerService , private router:Router){}

  componyUp(data:any){
    
    const datas : componyRegistration =data as componyRegistration
    
    this.engineerService.componyUp(datas).subscribe(
      (response)=>{
        this.router.navigate(['/engineer'])
        
      },
      (error) => {
        console.error('Error:', error);
        alert('invalid access to server');
      }
    )
    
  }
}
