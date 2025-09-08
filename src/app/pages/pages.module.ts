import {PagesRoutingModule} from "./pages-routing.module";
import {NgModule} from "@angular/core";
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  imports: [PagesRoutingModule],
  declarations: [NotFoundComponent]
})
export class PagesModule {}
