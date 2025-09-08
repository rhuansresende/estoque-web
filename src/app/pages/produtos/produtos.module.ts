import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { ProdutosRoutingModule } from "./produtos-routing.module";
import { ProdutosComponent } from "./produtos.component";

@NgModule({
  imports: [
    ProdutosRoutingModule,
    CommonModule,
    NgOptimizedImage
  ],
  declarations: [
    ProdutosComponent
  ],
  providers: []
})
export class ProdutosModule {}
