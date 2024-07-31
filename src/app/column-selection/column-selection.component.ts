import { Component } from '@angular/core';

@Component({
  selector: 'app-column-selection',
  templateUrl: './column-selection.component.html',
  styleUrls: ['./column-selection.component.css']
})
export class ColumnSelectionComponent {
  selectionRows: any[] = [
    [{}]
  ];

  addRow() {
    this.selectionRows.push([{}]);
  }

  addSelection(row: any[]) {
    row.push({});
  }

  removeSelection(row: any[]) {
    row.pop();
  }
}
