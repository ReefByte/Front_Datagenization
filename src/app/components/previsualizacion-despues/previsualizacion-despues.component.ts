import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrevisualizacionDespuesService } from '../../service/previsualizacion-despues.service';

@Component({
  selector: 'app-previsualizacion-despues',
  templateUrl: './previsualizacion-despues.component.html',
  styleUrls: ['./previsualizacion-despues.component.css'],
})
export class PrevisualizacionDespuesComponent implements OnInit {

  sessionId: string | null = '';
  data: any[] = [];
  isModalOpen = false;
  isLoading = true;
  pulpiHasMessage = true;
  constructor(
    private router: Router,
    private previsualizacionDespuesService: PrevisualizacionDespuesService
  ) {}

  ngOnInit() {
    this.sessionId = sessionStorage.getItem('session_id');

    if (this.sessionId != null) {
      this.previsualizacionDespuesService
        .getCsvColumnsAfter(this.sessionId)
        .subscribe(
          (response) => {
            console.log(response);
            this.data = response;
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching CSV columns:', error);
          }
        );
    }
  }

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
    this.router.navigate(['/descargar']);
  }

  navigateToGrouping() {
    this.router.navigate(['/grouping']);
  }

  openModalPulpi() {
    this.pulpiHasMessage = false;
    this.isModalOpen = true;
  }

  closeModalPulpi() {
    this.isModalOpen = false;
  }
}
