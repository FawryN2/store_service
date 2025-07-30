import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock, StockRequest, StockTransaction, ConsumeStockRequest } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8080/stocks';

  constructor(private http: HttpClient) { }

  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  getStock(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/${id}`);
  }

  createStock(storeId: number, stock: StockRequest): Observable<Stock> {
    return this.http.post<Stock>(`${this.apiUrl}/store/${storeId}`, stock);
  }

  updateStock(id: number, stock: StockRequest): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/${id}`, stock);
  }

  deleteStock(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  deleteAllStocks(): Observable<string> {
    return this.http.delete<string>(this.apiUrl);
  }

  consumeStock(storeId: number, sku: string, request: ConsumeStockRequest): Observable<string> {
    const params = new HttpParams()
      .set('storeId', storeId.toString())
      .set('sku', sku);
    
    return this.http.post<string>(`${this.apiUrl}/consume`, request, { params });
  }

  getStockTransactions(stockId: number): Observable<StockTransaction[]> {
    return this.http.get<StockTransaction[]>(`${this.apiUrl}/${stockId}/transactions`);
  }
}