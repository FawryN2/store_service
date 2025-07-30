import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Store } from '../../../models/store.model';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  stores: Store[] = [];
  loading = false;
  error = '';
  showForm = false;
  editingStore: Store | null = null;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.loading = true;
    this.error = '';
    
    this.storeService.getAllStores().subscribe({
      next: (stores) => {
        this.stores = stores;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load stores';
        this.loading = false;
        console.error('Error loading stores:', error);
      }
    });
  }

  showAddForm(): void {
    this.showForm = true;
    this.editingStore = null;
  }

  editStore(store: Store): void {
    this.editingStore = store;
    this.showForm = true;
  }

  deleteStore(id: number): void {
    if (confirm('Are you sure you want to delete this store?')) {
      this.storeService.deleteStore(id).subscribe({
        next: () => {
          this.loadStores();
        },
        error: (error) => {
          this.error = 'Failed to delete store';
          console.error('Error deleting store:', error);
        }
      });
    }
  }

  deleteAllStores(): void {
    if (confirm('Are you sure you want to delete ALL stores? This action cannot be undone.')) {
      this.storeService.deleteAllStores().subscribe({
        next: () => {
          this.loadStores();
        },
        error: (error) => {
          this.error = 'Failed to delete all stores';
          console.error('Error deleting all stores:', error);
        }
      });
    }
  }

  onFormClose(): void {
    this.showForm = false;
    this.editingStore = null;
    this.loadStores();
  }
}