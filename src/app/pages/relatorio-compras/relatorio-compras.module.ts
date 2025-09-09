import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { MaterialModule } from "../../material.module";
import { DialogModule } from "../../components/dialogs/dialog.module";
import { BrowserModule } from "@angular/platform-browser";
import { RelatorioComprasRoutingModule } from "./relatorio-compras-routing.module";
import { RelatorioComprasComponent } from "./relatorio-compras.component";

@NgModule({
  imports: [
    RelatorioComprasRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    DialogModule,
    BrowserModule
  ],
  declarations: [
    RelatorioComprasComponent
  ],
  providers: []
})
export class RelatorioComprasModule {}
