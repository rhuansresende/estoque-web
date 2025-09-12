import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import {MaterialModule} from "../../material.module";
import {DialogModule} from '../../components/dialogs/dialog.module';
import {SnackbarModule} from '../../components/snackbar/snackbar.module';
import {RelatoriosRoutingModule} from "./relatorios-routing.module";
import {RelatorioComprasComponent} from "./relatorio-compras/relatorio-compras.component";
import {RelatorioPrecosComponent} from "./relatorio-precos/relatorio-precos.component";

@NgModule({
  declarations: [
    RelatorioComprasComponent,
    RelatorioPrecosComponent
  ],
  imports: [
    RelatoriosRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    DialogModule,
    SnackbarModule,
  ],
  exports: [
    RelatorioComprasComponent,
    RelatorioPrecosComponent
  ]
})
export class RelatoriosModule {}
