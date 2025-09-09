import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProdutoModel } from "../../../model/produto.model";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ProdutoService} from '../../../services/produto.service';
import Swal, { SweetAlertIcon } from "sweetalert2";

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
    @Inject(MAT_DIALOG_DATA) public data: ProdutoModel | null,
    private produtoService: ProdutoService
  ) {
    this.formulario = this._fb.group({
      id: this._fb.control(data?.id || ''),
      nome: this._fb.control(data?.nome || '', [Validators.required, Validators.maxLength(50)]),
      quantidadeAtual: this._fb.control(data?.quantidadeAtual || '', [Validators.required, Validators.maxLength(10)]),
      quantidadeMinima: this._fb.control(data?.quantidadeMinima || '', [Validators.required, Validators.maxLength(10)]),
      precoCompra: this._fb.control(data?.precoCompra || '', [Validators.maxLength(15)]),
      percentualLucro: this._fb.control(data?.percentualLucro || '', Validators.maxLength(3))
    });
  }

  salvar() {
    if (this.formulario.valid) {
      const produto: ProdutoModel = {
        id: this.formulario.get('id')?.value,
        nome: this.formulario.get('nome')?.value,
        quantidadeAtual: this.formulario.get('quantidadeAtual')?.value,
        quantidadeMinima: this.formulario.get('quantidadeMinima')?.value,
        precoCompra: parseFloat(this.formulario.get('precoCompra')?.value.replace(/[^0-9,]/g, '').replace(',', '.')),
        percentualLucro: this.formulario.get('percentualLucro')?.value
      };

      if (this.data) {
        this.produtoService.editarProduto(produto).subscribe(
          (produto) => this._dialogRef.close(produto),
          (err) => {
            this.showModal('Erro', err.error.message, 'error');
          }
        );
      } else {
        this.produtoService.salvarProduto(produto).subscribe(
          (produto) => this._dialogRef.close(produto),
          (err) => {
            this.showModal('Erro', err.error.message, 'error');
          }
        );
      }
    }
  }

  cancelar() {
    this._dialogRef.close(null);
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
