import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PgenotfoundComponent } from './pgenotfound/pgenotfound.component';
import { guardsGuard } from './guards.guard';

const routes: Routes = [
  {path:'user/login',component:LoginComponent},
  {path:'user/register',component:RegisterComponent},
  {path:'',component:AllProductComponent},
  {path:'view-product/:id',component:ViewProductComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[guardsGuard]},
  {path:'wishlist',component:WishlistComponent},
  {path:'**',component:PgenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
