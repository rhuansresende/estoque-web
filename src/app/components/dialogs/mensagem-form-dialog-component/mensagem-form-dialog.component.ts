import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MensagemModel} from "../../../model/mensagem.model";
import { MensagemService } from "../../../services/mensagem.service";
import { catchError } from "rxjs";
import { SnackbarService } from "../../../services/snackbar.service";

@Component({
  selector: 'estoque-mensagem-form-dialog-component',
  standalone: false,
  templateUrl: './mensagem-form-dialog.component.html',
})
export class MensagemFormDialogComponent implements OnInit {

  formulario: FormGroup;
  mensagem!: MensagemModel;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<MensagemFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MensagemModel | null,
    private mensagemService: MensagemService,
    private snackbarService: SnackbarService
  ) {
    this.formulario = this._fb.group({
      id: this._fb.control(data?.id),
      titulo: this._fb.control({value: data?.titulo, disabled: true}),
      mensagem: this._fb.control({value: data?.mensagem, disabled: true}),
      dataCriacao: this._fb.control({value: data?.dataCriacao, disabled: true})
    });
  }

  ngOnInit() {
    this.lerMensagem();
  }

  lerMensagem() {
    this.mensagemService.lerMensagem(this.data!).subscribe({
      next: (mensagem) => this.mensagem = mensagem,
      error: (err) => this.snackbarService.show(err.error.message)
    })
  }

  fechar() {
    this._dialogRef.close(this.mensagem);
  }
}
