import { Component } from '@angular/core';
import { BillService } from '../services/bill.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule]
})
export class HomeComponent {
  dailySales: number = 0;
  monthlySales: number = 0;
  yearlySales: number = 0;

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.loadSalesData();
  }

  loadSalesData() {
    this.billService
      .getDailySales()
      .subscribe((data) => (this.dailySales = data));
    this.billService
      .getMonthlySales()
      .subscribe((data) => (this.monthlySales = data));
    this.billService
      .getYearlySales()
      .subscribe((data) => (this.yearlySales = data));
  }
}
