import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from '../services/item.service';
import { BillService } from '../services/bill.service';
import { Item } from '../models/item.model';
import { BillRequest } from '../models/bill.model';
import { BillItemRequest } from '../models/bill-item.model';

@Component({
    selector: 'app-bill',
    standalone: true,
    imports: [CommonModule, FormsModule,HttpClientModule],
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  customerName = '';
  allItems: Item[] = [];
  selectedItems: BillItemRequest[] = [];

  constructor(
    private itemService: ItemService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((items) => {
      this.allItems = items;
    });
  }

  addItem(): void {
    this.selectedItems.push({ itemName: '', itemQuantity: 1 });
  }

  removeItem(index: number): void {
    this.selectedItems.splice(index, 1);
  }

  getPrice(itemName: string): number {
    const item = this.allItems.find((i) => i.itemName === itemName);
    return item ? item.itemPrice : 0;
  }

  getTotal(): number {
    return this.selectedItems.reduce((sum, item) => {
      const price = this.getPrice(item.itemName);
      return sum + price * item.itemQuantity;
    }, 0);
  }

  paymentMethod = 'cash';
  paymentCompleted = false;

  submitBill(): void {
    const totalAmount = this.getTotal();
    if (this.paymentMethod === 'online' && !this.paymentCompleted) {
      alert('⚠️ Please complete the online payment.');
      return;
    }

    const bill: BillRequest = {
      customerName: this.customerName,
      items: this.selectedItems,
      paymentMethod: this.paymentMethod,
      paymentStatus:
        this.paymentMethod === 'cash' ? true : this.paymentCompleted,
    };

    this.billService.createBill(bill).subscribe({
      next: () => {
        alert('✅ Bill created successfully!');
        this.printBill(bill);
        this.customerName = '';
        this.selectedItems = [];
        this.paymentMethod = 'cash';
        this.paymentCompleted = false;
      },
      error: (err) => alert('❌ Failed to create bill: ' + err.message),
    });
  }

  // ✅ Simulate QR display
  getQRCodeUrl(): string {
    return `upi://pay?aweshalam.@ybl&pn=Retailer%20Shop&am=${this.getTotal()}&cu=INR`; // Replace with actual PhonePe UPI
  }

  markAsPaid(): void {
    this.paymentCompleted = true;
    alert('✅ Payment marked as completed. You can now submit.');
  }

  printBill(bill: BillRequest): void {
    const content = `
      <h3>Retailer Shop</h3>
      <h4>Receipt</h4>
      <p><strong>Customer:</strong> ${bill.customerName}</p>
      <table border="1" cellspacing="0" cellpadding="5">
        <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
        ${bill.items
          .map((item) => {
            const price = this.getPrice(item.itemName);
            return `
            <tr>
              <td>${item.itemName}</td>
              <td>${item.itemQuantity}</td>
              <td>₹${price}</td>
            </tr>
          `;
          })
          .join('')}
      </table>
      <p><strong>Total:</strong> ₹${this.getTotal().toFixed(2)}</p>
    `;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head><title>Print Bill</title></head>
        <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }
}
