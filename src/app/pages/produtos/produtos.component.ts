import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of } from "rxjs";
import { ProdutoService } from "../../services/produto.service";
import { ProdutoFormDialogComponent } from "../../components/dialogs/produto-form-dialog-component/produto-form-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ProdutoModel } from '../../model/produto.model';

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
    private dialog: MatDialog
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

        const novoProduto: ProdutoModel = {
          ...result,
          situacao: produto?.situacao || "ATIVO"
        };

        this.service.salvarProduto(novoProduto).subscribe(
          () => this.getProdutos(),
            err => console.log(err)
        );
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

        const novoProduto: ProdutoModel = {
          ...result,
          situacao: produto?.situacao || "ATIVO"
        };

        this.service.editarProduto(novoProduto).subscribe(
          () => this.getProdutos(),
          err => console.log(err)
        );
      }
    });
  }

  excluirProduto(produto: ProdutoModel) {
    this.service.excluirProduto(produto.id!).subscribe(() => this.getProdutos(), err => console.log(err));
  }
}
