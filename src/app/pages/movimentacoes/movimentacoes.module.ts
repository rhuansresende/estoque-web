import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { MovimentacoesRoutingModule } from "./movimentacoes-routing.module";
import { MovimentacoesComponent } from "./movimentacoes.component";
import { MaterialModule } from "../../material.module";

@NgModule({
  imports: [
    MovimentacoesRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule
  ],
  declarations: [
    MovimentacoesComponent
  ],
  providers: []
})
export class MovimentacoesModule {}
