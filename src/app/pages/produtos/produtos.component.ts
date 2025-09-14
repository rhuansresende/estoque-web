import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ProdutoService} from "../../services/produto.service";
import {SnackbarService} from "../../services/snackbar.service";
import {
  ProdutoFormDialogComponent
} from "../../components/dialogs/produto-form-dialog-component/produto-form-dialog.component";
import {MatDialog} from '@angular/material/dialog';
import {ProdutoModel} from '../../model/produto.model';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SituacaoModel} from "../../model/situacao.model";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  standalone: false,
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements AfterViewInit {

  formulario: FormGroup;
  situacoes = Array<SituacaoModel>();
  painelPesquisaAberto: boolean = true;
  painelProdutosAberto: boolean = true;

  displayedColumns: string[] = [
    'nome',
    'quantidadeAtual',
    'quantidadeMinima',
    'acoes'
  ];

  dataSource = new MatTableDataSource<ProdutoModel>([]);

  totalRegistros = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _fb: FormBuilder,
    private service: ProdutoService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.formulario = this._fb.group({
      nome: this._fb.control(null),
      situacao: this._fb.control('ATIVO')
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.getSituacoesProduto();
    this.getProdutos();
  }

  getSituacoesProduto() {
    this.service.consultarSituacoesProduto().subscribe({
      next: (res) => this.situacoes = res,
      error: (err) => this.snackbarService.show(err.error.message)
    });
  }

  getProdutos() {
    this.service.getProdutos(
      this.pageIndex,
      this.pageSize,
      this.formulario.get('nome')?.value,
      this.formulario.get('situacao')?.value
    ).subscribe({
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


  novoProduto(produto?: ProdutoModel) {
    const dialogRef = this.dialog.open(ProdutoFormDialogComponent, {
      width: '90%',
      maxWidth: '600px',
      minWidth: '300px',
      data: produto || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbarService.show("Produto Criado com sucesso!", 'success');
        this.getProdutos();
      }
    });
  }

  editarProduto(produto: ProdutoModel) {
    const dialogRef = this.dialog.open(ProdutoFormDialogComponent, {
      width: '90%',
      maxWidth: '600px',
      minWidth: '300px',
      data: produto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbarService.show("Produto Editado com sucesso!", 'success');
        this.getProdutos();
      }
    });
  }

  excluirProduto(produto: ProdutoModel) {
    this.service.excluirProduto(produto.id!).subscribe(
      () => {
        this.snackbarService.show("Produto Excluído com sucesso!", 'success');
        this.getProdutos()
      },
      (err) => this.snackbarService.show(err.error.message, 'error'));
  }

  ativarProduto(produto: ProdutoModel) {
    this.service.ativarProduto(produto.id!).subscribe({
      next: () => {
        this.snackbarService.show("Produto Ativado com sucesso!", 'success');
        this.getProdutos()
      },
      error: (err) => this.snackbarService.show(err.error.message)
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProdutos();
  }

  limpar() {
    this.formulario.reset({
      nome: null,
      situacao: 'ATIVO'
    });
    this.getProdutos();
  }
}
