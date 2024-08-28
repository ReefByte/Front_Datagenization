import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  buttonLabel: string = 'Explorar archivos';
  selectedFileNames: string[] = [];
  selectedFiles: File[] = [];


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


}
