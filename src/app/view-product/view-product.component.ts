import { Component, OnInit } from '@angular/core';
import { GetservicesService } from '../services/getservices.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  constructor(private api:GetservicesService, private route:ActivatedRoute){}


  product:any = {}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const id = res.id
      console.log(id);
      this.viewProduct(id)
      
    })
  }

  viewProduct(id:any){
    this.api.getProductApi(id).subscribe({
      next:(res:any)=>{
        // console.log(res);

        this.product = res[0]
        console.log(this.product);
        
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }


  addtowishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addtoWishlistApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCount()
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

}
