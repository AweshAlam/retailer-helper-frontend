import { BillItemRequest } from './bill-item.model';

export interface BillRequest {
  customerName: string;
  items: BillItemRequest[];
  paymentMethod: string; // ✅
  paymentStatus: boolean; // ✅
}

// ✅ Add this new interface
export interface Bill {
  customerName: string;
  totalAmount: number;
  date: string;
  items: {
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
  }[];
}
