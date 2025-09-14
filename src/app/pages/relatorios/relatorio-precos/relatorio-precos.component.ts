import {Component, OnInit, ViewChild} from '@angular/core';
import {RelatorioService} from '../../../services/relatorio.service';
import {SnackbarService} from '../../../services/snackbar.service';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-relatorio-precos',
  standalone: false,
  templateUrl: './relatorio-precos.component.html',
  styleUrl: './relatorio-precos.component.scss'
})
export class RelatorioPrecosComponent implements OnInit {

  painelOpcoesAberto: boolean = true;
  painelRelatorioAberto: boolean = true;

  displayedColumns: string[] = [
    'produto',
    'precoCompra',
    'precoVenda',
    'percentualLucro'
  ];

  dataSource = new MatTableDataSource<any>([]);

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
    this.consultarRelatorioPrecos();
  }

  consultarRelatorioPrecos() {
    this.service.consultarRelatorioPrecos(this.pageIndex, this.pageSize).subscribe({
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
    this.service.emitirPdfRelatorioPrecos().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio_precos.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    })
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.consultarRelatorioPrecos();
  }
}
