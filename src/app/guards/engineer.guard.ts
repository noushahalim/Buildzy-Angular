import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EngineerService } from '../services/engineer.service';

export const engineerGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  if(state.url=='/engineer/componyRegistration'){
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
    return true;
  }
  
};
