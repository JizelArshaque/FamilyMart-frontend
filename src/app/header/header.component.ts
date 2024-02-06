import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetservicesService } from '../services/getservices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private api:GetservicesService){}

  searchKey:string=""
  
  loginusername:string=""

  count:number=0 
  cartcount:number=0

  ngOnInit(): void {
    if(sessionStorage.getItem("username")){
      this.loginusername = sessionStorage.getItem("username") || ""
      // for wishlist count thing badge
      this.api.wishlistCount.subscribe((res:any)=>{
        this.count =res
      })
      // for cartcount
      this.api.cartCount.subscribe((res:any)=>{
        this.cartcount=res
      })
    }else{
      this.loginusername = ""
    }
  }

  logout(){
    this.loginusername=""
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("")
  }


 

}
