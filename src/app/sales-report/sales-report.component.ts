import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';
import { Bill } from '../models/bill.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sales-report',
    standalone: true,
    templateUrl: './sales-report.component.html',
    styleUrls: ['./sales-report.component.css'],
    imports: [FormsModule, CommonModule]
})
export class SalesReportComponent implements OnInit {
  dailySales: number = 0;
  monthlySales: number = 0;
  yearlySales: number = 0;

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.loadSalesData();
  }

  loadSalesData() {
    this.billService.getDailySales().subscribe(data => this.dailySales = data);
    this.billService.getMonthlySales().subscribe(data => this.monthlySales = data);
    this.billService.getYearlySales().subscribe(data => this.yearlySales = data);
  }
}
