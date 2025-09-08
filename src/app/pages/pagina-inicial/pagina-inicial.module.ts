import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import {PaginaInicialRoutingModule} from "./pagina-inicial-routing.module";
import {PaginaInicialComponent} from "./pagina-inicial.component";
import { MaterialModule } from "../../material.module";

@NgModule({
  declarations: [
    PaginaInicialComponent
  ],
  imports: [
    PaginaInicialRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule
  ],
  exports: [
    PaginaInicialComponent
  ],
  providers: []
})
export class PaginaInicialModule {}
