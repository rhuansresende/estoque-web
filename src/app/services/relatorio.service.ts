import {Inject, Injectable } from "@angular/core";
import {Environment} from '../model/Environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {ProdutoModel} from '../model/produto.model';
import { Page } from "../model/page.model";

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(
    @Inject('ENVIRONMENT') private environment: Environment,
    private _http: HttpClient
  ) {}

  consultarRelatorioPrecos(pageIndex: number, pageSize: number): Observable<Page<any>> {
    const url = `${this.environment.BASE_URL}/relatorios/sugestoes-precos?page=${pageIndex}&size=${pageSize}`;
    return this._http.get<Page<any>>(`${url}`);
  }

  emitirPdfRelatorioPrecos(): Observable<Blob> {
    const url = `${this.environment.BASE_URL}/relatorios/sugestoes-precos/pdf`;
    return this._http.get<Blob>(`${url}`, { responseType: 'blob' as 'json'});
  }

  consultarRelatorioCompras(pageIndex: number, pageSize: number): Observable<Page<any>> {
    const url = `${this.environment.BASE_URL}/relatorios/sugestoes-compras?page=${pageIndex}&size=${pageSize}`;
    return this._http.get<Page<any>>(`${url}`);
  }

  emitirPdfRelatorioCompras(): Observable<Blob> {
    const url = `${this.environment.BASE_URL}/relatorios/sugestoes-compras/pdf`;
    return this._http.get<Blob>(`${url}`, { responseType: 'blob' as 'json'});
  }

}
