import {LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MaterialModule} from "./material.module";
import { environment } from "./environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';
import { registerLocaleData } from "@angular/common";
import localePt from '@angular/common/locales/pt';
import { CurrencyMaskDirective } from "./directives/CurrencyMaskDirective";

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: 'ENVIRONMENT',
      useValue: environment
    },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
