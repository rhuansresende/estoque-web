import {PagesRoutingModule} from "./pages-routing.module";
import {NgModule} from "@angular/core";
import {NotFoundComponent} from './not-found/not-found.component';
import { MaterialModule } from "../material.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    MaterialModule
  ],
  declarations: [
    NotFoundComponent
  ]
})
export class PagesModule {}
