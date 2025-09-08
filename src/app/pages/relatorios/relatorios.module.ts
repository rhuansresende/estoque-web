import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { RelatoriosRoutingModule } from "./relatorios-routing.module";
import { RelatoriosComponent } from "./relatorios.component";

@NgModule({
  imports: [
    RelatoriosRoutingModule,
    CommonModule,
    NgOptimizedImage
  ],
  declarations: [
    RelatoriosComponent
  ],
  providers: []
})
export class RelatoriosModule {}
