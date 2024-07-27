import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-engineers-list',
  templateUrl: './engineers-list.component.html',
  styleUrls: ['./engineers-list.component.css']
})
export class EngineersListComponent implements OnInit{

  constructor(private clientService:ClientService, private router:Router){}

  companyDatas:any[]=[]
  filteredCompanies: any[] = [];
  uniqueLocations: any[] = [];
  
  searchTerm: string = '';
  selectedLocation: string = '';
  selectedExperience: string = '';
  selectedRating: string = '';

  ngOnInit() {
    if(this.clientService.companyDatas){
      this.companyDatas=this.clientService.companyDatas
      this.filteredCompanies = this.companyDatas;
      this.uniqueLocations = [...new Set(this.companyDatas.map(company => company.state))];
    }
    else{
      this.clientService.companyDatasGet().subscribe(
        (response)=>{
          this.companyDatas=response
          this.clientService.companyDatas=response
          this.filteredCompanies = this.companyDatas;
          this.uniqueLocations = [...new Set(this.companyDatas.map(company => company.state))];
        },
        (error:any)=>{
          this.router.navigate(['/'])
          console.log(error)
        }
      )
    }
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCompanies = this.companyDatas.filter(company => {
      const matchesSearch = company.companyName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesLocation = this.selectedLocation ? (company.state) === this.selectedLocation : true;
      const matchesExperience = this.matchesExperienceFilter(company.experiance);
      const matchesRating = this.selectedRating ? company.rating >= parseInt(this.selectedRating) : true;

      return matchesSearch && matchesLocation && matchesExperience && matchesRating;
    });
  }

  matchesExperienceFilter(experience: number): boolean {
    if (!this.selectedExperience) return true;
    
    switch (this.selectedExperience) {
      case '0-1': return experience >= 0 && experience <= 1;
      case '2-3': return experience >= 0 && experience <= 3;
      case '4-5': return experience >= 0 && experience <= 5;
      case '6-10': return experience >= 6 && experience <= 10;
      default: return true;
    }
  }

  companyDetails(id:any){
    this.router.navigate(['/companyDetails',id])
  }
}
