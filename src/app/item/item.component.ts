import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-item',
    standalone: true,
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css'],
    imports: [CommonModule, FormsModule,HttpClientModule]
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { itemId: undefined, itemName: '', itemQuantity: 0, itemPrice: 0 };
  editingIndex: number | null = null;
  editedItem: Item = { itemId: undefined, itemName: '', itemQuantity: 0, itemPrice: 0 };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.itemService.getAllItems().subscribe(data => {
      this.items = data;
    });
  }

  addItem(): void {
    if (!this.newItem.itemName || this.newItem.itemQuantity <= 0 || this.newItem.itemPrice <= 0) {
      alert("Please enter valid item details.");
      return;
    }

    this.itemService.addItem(this.newItem).subscribe(() => {
      this.fetchItems();
      this.newItem = { itemId: undefined, itemName: '', itemQuantity: 0, itemPrice: 0 };
    });
  }

  editItem(index: number): void {
    this.editingIndex = index;
    this.editedItem = { ...this.items[index] };
  }

  updateItem(): void {
    if (this.editingIndex === null) return;

    const itemName = this.items[this.editingIndex].itemName;
    this.itemService.updateItem(itemName, this.editedItem).subscribe(() => {
      this.fetchItems();
      this.cancelEdit();
    });
  }

  deleteItem(itemName: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(itemName).subscribe(() => {
        this.fetchItems();
      });
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editedItem = {itemId: undefined, itemName: '', itemQuantity: 0, itemPrice: 0 };
  }
}
