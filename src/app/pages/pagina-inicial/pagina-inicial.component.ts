import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'estoque-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  standalone: false,
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
