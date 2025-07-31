import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Bill } from '../models/bill.model';
import { BillService } from '../services/bill.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-bill-list',
    standalone: true,
    imports: [CommonModule,HttpClientModule, FormsModule],
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];
  filteredBills: Bill[] = [];
  searchTerm: string = '';

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billService.getAllBills().subscribe((bills) => {
      this.bills = bills;
      this.filteredBills = bills;
    });
  }

  searchBills(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBills = this.bills.filter(b =>
      b.customerName.toLowerCase().includes(term)
    );
  }

  printBill(bill: Bill): void {
    const content = `
      <div>
      <h3>Retailer Shop</h3>
      <h4>Reciept</h4>
      <p><strong>Customer:</strong> ${bill.customerName}</p>
      <p><strong>Date:</strong> ${new Date(bill.date).toLocaleString()}</p>
      <table border="1" cellspacing="0" cellpadding="5">
        <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
        ${bill.items.map(i => `
          <tr>
            <td>${i.itemName}</td>
            <td>${i.itemQuantity}</td>
            <td>${i.itemPrice}</td>
          </tr>`).join('')}
      </table>
      <p><strong>Total:</strong> ₹${bill.totalAmount.toFixed(2)}</p>
      </div>
    `;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head><title>Bill</title></head>
        <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }
}
