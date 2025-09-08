import { HttpClient } from "@angular/common/http";
import {Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Environment } from "../model/Environment";
import { ProdutoModel } from "../model/produto.model";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    @Inject('ENVIRONMENT') private environment: Environment,
    private _http: HttpClient
  ) {}

  getProdutos(): Observable<ProdutoModel[]> {
    const url = `${this.environment.BASE_URL}/produtos`;
    return this._http.get<ProdutoModel[]>(`${url}`);
  }

  salvarProduto(produto: ProdutoModel): Observable<ProdutoModel> {
    const url = `${this.environment.BASE_URL}/produtos`;
    return this._http.post<ProdutoModel>(`${url}`, produto);
  }

  editarProduto(produto: ProdutoModel): Observable<ProdutoModel> {
    const url = `${this.environment.BASE_URL}/produtos`;
    return this._http.put<ProdutoModel>(`${url}`, produto);
  }

  excluirProduto(idProduto: number): Observable<any> {
    const url = `${this.environment.BASE_URL}/produtos/${idProduto}`;
    return this._http.delete(`${url}`);
  }
}
