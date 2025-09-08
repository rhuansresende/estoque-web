import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProdutoModel } from "../../../model/produto.model";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-produto-form-dialog-component',
  standalone: false,
  templateUrl: './produto-form-dialog.component.html',
})
export class ProdutoFormDialogComponent {

  formulario: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ProdutoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProdutoModel | null
  ) {
    this.formulario = this._fb.group({
      id: this._fb.control(data?.id || ''),
      nome: this._fb.control(data?.nome || '', [Validators.required]),
      codigo: this._fb.control(data?.codigo || ''),
      quantidadeAtual: this._fb.control(data?.quantidadeAtual || '', [Validators.required]),
      quantidadeMinima: this._fb.control(data?.quantidadeMinima || '', [Validators.required]),
      precoCompra: this._fb.control(data?.precoCompra || ''),
      percentualLucro: this._fb.control(data?.percentualLucro || '')
    });
  }

  salvar() {
    if (this.formulario.valid) {
      this._dialogRef.close(this.formulario.value);
    }
  }

  cancelar() {
    this._dialogRef.close(null);
  }
}
