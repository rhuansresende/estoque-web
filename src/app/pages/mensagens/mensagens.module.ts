import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { MaterialModule } from "../../material.module";
import {DialogModule} from '../../components/dialogs/dialog.module';
import {SnackbarModule} from '../../components/snackbar/snackbar.module';
import { MensagensRoutingModule } from "./mensagens-routing.module";
import { MensagensComponent } from "./mensagens.component";

@NgModule({
  imports: [
    MensagensRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    DialogModule,
    SnackbarModule
  ],
  declarations: [
    MensagensComponent
  ],
  providers: []
})
export class MensagensModule {}
