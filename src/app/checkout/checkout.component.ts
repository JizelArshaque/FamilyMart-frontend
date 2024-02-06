import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { GetservicesService } from '../services/getservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public payPalConfig ? : IPayPalConfig;

  proceedToPayStatus:boolean=false
  makepaymentStatus:boolean=false
  Gtotal:any=''

  checkoutForm = this.fb.group({
    uname:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    uapartment:["",[Validators.required,Validators.pattern('[a-zA-Z0-9:., ]*')]],
    uplace:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    upincode:["",[Validators.required,Validators.pattern('[0-9]*')]]
  })

  constructor(private fb:FormBuilder,private api:GetservicesService,private router:Router){}

  cancel(){
    this.checkoutForm.reset()
  }

  // 
  proceedToPay(){
    if(this.checkoutForm.valid){
      this.proceedToPayStatus=true
      this.Gtotal=sessionStorage.getItem("Total")
    }else{
      alert('Invalid input')
    }

  }

  back(){
    this.proceedToPayStatus=false
  }

  makePayment(){
    this.makepaymentStatus=true
    this.initConfig()

  }


  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.Gtotal,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.Gtotal
                        }
                    }
                },
                
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        // Invoked when payment is succesfull
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            
            
            this.api.emptycartApi().subscribe((res:any)=>{
              alert('Payment is succesfull!')
            this.proceedToPayStatus=false
            this.makepaymentStatus=false
            this.api.emptycartApi()
            this.router.navigateByUrl('/') 
            })
            
            
        },

        // Invoked when payment canceleled
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            alert('Payment Canceled')
            // to go back 
            this.proceedToPayStatus=true
        },

        // ERror in payment gateway
        onError: err => {
            console.log('OnError', err);
            alert('Transaction failed Please try After sometime!')  
            // to go back
            this.proceedToPayStatus=true         
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            
        }
    };
}
}


