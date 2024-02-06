import { Component, OnInit } from '@angular/core';
import { GetservicesService } from '../services/getservices.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  constructor(private router:Router,private api:GetservicesService){
  }

  
  
  allProduct:any=[]
  searchKey:string=""
  // result:any=[]
  p:number=1
  
  
  loginusername:string=""

  count:number=0 
  cartcount:number=0

  ngOnInit(): void {
  this.api.getAllProductApi().subscribe({
    next:(res:any)=>{
      this.api.getWishlistCount()
      
      console.log(res);
      this.allProduct=res
      
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })  

  this.api.getcartCountApi()
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


  // search(){
  //   // this.allProduct = SearchPipe.transform(this.allProduct,this.searchKey)
  //   const result:any=[]
  //   if(!this.allProduct || this.searchKey === ""){
  //     return this.allProduct
  //   }

  //   this.allProduct.forEach((item:any)=>{
  //     // console.log(item.category);
      
  //     if(item.category.trim().toLowerCase().includes(this.searchKey.trim().toLowerCase())){
  //       result.push(item)
  //     }
  //   })
  //   this.allProduct= result

  // }


  // addtowishlist(product:any){
  //   if(sessionStorage.getItem("token")){
      
  //     this.api.addToWishlistApi(product).subscribe({
  //       next:(res:any)=>{
  //         console.log(res);
  //         Swal.fire('item added to wishlist!')
  //       },
  //       error:(err)=>{
  //         console.log(err);
  //         alert(err)
          
          
  //       }
  //     })
  //   }else{
  //     Swal.fire("Please login first")
  //   }
  // }
  
  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
     this.api.addtoWishlistApi(product).subscribe({
       next:(res:any)=>{
        this.api.getWishlistCount()
         console.log(res);
         alert('product added successfully')

       },
       error:(err:any)=>{
         console.log(err);
         alert(err.error) 
       }
     })
    }
    else{
     alert('please login') 
    }
  }

  addtocart(product:any){
    if(sessionStorage.getItem("token")){
      // assigning quantity to allproduct before sending 
      Object.assign(product,{quantity:1})
      this.api.addtocartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);

          this.api.getcartCountApi()
          alert('item is added to cart')

          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }else{
      Swal.fire("Please login first")
    }
  }

  logout(){
    this.loginusername=""
    this.count=0
    this.cartcount=0
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    this.router.navigateByUrl("")

    this.count=0
    this.cartcount=0
  }

}
