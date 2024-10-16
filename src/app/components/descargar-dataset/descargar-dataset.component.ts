import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UploadService} from "../../service/upload.service";

@Component({
  selector: 'app-descargar-dataset',
  templateUrl: './descargar-dataset.component.html',
  styleUrls: ['./descargar-dataset.component.css']
})
export class DescargarDatasetComponent {
  sessionId: string | null = '';
  constructor(private router: Router,private uploadService: UploadService) {}

  navigateToCarga() {
    this.sessionId = this.uploadService.getSession_id;
    this.router.navigate(['']);
  }
}
