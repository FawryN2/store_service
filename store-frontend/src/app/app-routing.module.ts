import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreListComponent } from './components/store/store-list/store-list.component';
import { StoreDetailComponent } from './components/store/store-detail/store-detail.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { StockDetailComponent } from './components/stock/stock-detail/stock-detail.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stores', component: StoreListComponent },
  { path: 'stores/:id', component: StoreDetailComponent },
  { path: 'stocks', component: StockListComponent },
  { path: 'stocks/:id', component: StockDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }