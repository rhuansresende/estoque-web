import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { RelatorioComprasComponent } from "./relatorio-compras/relatorio-compras.component";
import { RelatorioPrecosComponent } from "./relatorio-precos/relatorio-precos.component";

const routes: Routes = [
  {
    path: 'compras',
    component: RelatorioComprasComponent
  },
  {
    path: 'precos',
    component: RelatorioPrecosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule {}
