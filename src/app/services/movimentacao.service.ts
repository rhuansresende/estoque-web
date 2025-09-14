import {Inject, Injectable } from "@angular/core";
import {Environment} from '../model/Environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MovimentacaoModel } from "../model/movimentacao.model";
import { Page } from "../model/page.model";
import {isNotNull} from '../util/objeto.util';
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  constructor(
    @Inject('ENVIRONMENT') private environment: Environment,
    private _http: HttpClient,
    private datePipe: DatePipe
  ) {}

  consultarMovimentacoes(pageIndex: number, pageSize: number, produto: number, tipo: string, data: string): Observable<Page<MovimentacaoModel>> {
    let url = `${this.environment.BASE_URL}/movimentacoes?page=${pageIndex}&size=${pageSize}`;
    if (isNotNull(produto)) {
      url += `&produto=${produto}`;
    }
    if (isNotNull(tipo)) {
      url += `&tipo=${tipo}`;
    }
    if (isNotNull(data)) {
      url += `&data=${this.datePipe.transform(data, 'dd/MM/yyyy')}`;
    }
    return this._http.get<Page<MovimentacaoModel>>(`${url}`);
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

