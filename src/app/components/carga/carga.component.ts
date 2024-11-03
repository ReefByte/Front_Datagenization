import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnGroupingService } from "../../service/column-grouping.service";

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent {

  session_id: string|null = '';
  jsonData: any;

  constructor(
    private router: Router,
    private columnGroupingService: ColumnGroupingService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.jsonData = navigation?.extras.state?.['data'] || {};
  }

  ngOnInit() {
    this.session_id = sessionStorage.getItem('session_id');

    if (!this.session_id) {
      console.error('No se pudo obtener el session_id.');
      return;
    }
    console.log('Session ID obtenido:', this.session_id);
    this.enviarAgrupacion();
  }

  navigateToCarga() {
    this.router.navigate(['/previsualizacion-despues']);
  }

  enviarAgrupacion() {
    if (!this.session_id) {
      console.error('Session ID no está disponible, no se puede enviar la solicitud.');
      return;
    }

    console.log('session_id enviado:', this.session_id);

    this.columnGroupingService.sendGrouping(this.jsonData, this.session_id).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log('Agrupación enviada exitosamente. Redirigiendo a la pantalla de previsualización.');
          this.router.navigate(['/hresult']);
        } else {
          console.warn('El servidor respondió, pero no con un estado exitoso. Estado:', response.status);
          this.router.navigate(['/column-grouping'], {
            state: { error: 'El servidor respondió con un error. Intenta de nuevo.' }
          });
        }
      },
      error: (error) => {
        console.error('Error al enviar la agrupación:', error);
        const errorMsg = error.status === 422 ? 'La estructura de los datos ' +
          'es incorrecta. Por favor, revisa la selección de columnas.' :
          'Error en el servidor. Intenta de nuevo.';
        this.router.navigate(['/column-grouping'], { state: { error: errorMsg } });
      }
    });
  }
}
