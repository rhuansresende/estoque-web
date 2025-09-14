import { Component, OnInit, ViewChild } from '@angular/core';
import {catchError, Observable, of } from "rxjs";
import {ProdutoModel} from '../../../model/produto.model';
import {RelatorioService} from '../../../services/relatorio.service';
import {SnackbarService} from '../../../services/snackbar.service';
import {MensagemModel} from '../../../model/mensagem.model';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-relatorio-compras',
  standalone: false,
  templateUrl: './relatorio-compras.component.html',
  styleUrl: './relatorio-compras.component.scss'
})
export class RelatorioComprasComponent implements OnInit {

  painelOpcoesAberto: boolean = true;
  painelRelatorioAberto: boolean = true;

  displayedColumns: string[] = [
    'produto',
    'quantidadeAtual',
    'quantidadeMinima'
  ];

  dataSource = new MatTableDataSource<ProdutoModel>([]);

  totalRegistros = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private service: RelatorioService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.consultarRelatorioCompras();
  }

  consultarRelatorioCompras() {
    this.service.consultarRelatorioCompras(this.pageIndex, this.pageSize).subscribe({
      next: (page) => {
        this.dataSource.data = page.content;
        this.totalRegistros = page.totalElements;
        this.pageIndex = page.number;
        this.pageSize = page.size;

        // vincula paginator somente quando o dataSource já tem dados
        if (!this.dataSource.paginator) {
          this.dataSource.paginator = this.paginator;
        }

        // força atualização de labels e botões
        setTimeout(() => {
          this.paginator.pageIndex = this.pageIndex;
          this.paginator.length = this.totalRegistros;
          this.paginator.pageSize = this.pageSize;
          this.paginator._intl.changes.next();
        });
      },
      error: (err) => this.snackbarService.show(err.error.message)
    });
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

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.consultarRelatorioCompras();
  }
}
