import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';

export const CompanyDetailsResolver:ResolveFn<any> = (route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{

  const clientService = inject(ClientService)
  const id = route.params['id']

  if(!id){
    return of(null)
  }
  
  return clientService.companyDetailsGet(id).pipe(
    catchError(error=>{
      console.error('Error retrieving company details:', error);
      return of(null)
    })
  )
};
