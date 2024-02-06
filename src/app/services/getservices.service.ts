import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetservicesService {

  constructor(private http:HttpClient) {
    // To avoid removal of the value after refresh 
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getcartCountApi()
    }
  }


  wishlistCount = new BehaviorSubject(0)

  cartCount = new BehaviorSubject(0)

 
  server_url = 'https://fmserver-7liu.onrender.com'

  // server_url = 'http://localhost:8008'

  getAllProductApi(){
    return this.http.get(`${this.server_url}/all-products`)
    
  }


  registerApi(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  loginApi(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  getProductApi(id:any){
    return this.http.get(`${this.server_url}/get-product/${id}`)
    
  }




  addTokenToHeaders(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }


  addtoWishlistApi(product:any){
    return this.http.post(`${this.server_url}/add-to-wishlist`,product,this.addTokenToHeaders())
  }

  getFromWishlistApi(){
    return this.http.get(`${this.server_url}/getFromWishlist`,this.addTokenToHeaders())

  }


  // getting wishlistcount for headers

  getWishlistCount(){

    this.getFromWishlistApi().subscribe((res:any)=>{

      this.wishlistCount.next(res.length) 
    })

  }



  // remov eform wishlist

  removefwApi(id:any){
    return this.http.delete(`${this.server_url}/remove/${id}`,this.addTokenToHeaders())
  }

  // add to cart

  addtocartApi(product:any){
    return this.http.post(`${this.server_url}/add-to-cart`,product,this.addTokenToHeaders())
  }
  // getting data for cart

  getcartApi(){
    return this.http.get(`${this.server_url}/getcart`,this.addTokenToHeaders())
  }

  // cart count

  getcartCountApi(){
    this.getcartApi().subscribe((res:any)=>{
     this.cartCount.next(res.length)
    })
  }

  // remove cart item

  removecartApi(id:any){
    return this.http.delete(`${this.server_url}/remove/cartItem/${id}`,this.addTokenToHeaders())
  }

  // increment item
  incrementapi(id:any){
    return this.http.get(`${this.server_url}/cart/increment/${id}`,this.addTokenToHeaders())
  }

  // decremenet item
  decrementapi(id:any){
    return this.http.get(`${this.server_url}/cart/decrement/${id}`,this.addTokenToHeaders())
  }

  // emptycart
  emptycartApi(){
    return this.http.delete(`${this.server_url}/emptycart`,this.addTokenToHeaders())
  }




}
