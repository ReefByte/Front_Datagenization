import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PrevisualizacionAntesService} from "../../service/previsualizacion-antes.service";

@Component({
  selector: 'app-previsualizacion-antes',
  templateUrl: './previsualizacion-antes.component.html',
  styleUrls: ['./previsualizacion-antes.component.css'],
})
export class PrevisualizacionAntesComponent implements OnInit{
  constructor(
    private router: Router,
    private previsualizacionAntesService: PrevisualizacionAntesService) {}

  filenames : string[] = []
  sessionId : string | null = sessionStorage.getItem('sessionId');

  ngOnInit() {
    if (this.sessionId != null) {
      this.previsualizacionAntesService.getCsvColumns(this.filenames, this.sessionId).subscribe(
      (response) => {
         console.log(response)
      },
       (error) => {
         console.error('Error fetching CSV columns:', error);
       }
       );
    }
  }

  navigateToCarga() {
    this.router.navigate(['/column']);
  }
}
