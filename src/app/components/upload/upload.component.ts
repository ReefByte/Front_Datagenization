
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  session_id: string = '';
  showModal: boolean = false;
  showFormatErrorModal: boolean = false;
  isModalOpen = false;
  isLoading = false;

  ngOnInit(): void {
    this.session_id = uuidv4();
    sessionStorage.setItem('session_id',this.session_id);
    console.log(this.session_id);
  }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files
    if (files && files.length > 0) {
      this.selectedFileNames.push(...Array.from(files).map(file => file.name));
      this.selectedFiles.push(...Array.from(files));
      this.buttonLabel = 'Seleccionar más archivos';
    }
  }

  procesar() {
    this.isLoading = true;
    if (this.selectedFiles.length == 0) {
      this.showModal = true;
      this.isLoading = false;
    }
    else{
      // @ts-ignore
      this.uploadService.procesar(this.selectedFiles, sessionStorage.getItem('session_id')).subscribe(
        (respuesta: any) => {
          console.log('Archivo subido con éxito', respuesta);
          this.router.navigate(['/columns'])
          this.isLoading = true;
        },
        (error: any) => {
          this.isLoading = true;
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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.remove('dragover');

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Procesa cada archivo según tus necesidades
      console.log('Archivo seleccionado:', file.name);
    }
    if (files && files.length > 0) {
      this.selectedFileNames.push(...Array.from(files).map(file => file.name));
      this.selectedFiles.push(...Array.from(files));
      this.buttonLabel = 'Seleccionar más archivos';
    }
  }
}
