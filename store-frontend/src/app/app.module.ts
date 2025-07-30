import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreListComponent } from './components/store/store-list/store-list.component';
import { StoreDetailComponent } from './components/store/store-detail/store-detail.component';
import { StoreFormComponent } from './components/store/store-form/store-form.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { StockDetailComponent } from './components/stock/stock-detail/stock-detail.component';
import { StockFormComponent } from './components/stock/stock-form/stock-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ConsumeStockComponent } from './components/stock/consume-stock/consume-stock.component';

// Services
import { StoreService } from './services/store.service';
import { StockService } from './services/stock.service';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StoreListComponent,
    StoreDetailComponent,
    StoreFormComponent,
    StockListComponent,
    StockDetailComponent,
    StockFormComponent,
    ProductListComponent,
    ConsumeStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StoreService,
    StockService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }