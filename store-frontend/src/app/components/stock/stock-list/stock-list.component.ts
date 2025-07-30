import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { StoreService } from '../../../services/store.service';
import { Stock } from '../../../models/stock.model';
import { Store } from '../../../models/store.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  stores: Store[] = [];
  loading = false;
  error = '';
  showForm = false;
  showConsumeForm = false;
  editingStock: Stock | null = null;
  consumingStock: Stock | null = null;

  constructor(
    private stockService: StockService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    Promise.all([
      this.stockService.getAllStocks().toPromise(),
      this.storeService.getAllStores().toPromise()
    ]).then(([stocks, stores]) => {
      this.stocks = stocks || [];
      this.stores = stores || [];
      this.loading = false;
    }).catch(error => {
      this.error = 'Failed to load data';
      this.loading = false;
      console.error('Error loading data:', error);
    });
  }

  showAddForm(): void {
    this.showForm = true;
    this.editingStock = null;
  }

  editStock(stock: Stock): void {
    this.editingStock = stock;
    this.showForm = true;
  }

  deleteStock(id: number): void {
    if (confirm('Are you sure you want to delete this stock item?')) {
      this.stockService.deleteStock(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          this.error = 'Failed to delete stock';
          console.error('Error deleting stock:', error);
        }
      });
    }
  }

  deleteAllStocks(): void {
    if (confirm('Are you sure you want to delete ALL stock items? This action cannot be undone.')) {
      this.stockService.deleteAllStocks().subscribe({
        next: () => {
          this.loadData();
        },
        error: (error) => {
          this.error = 'Failed to delete all stocks';
          console.error('Error deleting all stocks:', error);
        }
      });
    }
  }

  consumeStock(stock: Stock): void {
    this.consumingStock = stock;
    this.showConsumeForm = true;
  }

  onFormClose(): void {
    this.showForm = false;
    this.editingStock = null;
    this.loadData();
  }

  onConsumeFormClose(): void {
    this.showConsumeForm = false;
    this.consumingStock = null;
    this.loadData();
  }

  getStoreName(storeId: number): string {
    const store = this.stores.find(s => s.id === storeId);
    return store ? store.name : `Store ${storeId}`;
  }

  getStockStatus(quantity: number): string {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  }

  getStockStatusClass(quantity: number): string {
    if (quantity === 0) return 'danger';
    if (quantity < 10) return 'warning';
    return 'success';
  }
}