import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { Store } from '../../../models/store.model';
import { Stock } from '../../../models/stock.model';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store | null = null;
  stocks: Stock[] = [];
  loading = true;
  error = '';
  storeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storeId = +params['id'];
      this.loadStoreDetails();
    });
  }

  loadStoreDetails(): void {
    this.loading = true;
    this.error = '';

    // Load store details and stocks concurrently
    Promise.all([
      this.storeService.getStore(this.storeId).toPromise(),
      this.storeService.getStoreStocks(this.storeId).toPromise()
    ]).then(([store, stocks]) => {
      this.store = store || null;
      this.stocks = stocks || [];
      this.loading = false;
    }).catch(error => {
      this.error = 'Failed to load store details';
      this.loading = false;
      console.error('Store detail error:', error);
    });
  }

  goBack(): void {
    this.router.navigate(['/stores']);
  }

  getTotalStockItems(): number {
    return this.stocks.length;
  }

  getTotalQuantity(): number {
    return this.stocks.reduce((total, stock) => total + stock.quantity, 0);
  }

  getLowStockCount(): number {
    return this.stocks.filter(stock => stock.quantity < 10).length;
  }
}