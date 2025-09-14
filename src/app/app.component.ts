import {Component, ViewChild} from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'estoque-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  openSidenav() {
    this.sidenav.open();
  }

}
