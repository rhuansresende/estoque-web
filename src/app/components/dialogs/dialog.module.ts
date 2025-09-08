import { NgModule } from "@angular/core";
import {ProdutoFormDialogComponent} from './produto-form-dialog-component/produto-form-dialog.component';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    ProdutoFormDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    ProdutoFormDialogComponent
  ]
})
export class DialogModule {}
