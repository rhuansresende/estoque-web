import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { RelatorioPrecosComponent } from "./relatorio-precos.component";

const routes: Routes = [
  {
    path: '',
    component: RelatorioPrecosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioPrecosRoutingModule {}
