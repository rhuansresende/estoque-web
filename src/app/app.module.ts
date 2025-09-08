import {LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MaterialModule} from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
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
