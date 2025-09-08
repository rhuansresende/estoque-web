import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared";
import {PaginaInicialRoutingModule} from "./pagina-inicial-routing.module";
import {PaginaInicialComponent} from "./pagina-inicial.component";

@NgModule({
    imports: [
        PaginaInicialRoutingModule,
        CommonModule,
        SharedModule,
        NgOptimizedImage
    ],
    declarations: [
        PaginaInicialComponent
    ],
    providers: []
})
export class PaginaInicialModule {}
