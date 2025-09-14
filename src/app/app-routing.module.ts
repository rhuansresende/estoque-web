import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QuicklinkModule} from "ngx-quicklink";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/mensagens',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    redirectTo: 'pages/404'
  }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
