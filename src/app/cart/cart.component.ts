import { Component, OnInit } from '@angular/core';
import { GetservicesService } from '../services/getservices.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private api:GetservicesService){}

  products:any = []
  total:number=0


  ngOnInit(): void { 
    this.getcartF()
  }

  getcartF(){
    this.api.getcartApi().subscribe({
      next:(res:any)=>{
        this.products=res
        console.log(this.products);
        this.getTotal()
        
        
        
      },
      error:(err:any)=>{
        console.log(err);
        alert(err.error)
        
      }
    })
  }

  getTotal(){
    this.total=Math.ceil(this.products.map((item:any)=>item.grandtotal).reduce((n1:any,n2:any)=>n1+n2))
  
  }

  remove(id:any){
    this.api.removecartApi(id).subscribe((res:any)=>{
      this.getcartF()
      this.api.getcartCountApi()
    })
  }
  
  // increment

  increment(id:any){
    this.api.incrementapi(id).subscribe({
      next:(res:any)=>{
      console.log(res);
      this.getcartF() 
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  
  })
  }

  // decrement

  decrement(id:any){
    this.api.decrementapi(id).subscribe({
      next:(res:any)=>{
      console.log(res);
      this.getcartF() 

      this.api.getcartCountApi()
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  
  })
  }

  // emptycart


  emptycart(){

    this.api.emptycartApi().subscribe({
      next:(res:any)=>{
      console.log(res);
      this.getcartF()
      this.api.getcartCountApi()
      alert('your cart is empty')
      },
      error:(err:any)=>{
        console.log(err);
        

      }
    })


  }

  Gtotal(){
    sessionStorage.setItem("Total",JSON.stringify(this.total))
  }

}
