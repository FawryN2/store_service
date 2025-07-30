import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { Store, StoreRequest } from '../../../models/store.model';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css']
})
export class StoreFormComponent implements OnInit {
  @Input() store: Store | null = null;
  @Output() formClose = new EventEmitter<void>();

  storeForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService
  ) {
    this.storeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    if (this.store) {
      this.storeForm.patchValue({
        name: this.store.name,
        location: this.store.location
      });
    }
  }

  get isEditing(): boolean {
    return this.store !== null;
  }

  onSubmit(): void {
    if (this.storeForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const storeData: StoreRequest = this.storeForm.value;

      const operation = this.isEditing
        ? this.storeService.updateStore(this.store!.id!, storeData)
        : this.storeService.createStore(storeData);

      operation.subscribe({
        next: () => {
          this.success = this.isEditing ? 'Store updated successfully!' : 'Store created successfully!';
          this.loading = false;
          setTimeout(() => {
            this.formClose.emit();
          }, 1500);
        },
        error: (error) => {
          this.error = this.isEditing ? 'Failed to update store' : 'Failed to create store';
          this.loading = false;
          console.error('Store operation error:', error);
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
    Object.keys(this.storeForm.controls).forEach(key => {
      const control = this.storeForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.storeForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}