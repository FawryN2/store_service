import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { Stock, ConsumeStockRequest } from '../../../models/stock.model';

@Component({
  selector: 'app-consume-stock',
  templateUrl: './consume-stock.component.html',
  styleUrls: ['./consume-stock.component.css']
})
export class ConsumeStockComponent implements OnInit {
  @Input() stock!: Stock;
  @Input() storeName!: string;
  @Output() formClose = new EventEmitter<void>();

  consumeForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private stockService: StockService
  ) {
    this.consumeForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Set max validator based on available stock
    this.consumeForm.get('quantity')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.stock.quantity)
    ]);
  }

  onSubmit(): void {
    if (this.consumeForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const consumeData: ConsumeStockRequest = {
        quantity: this.consumeForm.get('quantity')?.value
      };

      this.stockService.consumeStock(this.stock.storeId, this.stock.sku, consumeData).subscribe({
        next: (response) => {
          this.success = response;
          this.loading = false;
          setTimeout(() => {
            this.formClose.emit();
          }, 2000);
        },
        error: (error) => {
          this.error = 'Failed to consume stock';
          this.loading = false;
          console.error('Stock consumption error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.formClose.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.consumeForm.controls).forEach(key => {
      const control = this.consumeForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.consumeForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'Quantity is required';
      }
      if (field.errors['min']) {
        return 'Quantity must be at least 1';
      }
      if (field.errors['max']) {
        return `Quantity cannot exceed ${this.stock.quantity} (available stock)`;
      }
    }
    return '';
  }

  setMaxQuantity(): void {
    this.consumeForm.patchValue({ quantity: this.stock.quantity });
  }
}