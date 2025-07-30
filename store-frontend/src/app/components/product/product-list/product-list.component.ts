import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  selectedCategory = '';
  selectedBrand = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        product.categoryName === this.selectedCategory;
      
      const matchesBrand = !this.selectedBrand || 
        product.brand === this.selectedBrand;
      
      return matchesSearch && matchesCategory && matchesBrand && product.isActive;
    });
  }

  get categories(): string[] {
    const categories = [...new Set(this.products.map(p => p.categoryName))];
    return categories.sort();
  }

  get brands(): string[] {
    const brands = [...new Set(this.products.map(p => p.brand))];
    return brands.sort();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedBrand = '';
  }

  checkAvailability(sku: string): void {
    this.productService.checkProductAvailability(sku).subscribe({
      next: (isAvailable) => {
        const message = isAvailable 
          ? `✅ Product ${sku} is available in the system`
          : `❌ Product ${sku} is not available in the system`;
        alert(message);
      },
      error: (error) => {
        alert(`❌ Product ${sku} is not available in the system`);
        console.error('Availability check error:', error);
      }
    });
  }
}