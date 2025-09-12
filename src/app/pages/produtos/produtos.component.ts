import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ProdutoService} from "../../services/produto.service";
import {SnackbarService} from "../../services/snackbar.service";
import {
  ProdutoFormDialogComponent
} from "../../components/dialogs/produto-form-dialog-component/produto-form-dialog.component";
import {MatDialog} from '@angular/material/dialog';
import {ProdutoModel} from '../../model/produto.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  standalone: false,
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {

  produtos$: Observable<ProdutoModel[]> = of([]);

  displayedColumns: string[] = [
    'nome',
    'quantidadeAtual',
    'quantidadeMinima',
    'acoes'
  ];

  constructor(
    private service: ProdutoService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos() {
    this.produtos$ = this.service.getProdutos()
      .pipe(
        catchError(err => {
          console.log(err);
          return of([]);
        })
      );
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
}
