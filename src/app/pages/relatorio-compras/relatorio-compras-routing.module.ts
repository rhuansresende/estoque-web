import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { RelatorioComprasComponent } from "./relatorio-compras.component";

const routes: Routes = [
  {
    path: '',
    component: RelatorioComprasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioComprasRoutingModule {}
