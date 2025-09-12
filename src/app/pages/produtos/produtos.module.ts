import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { ProdutosRoutingModule } from "./produtos-routing.module";
import { ProdutosComponent } from "./produtos.component";
import { MaterialModule } from "../../material.module";
import { DialogModule } from "../../components/dialogs/dialog.module";
import { SnackbarModule } from "../../components/snackbar/snackbar.module";

@NgModule({
  imports: [
    ProdutosRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    DialogModule,
    SnackbarModule
  ],
  declarations: [
    ProdutosComponent
  ],
  providers: []
})
export class ProdutosModule {}
