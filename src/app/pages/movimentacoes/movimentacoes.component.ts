import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {MovimentacaoService} from '../../services/movimentacao.service';
import {SnackbarService} from '../../services/snackbar.service';
import {MatDialog} from '@angular/material/dialog';
import {MovimentacaoModel} from '../../model/movimentacao.model';
import {
  MovimentacaoFormDialogComponent
} from '../../components/dialogs/movimentacao-form-dialog-component/movimentacao-form-dialog.component';

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
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.consultarMovimentacoes();
  }

  consultarMovimentacoes() {
    this.movimentacoes$ = this.service.consultarMovimentacoes()
      .pipe(
        catchError((err) => {
          this.snackbarService.show(err.error.message)
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

}
