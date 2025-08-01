import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill, BillRequest } from '../models/bill.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillService {
  private baseUrl = 'https://retailer-helper-backend.onrender.com/bills';

  constructor(private http: HttpClient) {}

  createBill(bill: BillRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, bill);
  }
  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}/list`);
  }
  getDailySales(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sales/daily`);
  }

  getMonthlySales(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sales/monthly`);
  }

  getYearlySales(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sales/yearly`);
  }
}
