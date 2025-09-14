import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntl extends MatPaginatorIntl {

  constructor() {
    super();
    this.itemsPerPageLabel = 'Itens por página';
    this.nextPageLabel = 'Próxima página';
    this.previousPageLabel = 'Página anterior';
    this.firstPageLabel = 'Primeira página';
    this.lastPageLabel = 'Última página';
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    const startIndex = page * pageSize + 1;
    const endIndex = Math.min((page + 1) * pageSize, length);
    return `${startIndex} – ${endIndex} of ${length}`;
  }
}
