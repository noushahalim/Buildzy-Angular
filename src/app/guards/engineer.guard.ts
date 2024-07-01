import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EngineerService } from '../services/engineer.service';

export const engineerGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  if(state.url=='/engineer/companyRegistration'){
    const engineerService= inject(EngineerService)
    if(engineerService.id){
      return true
    }
    else{
      router.navigate(['auth/login'])
      return false
    }
  }
  else{
    const token = localStorage.getItem('token')
    const accessType = localStorage.getItem('accessType')
    if(!token||!accessType){
      router.navigate(['/auth/login'])
      return false;
    }
    else if(accessType=='client'){
      router.navigate(['/'])
      return false;
    }
    else if(accessType=='engineer'){
      return true;
    }
    else{
      router.navigate(['/'])
      return false;
    }
  }
  
};
