import { ConfigService } from './service/config.service';
import { ProductService } from './service/product.service';
import { UserService } from './service/user.service';
import { OrderService } from './service/order.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './component/users/users.component';
import { ProductsComponent } from './component/products/products.component';
import { OrdersComponent } from './component/orders/orders.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { DataTableComponent } from './common/data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    NavComponent,
    HomeComponent,
    SidebarComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    OrderService,
    UserService,
    ProductService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
