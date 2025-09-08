import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {QuicklinkModule} from "ngx-quicklink";
import {NgModule} from "@angular/core";
import {BlockUIModule, HttpSettings} from "ng-block-ui";
import {BlockUIHttpModule} from "ng-block-ui/http";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuicklinkModule,
    BlockUIModule.forRoot({
      message: 'Carregando',
      delayStop: 1000
    }),
    BlockUIHttpModule.forRoot(<HttpSettings>{
      url: 'estoque/rest/'
    })
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    QuicklinkModule,
    TranslateModule,
    BlockUIModule,
    BlockUIHttpModule
  ]
})
export class SharedModule {}
