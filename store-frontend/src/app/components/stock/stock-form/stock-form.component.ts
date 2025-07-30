import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { Stock, StockRequest } from '../../../models/stock.model';
import { Store } from '../../../models/store.model';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  @Input() stock: Stock | null = null;
  @Input() stores: Store[] = [];
  @Output() formClose = new EventEmitter<void>();

  stockForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private stockService: StockService
  ) {
    this.stockForm = this.fb.group({
      storeId: ['', [Validators.required]],
      sku: ['', [Validators.required, Validators.minLength(2)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.stock) {
      this.stockForm.patchValue({
        storeId: this.stock.storeId,
        sku: this.stock.sku,
        quantity: this.stock.quantity
      });
      // Disable store and SKU fields when editing
      this.stockForm.get('storeId')?.disable();
      this.stockForm.get('sku')?.disable();
    }
  }

  get isEditing(): boolean {
    return this.stock !== null;
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      if (this.isEditing) {
        // For editing, only send quantity
        const stockData: StockRequest = {
          sku: this.stock!.sku,
          quantity: this.stockForm.get('quantity')?.value
        };

        this.stockService.updateStock(this.stock!.id!, stockData).subscribe({
          next: () => {
            this.success = 'Stock updated successfully!';
            this.loading = false;
            setTimeout(() => {
              this.formClose.emit();
            }, 1500);
          },
          error: (error) => {
            this.error = 'Failed to update stock';
            this.loading = false;
            console.error('Stock update error:', error);
          }
        });
      } else {
        // For creating new stock
        const storeId = this.stockForm.get('storeId')?.value;
        const stockData: StockRequest = {
          sku: this.stockForm.get('sku')?.value,
          quantity: this.stockForm.get('quantity')?.value
        };

        this.stockService.createStock(storeId, stockData).subscribe({
          next: () => {
            this.success = 'Stock created successfully!';
            this.loading = false;
            setTimeout(() => {
              this.formClose.emit();
            }, 1500);
          },
          error: (error) => {
            this.error = 'Failed to create stock';
            this.loading = false;
            console.error('Stock creation error:', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.formClose.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.stockForm.controls).forEach(key => {
      const control = this.stockForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.stockForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['min']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['min'].min}`;
      }
    }
    return '';
  }
}