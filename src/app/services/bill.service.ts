import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill, BillRequest } from '../models/bill.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
// import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BillService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createBill(bill: BillRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}bills/add`, bill);
  }
  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}bills/list`);
  }
  getDailySales(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}bills/sales/daily`);
  }

  getMonthlySales(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}bills/sales/monthly`);
  }

  getYearlySales(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}bills/sales/yearly`);
  }
}
