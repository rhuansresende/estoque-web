import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'estoque-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  standalone: false,
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}
