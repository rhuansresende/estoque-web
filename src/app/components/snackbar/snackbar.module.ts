import {NgModule} from "@angular/core";
import {MaterialModule} from '../../material.module';
import {CustomSnackbarComponent} from "./custom-snackbar/custom-snackbar.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    CustomSnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    CustomSnackbarComponent
  ]
})
export class SnackbarModule {}
