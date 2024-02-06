import { Component, OnInit } from '@angular/core';
import { GetservicesService } from '../services/getservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private api:GetservicesService){}

  products:any = []

  ngOnInit(): void {
    this.wishlistitem()
    
  }

  wishlistitem(){
    this.api.getFromWishlistApi().subscribe({
      next:(res:any)=>{
        
        this.products=res
        
        // console.log(this.products); 
      },
      error:(err:any)=>{
        console.log(err);
        alert(err.error)
        
      }
    })

  }


  remove(id:any){
    this.api.removefwApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCount()
        this.api.getcartCountApi()
        this.wishlistitem()

        // alert('Item removed from wish list')

      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  
  // add to cart
  addtocart(product:any){
    if(sessionStorage.getItem("token")){
      // assigning quantity to allproduct before sending 
      Object.assign(product,{quantity:1})
      this.api.addtocartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.remove(product._id)
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

}
