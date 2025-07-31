import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'retailer-helper-frontend';
  constructor(private router: Router){}
  dashboard() {
    this.router.navigate(['home']);
  }
  item() {
    this.router.navigate(['item']);
  }
  bill() {
    this.router.navigate(['bill']);
  }
  bills() {
    this.router.navigate(['bills']);
  }
  report() {
    this.router.navigate(['report']);
  }
}
