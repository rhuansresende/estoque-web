import { Component, OnInit } from '@angular/core';
import {catchError, Observable, of } from "rxjs";
import {ProdutoModel} from '../../model/produto.model';
import {RelatorioService} from '../../services/relatorio.service';

@Component({
  selector: 'app-relatorio-compras',
  standalone: false,
  templateUrl: './relatorio-compras.component.html',
  styleUrl: './relatorio-compras.component.scss'
})
export class RelatorioComprasComponent implements OnInit {

  compras$: Observable<ProdutoModel[]> = of([]);

  displayedColumns: string[] = [
    'produto',
    'quantidadeAtual',
    'quantidadeMinima'
  ];

  constructor(
    private service: RelatorioService,
  ) {}

  ngOnInit() {
    this.consultarRelatorioCompras();
  }

  consultarRelatorioCompras() {
    this.compras$ = this.service.consultarRelatorioCompras()
      .pipe(
        catchError(err => {
          console.log(err);
          return of([]);
        })
      );
  }

  emitirRelatorio() {
    this.service.emitirPdfRelatorioCompras().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio_compras.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    })
  }

}
