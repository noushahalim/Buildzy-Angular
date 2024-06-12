import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  if(state.url=='/auth/signupOtp'){
    const commonService= inject(CommonService)
    if(commonService.id){
      return true
    }
    else{
      router.navigate(['auth/login'])
      return false
    }
  }
  else{
    const token = localStorage.getItem('token')
    if(!token){
      return true;
    }
    else{
      router.navigate(['/'])
      return false;
    }
  }
  
};
