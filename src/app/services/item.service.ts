import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
// import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // GET: List all items
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}item/list`);
  }

  // POST: Add new item
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}item/add`, item);
  }

  // GET: List items by name
  getItemsByName(itemName: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}item/list/${itemName}`);
  }

  // PUT: Update item by name
  updateItem(itemName: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}item/update/${itemName}`, item);
  }

  // DELETE: Delete item by name
  deleteItem(itemName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}item/delete/${itemName}`);
  }
}
