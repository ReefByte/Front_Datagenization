
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../service/upload.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(private router: Router, private uploadService: UploadService) {}
  @ViewChild('fileInput') fileInput!: ElementRef;
  buttonLabel: string = 'Explorar archivos';
  selectedFileNames: string[] = [];
  selectedFiles: File[] = [];
  session_id: string|null = '';
  showModal: boolean = false;
  showFormatErrorModal: boolean = false;
  isModalOpen = false;

  ngOnInit(): void {
    this.session_id = uuidv4();
    sessionStorage.setItem('session_id',this.session_id);
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
      this.selectedFileNames.push(
        ...Array.from(files).map((file) => file.name)
      );
      this.selectedFiles.push(...Array.from(files));
      this.buttonLabel = 'Seleccionar más archivos';
    }
  }

  updateFiles(files: FileList) {
    const validFiles = Array.from(files).filter((file) =>
      file.name.endsWith('.csv')
    );
    if (validFiles.length !== files.length) {
      this.showFormatErrorModal = true;
    }
    this.selectedFileNames = Array.from(files).map((file) => file.name);
    this.selectedFiles = Array.from(files);
    this.buttonLabel = 'Archivos seleccionados';
  }

  procesar() {
    if (this.selectedFiles.length == 0) {
      this.showModal = true;

    }
    else{
      // @ts-ignore
      this.uploadService.procesar(this.selectedFiles, sessionStorage.getItem('session_id')).subscribe(
        (respuesta: any) => {
          console.log('Archivo subido con éxito', respuesta);
          this.router.navigate(['/columns'])
        },
        (error: any) => {
          console.error('Error al subir archivo', error);
        })
    }
  }
  closeModal() {
    this.showModal = false;
  }
  deleteFile(index: number) {
    this.selectedFileNames.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    if (this.selectedFiles.length === 0) {
      this.buttonLabel = 'Explorar archivos';
    }
  }

  openModalPulpi() {
    this.isModalOpen = true;
  }

  closeModalPulpi() {
    this.isModalOpen = false;
  }
}
