import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrevisualizacionDespuesService } from '../../service/previsualizacion-despues.service';

@Component({
  selector: 'app-previsualizacion-despues',
  templateUrl: './previsualizacion-despues.component.html',
  styleUrls: ['./previsualizacion-despues.component.css'],
})
export class PrevisualizacionDespuesComponent implements OnInit {
  constructor(
    private router: Router,
    private PrevisualizacionDespuesService: PrevisualizacionDespuesService
  ) {}
  sessionId: string | null = sessionStorage.getItem('sessionId');
  data: any[] = [];

  ngOnInit() {
    if (this.sessionId != null) {
      this.PrevisualizacionDespuesService.getCsvColumnsAfter(
        this.sessionId
      ).subscribe(
        (response) => {
          console.log(response);
          this.data = response;
        },
        (error) => {
          console.error('Error fetching CSV columns:', error);
        }
      );
    }
  }
  navigateToCarga() {
    this.router.navigate(['/recomendaciones']);
  }
}
