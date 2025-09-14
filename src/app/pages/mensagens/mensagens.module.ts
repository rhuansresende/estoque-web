import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { MaterialModule } from "../../material.module";
import {DialogModule} from '../../components/dialogs/dialog.module';
import {SnackbarModule} from '../../components/snackbar/snackbar.module';
import { MensagensRoutingModule } from "./mensagens-routing.module";
import { MensagensComponent } from "./mensagens.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    MensagensRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DialogModule,
    SnackbarModule
  ],
  declarations: [
    MensagensComponent
  ],
  providers: []
})
export class MensagensModule {}
