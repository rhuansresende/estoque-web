import {Inject, Injectable } from "@angular/core";
import {Environment} from '../model/Environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {ProdutoModel} from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(
    @Inject('ENVIRONMENT') private environment: Environment,
    private _http: HttpClient
  ) {}

  consultarRelatorioPrecos(): Observable<any[]> {
    const url = `${this.environment.BASE_URL}/relatorios/sugestoes-precos`;
    return this._http.get<any[]>(`${url}`);
  }

  emitirPdfRelatorioPrecos(): Observable<Blob> {
    const url = `${this.environment.BASE_URL}/relatorios/sugestoes-precos/pdf`;
    return this._http.get<Blob>(`${url}`, { responseType: 'blob' as 'json'});
  }

  consultarRelatorioCompras(): Observable<any[]> {
    const url = `${this.environment.BASE_URL}/relatorios/sugestoes-compras`;
    return this._http.get<any[]>(`${url}`);
  }

  emitirPdfRelatorioCompras(): Observable<Blob> {
    const url = `${this.environment.BASE_URL}/relatorios/sugestoes-compras/pdf`;
    return this._http.get<Blob>(`${url}`, { responseType: 'blob' as 'json'});
  }

}
