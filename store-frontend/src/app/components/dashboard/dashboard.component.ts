import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { StockService } from '../../services/stock.service';
import { ProductService } from '../../services/product.service';
import { Store } from '../../models/store.model';
import { Stock } from '../../models/stock.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stores: Store[] = [];
  stocks: Stock[] = [];
  products: Product[] = [];
  loading = true;
  error = '';

  // Statistics
  totalStores = 0;
  totalStocks = 0;
  totalProducts = 0;
  lowStockItems = 0;

  constructor(
    private storeService: StoreService,
    private stockService: StockService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    // Load all data concurrently
    Promise.all([
      this.storeService.getAllStores().toPromise(),
      this.stockService.getAllStocks().toPromise(),
      this.productService.getAllProducts().toPromise()
    ]).then(([stores, stocks, products]) => {
      this.stores = stores || [];
      this.stocks = stocks || [];
      this.products = products || [];
      
      this.calculateStatistics();
      this.loading = false;
    }).catch(error => {
      this.error = 'Failed to load dashboard data';
      this.loading = false;
      console.error('Dashboard error:', error);
    });
  }

  calculateStatistics(): void {
    this.totalStores = this.stores.length;
    this.totalStocks = this.stocks.length;
    this.totalProducts = this.products.length;
    this.lowStockItems = this.stocks.filter(stock => stock.quantity < 10).length;
  }

  getLowStockItems(): Stock[] {
    return this.stocks.filter(stock => stock.quantity < 10).slice(0, 5);
  }

  getRecentStocks(): Stock[] {
    return this.stocks
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, 5);
  }
}