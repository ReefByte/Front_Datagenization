import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrevisualizacionDespuesService } from '../../service/previsualizacion-despues.service';
import { UploadService } from '../../service/upload.service';

@Component({
  selector: 'app-previsualizacion-despues',
  templateUrl: './previsualizacion-despues.component.html',
  styleUrls: ['./previsualizacion-despues.component.css'],
})
export class PrevisualizacionDespuesComponent implements OnInit {
  sessionId: string | null = '';
  data: any[] = [];

  constructor(
    private router: Router,
    private previsualizacionDespuesService: PrevisualizacionDespuesService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.sessionId = this.uploadService.getSession_id;

    if (this.sessionId != null) {
      this.previsualizacionDespuesService.getCsvColumnsAfter(this.sessionId).subscribe(
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
