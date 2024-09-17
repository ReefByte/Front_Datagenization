import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent {
  constructor(private router: Router) {}

  navigateToCarga() {
    this.router.navigate(['/carga']);
  }
}
