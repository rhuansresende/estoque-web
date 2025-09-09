import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProdutoModel} from '../../../model/produto.model';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MovimentacaoModel} from "../../../model/movimentacao.model";
import {catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap} from "rxjs";
import {ProdutoService} from "../../../services/produto.service";

@Component({
  selector: 'app-movimentacao-form-dialog-component',
  standalone: false,
  templateUrl: './movimentacao-form-dialog.component.html',
})
export class MovimentacaoFormDialogComponent implements OnInit {

  formulario: FormGroup;
  filteredOptions!: Observable<ProdutoModel[]>;

  tipos = [
    'ENTRADA',
    'SAIDA'
  ];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<MovimentacaoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MovimentacaoModel | null,
    private produtoService: ProdutoService
  ) {
    this.formulario = this._fb.group({
      id: this._fb.control(data?.id || ''),
      produto: this._fb.control(data?.produto?.nome || '', [Validators.required]),
      tipo: this._fb.control(data?.tipo || '', [Validators.required]),
      quantidade: this._fb.control(data?.quantidade || '', [Validators.required]),
      precoCompra: this._fb.control(data?.precoCompra || ''),
      justificativa: this._fb.control(data?.justificativa || '')
    });
  }

  ngOnInit() {
    const produtoControl = this.formulario.get('produto') as FormControl;
    if (this.data?.produto) {
      this.produtoService.buscarProdutos(this.data.produto.nome).subscribe(produtos => {
        const produtoSelecionado = produtos.find(p => p.id === this.data?.produto.id);
        if (produtoSelecionado) {
          produtoControl.patchValue(produtoSelecionado);
        }
      })
    } else {
      this.filteredOptions = produtoControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          const nome = typeof value === 'string' ? value : value?.nome;
          return nome && nome.length >= 2
            ? this.produtoService.buscarProdutos(nome).pipe(catchError(() => of([])))
            : of([]);
        })
      );
    }

    const justificativaControl = this.formulario.get('justificativa') as FormControl;
    if (this.data != null) {
      justificativaControl?.setValidators([Validators.required]);
    } else {
      justificativaControl?.clearValidators()
    }
    justificativaControl?.updateValueAndValidity();
  }

  displayProdutoMovimentacao(produto: ProdutoModel): string {
    return produto && produto.nome ? `${produto.nome}` : '';
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
