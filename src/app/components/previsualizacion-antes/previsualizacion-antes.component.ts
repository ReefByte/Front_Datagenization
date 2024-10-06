import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrevisualizacionAntesService } from '../../service/previsualizacion-antes.service';

@Component({
  selector: 'app-previsualizacion-antes',
  templateUrl: './previsualizacion-antes.component.html',
  styleUrls: ['./previsualizacion-antes.component.css'],
})
export class PrevisualizacionAntesComponent implements OnInit {
  constructor(
    private router: Router,
    private previsualizacionAntesService: PrevisualizacionAntesService
  ) {}

  filenames: string[] = [];
  sessionId: string | null = sessionStorage.getItem('sessionId');
  datasets: { [key: string]: string[] } = {};

  ngOnInit() {
    if (this.sessionId != null) {
      this.previsualizacionAntesService
        .getCsvColumns(this.filenames, this.sessionId)
        .subscribe(
          (response) => {
            console.log(response);
            this.datasets = response as { [key: string]: string[] };
          },
          (error) => {
            console.error('Error fetching CSV columns:', error);
          }
        );
    }
  }

  get csvKeys() {
    return Object.keys(this.datasets);
  }

  getMaxRowLength(): number {
    return Math.max(
      ...this.csvKeys.map((key) => this.datasets[key]?.length || 0)
    );
  }

  getArrayFromNumber(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  navigateToCarga() {
    this.router.navigate(['/column']);
  }
}
