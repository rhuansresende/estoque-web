import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, of } from "rxjs";
import { ProdutoService } from "../../services/produto.service";
import { ProdutoFormDialogComponent } from "../../components/dialogs/produto-form-dialog-component/produto-form-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ProdutoModel } from '../../model/produto.model';
import Swal, { SweetAlertIcon } from "sweetalert2";

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
        this.getProdutos();
      }
    });
  }

  excluirProduto(produto: ProdutoModel) {
    this.service.excluirProduto(produto.id!).subscribe(
      () => this.getProdutos(),
      (err) => this.showModal('Erro', err.error.message, 'error'));
  }

  showModal(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      titleText: title,
      text: text,
      icon: icon,
      draggable: true,
      showCancelButton: false,
      confirmButtonText: 'OK',
      showCloseButton: true,
      didOpen: () => {
        if (Swal.isVisible()) {
          Swal.hideLoading();
        }
      }
    })
  }
}
