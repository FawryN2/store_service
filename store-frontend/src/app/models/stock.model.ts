export interface Stock {
  id?: number;
  storeId: number;
  sku: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface StockRequest {
  sku: string;
  quantity: number;
}

export interface StockTransaction {
  id?: number;
  sku: string;
  storeId: number;
  consumedQuantity: number;
  createdAt?: string;
}

export interface ConsumeStockRequest {
  quantity: number;
}