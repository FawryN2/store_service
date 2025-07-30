import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, StoreRequest } from '../models/store.model';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:8080/stores';

  constructor(private http: HttpClient) { }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }

  getStore(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }

  createStore(store: StoreRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, store);
  }

  updateStore(id: number, store: StoreRequest): Observable<Store> {
    return this.http.put<Store>(`${this.apiUrl}/${id}`, store);
  }

  deleteStore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteAllStores(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  getStoreStocks(storeId: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/${storeId}/stocks`);
  }
}