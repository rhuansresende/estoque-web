import {Inject, Injectable } from "@angular/core";
import {Environment} from '../model/Environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MovimentacaoModel } from "../model/movimentacao.model";

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  constructor(
    @Inject('ENVIRONMENT') private environment: Environment,
    private _http: HttpClient
  ) {}

  consultarMovimentacoes(): Observable<MovimentacaoModel[]> {
    const url = `${this.environment.BASE_URL}/movimentacoes`;
    return this._http.get<MovimentacaoModel[]>(`${url}`);
  }

  salvarMovimentacao(movimentacao: MovimentacaoModel): Observable<MovimentacaoModel> {
    const url = `${this.environment.BASE_URL}/movimentacoes`;
    return this._http.post<MovimentacaoModel>(`${url}`, movimentacao);
  }

  editarMovimentacao(movimentacao: MovimentacaoModel): Observable<MovimentacaoModel> {
    const url = `${this.environment.BASE_URL}/movimentacoes`;
    return this._http.put<MovimentacaoModel>(`${url}`, movimentacao);
  }

}

