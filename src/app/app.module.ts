import {LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MaterialModule} from "./material.module";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from '@angular/flex-layout';
import {DatePipe, registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { CustomPaginatorIntl } from "./components/paginator/CustomPaginatorIntl";

registerLocaleData(localePt, 'pt-BR');

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // entrada
  },
  display: {
    dateInput: 'DD/MM/YYYY', // input no campo
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

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
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS
    },
    {
      provide: 'ENVIRONMENT',
      useValue: environment
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl
    },
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
