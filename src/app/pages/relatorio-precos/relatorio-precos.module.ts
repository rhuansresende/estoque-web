import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { MaterialModule } from "../../material.module";
import { DialogModule } from "../../components/dialogs/dialog.module";
import { RelatorioPrecosComponent } from "./relatorio-precos.component";
import { RelatorioPrecosRoutingModule } from "./relatorio-precos-routing.module";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [
    RelatorioPrecosRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    DialogModule,
    BrowserModule
  ],
  declarations: [
    RelatorioPrecosComponent
  ],
  providers: []
})
export class RelatorioPrecosModule {}
