import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UploadService} from "../../service/upload.service";
import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit{
  constructor(private router: Router, private uploadService: UploadService){}
  @ViewChild('fileInput') fileInput!: ElementRef;
  buttonLabel: string = 'Explorar archivos';
  selectedFileNames: string[] = [];
  selectedFiles: File[] = [];
  session_id : string = "";

  ngOnInit(): void {
    this.session_id = uuidv4();
    console.log(this.session_id);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.updateFiles(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.updateFiles(files);
    }
  }

  updateFiles(files: FileList) {
    this.selectedFileNames = Array.from(files).map((file) => file.name);
    this.selectedFiles = Array.from(files);
    this.buttonLabel = 'Archivos seleccionados';
  }

  procesar(){
    this.uploadService.procesar(this.selectedFiles, this.session_id).subscribe(
      (respuesta: any) => {
        console.log('Archivo subido con éxito', respuesta);
      },
      (error: any) => {
        console.error('Error al subir archivo', error);
      }
    );
  }



}
