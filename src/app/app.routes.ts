import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BillComponent } from './bill/bill.component';
import { ItemComponent } from './item/item.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bill', component: BillComponent },
    { path: 'item', component: ItemComponent },
    { path: 'bills', component: BillListComponent },
    { path: 'report', component: SalesReportComponent },
    { path: '**', redirectTo: '' }
];
