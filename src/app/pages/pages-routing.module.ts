import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {PaginaInicialComponent} from "./pagina-inicial/pagina-inicial.component";

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
        path: '',
        redirectTo: 'mensagens',
        pathMatch: 'full'
      },
      {
        path: 'produtos',
        loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule)
      },
      {
        path: 'movimentacoes',
        loadChildren: () => import('./movimentacoes/movimentacoes.module').then(m => m.MovimentacoesModule)
      },
      {
        path: 'relatorios',
        loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule)
      },
      {
        path: 'mensagens',
        loadChildren: () => import('./mensagens/mensagens.module').then(m => m.MensagensModule)
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
