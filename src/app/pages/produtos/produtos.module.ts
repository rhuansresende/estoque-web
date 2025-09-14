import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { ProdutosRoutingModule } from "./produtos-routing.module";
import { ProdutosComponent } from "./produtos.component";
import { MaterialModule } from "../../material.module";
import { DialogModule } from "../../components/dialogs/dialog.module";
import { SnackbarModule } from "../../components/snackbar/snackbar.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    ProdutosRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DialogModule,
    SnackbarModule
  ],
  declarations: [
    ProdutosComponent
  ],
  providers: []
})
export class ProdutosModule {}
