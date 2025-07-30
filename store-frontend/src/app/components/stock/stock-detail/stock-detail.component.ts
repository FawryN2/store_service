import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { StoreService } from '../../../services/store.service';
import { Stock, StockTransaction } from '../../../models/stock.model';
import { Store } from '../../../models/store.model';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  stock: Stock | null = null;
  store: Store | null = null;
  transactions: StockTransaction[] = [];
  loading = true;
  error = '';
  stockId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.stockId = +params['id'];
      this.loadStockDetails();
    });
  }

  loadStockDetails(): void {
    this.loading = true;
    this.error = '';

    this.stockService.getStock(this.stockId).subscribe({
      next: (stock) => {
        this.stock = stock;
        this.loadStoreAndTransactions();
      },
      error: (error) => {
        this.error = 'Failed to load stock details';
        this.loading = false;
        console.error('Stock detail error:', error);
      }
    });
  }

  loadStoreAndTransactions(): void {
    if (!this.stock) return;

    Promise.all([
      this.storeService.getStore(this.stock.storeId).toPromise(),
      this.stockService.getStockTransactions(this.stockId).toPromise()
    ]).then(([store, transactions]) => {
      this.store = store || null;
      this.transactions = transactions || [];
      this.loading = false;
    }).catch(error => {
      console.error('Error loading additional data:', error);
      this.loading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/stocks']);
  }

  getStockStatus(): string {
    if (!this.stock) return '';
    if (this.stock.quantity === 0) return 'Out of Stock';
    if (this.stock.quantity < 10) return 'Low Stock';
    return 'In Stock';
  }

  getStockStatusClass(): string {
    if (!this.stock) return '';
    if (this.stock.quantity === 0) return 'danger';
    if (this.stock.quantity < 10) return 'warning';
    return 'success';
  }

  getTotalConsumed(): number {
    return this.transactions.reduce((total, transaction) => total + transaction.consumedQuantity, 0);
  }

  getRecentTransactions(): StockTransaction[] {
    return this.transactions
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, 10);
  }
}