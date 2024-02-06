import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetservicesService } from '../services/getservices.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder, private api:GetservicesService, private router:Router){}

  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })


  login(){
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
       const user = {email ,password}

       this.api.loginApi(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)
          
          Swal.fire("login Succefful!")
          this.router.navigateByUrl('')
        },
        error:(err:any)=>{
          Swal.fire(err.error)
        }
       })


      
    }else{
      Swal.fire("Please try again");
      
    }
    

  }


}
