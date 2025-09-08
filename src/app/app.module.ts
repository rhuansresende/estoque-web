import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared";

@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
