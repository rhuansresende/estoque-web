import { Component, OnInit } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {MensagemModel} from '../../model/mensagem.model';
import {MensagemService} from '../../services/mensagem.service';
import {SnackbarService} from '../../services/snackbar.service';
import {
  MensagemFormDialogComponent
} from '../../components/dialogs/mensagem-form-dialog-component/mensagem-form-dialog.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'estoque-mensagens.component',
  standalone: false,
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.scss'
})
export class MensagensComponent implements OnInit {

  mensagens$: Observable<MensagemModel[]> = of([]);

  displayedColumns: string[] = [
    'titulo',
    'mensagem',
    'tipo',
    'dataCriacao',
    'acoes'
  ];

  constructor(
    private service: MensagemService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMensagens();
  }

  getMensagens() {
    this.mensagens$ = this.service.consultarMensagens()
      .pipe(
        catchError(err => {
          this.snackbarService.show(err.error.message);
          return of([]);
        })
      );
  }

  lerMensagem(mensagem: MensagemModel) {
    const dialogRef = this.dialog.open(MensagemFormDialogComponent, {
      width: '90%',
      maxWidth: '600px',
      minWidth: '300px',
      data: mensagem
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbarService.show("Mensagem lida com sucesso!", "success");
        this.getMensagens();
      }
    });
  }

  excluirMensagem(mensagem: MensagemModel) {
    this.service.excluirMensagem(mensagem).subscribe({
      next: () => {
        this.snackbarService.show("Mensagem excluída com sucesso!", "success");
        this.getMensagens();
      },
      error: (err) => this.snackbarService.show(err.error.message)
    });
    this.getMensagens();
  }
}
