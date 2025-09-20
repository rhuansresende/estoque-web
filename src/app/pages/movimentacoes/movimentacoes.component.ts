import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap} from "rxjs";
import {MovimentacaoService} from '../../services/movimentacao.service';
import {SnackbarService} from '../../services/snackbar.service';
import {MatDialog} from '@angular/material/dialog';
import {MovimentacaoModel} from '../../model/movimentacao.model';
import {
  MovimentacaoFormDialogComponent
} from '../../components/dialogs/movimentacao-form-dialog-component/movimentacao-form-dialog.component';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ProdutoModel} from '../../model/produto.model';
import {ProdutoService} from "../../services/produto.service";
import moment from 'moment';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  standalone: false,
  styleUrl: './movimentacoes.component.scss'
})
export class MovimentacoesComponent implements AfterViewInit {

  formulario: FormGroup;
  painelPesquisaAberto: boolean = true;
  painelMovimentacoesAberto: boolean = true;
  filteredOptions!: Observable<ProdutoModel[]>;
  maxDate: Date = new Date();

  tipos = [
    'ENTRADA',
    'SAIDA'
  ];

  displayedColumns: string[] = [
    'nomeProduto',
    'tipo',
    'quantidade',
    'data',
    'acoes'
  ];

  dataSource = new MatTableDataSource<MovimentacaoModel>([]);

  totalRegistros = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _fb: FormBuilder,
    private service: MovimentacaoService,
    private snackbarService: SnackbarService,
    private produtoService: ProdutoService,
    private dialog: MatDialog
  ) {
    this.formulario = this._fb.group({
      produto: this._fb.control(null),
      tipo: this._fb.control(null),
      data: this._fb.control(moment().toDate())
    });
  }

  ngAfterViewInit() {
    const produtoControl = this.formulario.get('produto') as FormControl;
    this.filteredOptions = produtoControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        const nome = typeof value === 'string' ? value : value?.nome;
        return nome && nome.length >= 2
          ? this.produtoService.buscarProdutos(nome).pipe(catchError(() => of([])))
          : of([]);
      })
    );
    this.consultarMovimentacoes();
  }

  consultarMovimentacoes() {
    this.service.consultarMovimentacoes(
      this.pageIndex,
      this.pageSize,
      this.formulario.get('produto')?.value ? this.formulario.get('produto')?.value.id : null,
      this.formulario.get('tipo')?.value,
      this.formulario.get('data')?.value).subscribe({
      next: (page) => {
        this.dataSource.data = page.content;
        this.totalRegistros = page.totalElements;
        this.pageIndex = page.number;
        this.pageSize = page.size;

        // vincula paginator somente quando o dataSource já tem dados
        this.dataSource.paginator ??= this.paginator;

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

  novaMovimentacao(movimentacao?: MovimentacaoModel) {
    const dialogRef = this.dialog.open(MovimentacaoFormDialogComponent, {
      width: '90%',
      maxWidth: '600px',
      minWidth: '300px',
      data: movimentacao || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbarService.show("Movimentação Criada com sucesso!", 'success');
        this.consultarMovimentacoes();
      }
    });
  }

  editarMovimentacao(movimentacao: MovimentacaoModel) {
    const dialogRef = this.dialog.open(MovimentacaoFormDialogComponent, {
      width: '90%',
      maxWidth: '600px',
      minWidth: '300px',
      data: movimentacao
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbarService.show("Movimentação Editada com sucesso!", 'success');
        this.consultarMovimentacoes();
      }
    });
  }

  excluirMovimentacao(movimentacao: MovimentacaoModel) {
    const dados = {
      movimentacao,
      delete: true
    }

    const dialogRef = this.dialog.open(MovimentacaoFormDialogComponent, {
      width: '90%',
      maxWidth: '600px',
      minWidth: '300px',
      data: dados
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbarService.show("Movimentação Excluída com sucesso!", 'success');
        this.consultarMovimentacoes();
      }
    });
  }

  displayProdutoMovimentacao(produto: ProdutoModel): string {
    return produto && produto.nome ? `${produto.nome}` : '';
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.consultarMovimentacoes();
  }

  limpar() {
    this.formulario.reset({
      produto: null,
      tipo: null,
      data: moment().toDate()
    });
    this.consultarMovimentacoes();
  }

}
