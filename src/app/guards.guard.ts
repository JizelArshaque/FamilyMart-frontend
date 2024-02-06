import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

export const guardsGuard: CanActivateFn = (route, state) => {
  // return true;
const authstatus=inject(AuthService)
const router = inject(Router)

if(authstatus.islogged()){
  return true
}else{
  Swal.fire("Pleazse login again!")
  router.navigateByUrl("")
  return false
}

};
