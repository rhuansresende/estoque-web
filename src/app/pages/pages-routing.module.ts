import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {PaginaInicialComponent} from "./pagina-inicial/pagina-inicial.component";
import {ProdutosComponent} from "./produtos/produtos.component";
import {MovimentacoesComponent} from "./movimentacoes/movimentacoes.component";
import {RelatorioComprasComponent} from "./relatorio-compras/relatorio-compras.component";
import {RelatorioPrecosComponent} from "./relatorio-precos/relatorio-precos.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pagina-inicial',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'pagina-inicial',
    component: PaginaInicialComponent,
    children: [
      {
        path: 'produtos',
        component: ProdutosComponent
      },
      {
        path: 'movimentacoes',
        component: MovimentacoesComponent
      },
      {
        path: 'relatorio/compras',
        component: RelatorioComprasComponent
      },
      {
        path: 'relatorio/precos',
        component: RelatorioPrecosComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
