import { Component, OnInit } from '@angular/core';
import {catchError, Observable, of } from "rxjs";
import {RelatorioService} from '../../services/relatorio.service';

@Component({
  selector: 'app-relatorio-precos',
  standalone: false,
  templateUrl: './relatorio-precos.component.html',
  styleUrl: './relatorio-precos.component.scss'
})
export class RelatorioPrecosComponent implements OnInit {

  precos$: Observable<any[]> = of([]);

  displayedColumns: string[] = [
    'produto',
    'precoCompra',
    'precoVenda',
    'percentualLucro'
  ];

  constructor(
    private service: RelatorioService,
  ) {}

  ngOnInit() {
    this.consultarRelatorioPrecos();
  }

  consultarRelatorioPrecos() {
    this.precos$ = this.service.consultarRelatorioPrecos()
      .pipe(
        catchError(err => {
          console.log(err);
          return of([]);
        })
      );
  }

  emitirRelatorio() {
    this.service.emitirPdfRelatorioPrecos().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio_precos.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    })
  }
}
