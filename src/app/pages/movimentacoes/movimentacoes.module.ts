import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import { MovimentacoesRoutingModule } from "./movimentacoes-routing.module";
import { MovimentacoesComponent } from "./movimentacoes.component";
import { MaterialModule } from "../../material.module";
import {DialogModule} from '../../components/dialogs/dialog.module';
import {SnackbarModule} from '../../components/snackbar/snackbar.module';
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    MovimentacoesRoutingModule,
    CommonModule,
    NgOptimizedImage,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DialogModule,
    SnackbarModule
  ],
  declarations: [
    MovimentacoesComponent
  ],
  providers: []
})
export class MovimentacoesModule {}
