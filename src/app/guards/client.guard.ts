import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const clientGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  
  const accessType = localStorage.getItem('accessType')
  
  if(accessType=='engineer'){
    router.navigate(['/engineer'])
    return false;
  }
  else if(accessType=='client'){
    return true;
  }
  else{
    return true;
  }
  
};
