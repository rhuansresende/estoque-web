import { NgModule } from "@angular/core";
import {ProdutoFormDialogComponent} from './produto-form-dialog-component/produto-form-dialog.component';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MovimentacaoFormDialogComponent } from "./movimentacao-form-dialog-component/movimentacao-form-dialog.component";
import {CurrencyMaskDirective} from '../../directives/CurrencyMaskDirective';
import { MensagemFormDialogComponent } from "./mensagem-form-dialog-component/mensagem-form-dialog.component";

@NgModule({
  declarations: [
    ProdutoFormDialogComponent,
    MovimentacaoFormDialogComponent,
    MensagemFormDialogComponent,
    CurrencyMaskDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    ProdutoFormDialogComponent,
    MovimentacaoFormDialogComponent,
    MensagemFormDialogComponent,
  ]
})
export class DialogModule {}
