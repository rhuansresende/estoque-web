import { Component, OnInit } from '@angular/core';
import {catchError, Observable, of } from "rxjs";
import {MovimentacaoService} from '../../services/movimentacao.service';
import { MatDialog } from '@angular/material/dialog';
import { MovimentacaoModel } from '../../model/movimentacao.model';
import {
  MovimentacaoFormDialogComponent
} from '../../components/dialogs/movimentacao-form-dialog-component/movimentacao-form-dialog.component';
import {ProdutoModel} from '../../model/produto.model';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  standalone: false,
  styleUrl: './movimentacoes.component.scss'
})
export class MovimentacoesComponent implements OnInit {

  movimentacoes$: Observable<MovimentacaoModel[]> = of([]);

  displayedColumns: string[] = [
    'nomeProduto',
    'tipo',
    'quantidade',
    'data',
    'acoes'
  ];

  constructor(
    private service: MovimentacaoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.consultarMovimentacoes();
  }

  consultarMovimentacoes() {
    this.movimentacoes$ = this.service.consultarMovimentacoes()
      .pipe(
        catchError(err => {
          console.log(err);
          return of([]);
        })
      );
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
        this.consultarMovimentacoes();
      }
    });
  }

  excluirMovimentacao(movimentacao: MovimentacaoModel) {}

}
