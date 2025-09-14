import { HttpClient } from "@angular/common/http";
import {Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Environment } from "../model/Environment";
import { ProdutoModel } from "../model/produto.model";
import { Page } from "../model/page.model";
import { SituacaoModel } from "../model/situacao.model";
import {isNotNull} from '../util/objeto.util';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    @Inject('ENVIRONMENT') private environment: Environment,
    private _http: HttpClient
  ) {}

  consultarSituacoesProduto(): Observable<SituacaoModel[]> {
    const url = `${this.environment.BASE_URL}/produtos/situacao-produto`;
    return this._http.get<SituacaoModel[]>(`${url}`);
  }

  getProdutos(pageIndex: number, pageSize: number, nome: string, situacao: string): Observable<Page<ProdutoModel>> {
    let url = `${this.environment.BASE_URL}/produtos?page=${pageIndex}&size=${pageSize}`;
    if (isNotNull(nome)) {
      url += `&nome=${nome}`;
    }
    if (isNotNull(situacao)) {
      url += `&situacao=${situacao}`;
    }
    return this._http.get<Page<ProdutoModel>>(`${url}`);
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

  buscarProdutos(filtro: string): Observable<ProdutoModel[]> {
    const url = `${this.environment.BASE_URL}/produtos/buscar?q=${filtro}`;
    return this._http.get<ProdutoModel[]>(`${url}`);
  }

  ativarProduto(idProduto: number): Observable<any> {
    const url = `${this.environment.BASE_URL}/produtos/ativar-produto/${idProduto}`;
    return this._http.put(`${url}`, null);
  }
}
