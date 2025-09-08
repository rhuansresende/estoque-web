import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import { PaginaInicialComponent } from "./pagina-inicial/pagina-inicial.component";
import { ProdutosComponent } from "./produtos/produtos.component";
import { MovimentacoesComponent } from "./movimentacoes/movimentacoes.component";
import { RelatoriosComponent } from "./relatorios/relatorios.component";

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
        path: 'relatorios',
        component: RelatoriosComponent
      },
      {
        path: '',
        redirectTo: 'produtos',
        pathMatch: 'full'
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
