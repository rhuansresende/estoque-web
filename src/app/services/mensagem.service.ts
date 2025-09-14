import {Inject, Injectable} from "@angular/core";
import {Environment} from '../model/Environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MensagemModel} from "../model/mensagem.model";
import {Page} from "../model/page.model";
import { TipoMensagemModel } from "../model/tipo-mensagem.model";
import { isNotNull } from "../util/objeto.util";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    @Inject('ENVIRONMENT') private environment: Environment,
    private _http: HttpClient,
    private datePipe: DatePipe
  ) {}

  consultarTipoMensagens(): Observable<TipoMensagemModel[]> {
    const url = `${this.environment.BASE_URL}/mensagens/tipo-mensagem`;
    return this._http.get<TipoMensagemModel[]>(`${url}`);
  }

  consultarMensagens(pageIndex: number, pageSize: number, titulo: string, tipoMensagem: string, dataCriacao: string): Observable<Page<MensagemModel>> {
    let url = `${this.environment.BASE_URL}/mensagens?page=${pageIndex}&size=${pageSize}`;
    if (isNotNull(titulo)) {
      url += `&titulo=${titulo}`;
    }
    if (isNotNull(tipoMensagem)) {
      url += `&tipoMensagem=${tipoMensagem}`;
    }
    if (isNotNull(dataCriacao)) {
      url += `&dataCriacao=${this.datePipe.transform(dataCriacao, 'dd/MM/yyyy')}`;
    }
    return this._http.get<Page<MensagemModel>>(`${url}`);
  }

  lerMensagem(mensagem: MensagemModel): Observable<MensagemModel> {
    const url = `${this.environment.BASE_URL}/mensagens/lerMensagem/${mensagem.id}`;
    return this._http.put<MensagemModel>(`${url}`, null);
  }

  excluirMensagem(mensagem: MensagemModel): Observable<any> {
    const url = `${this.environment.BASE_URL}/mensagens/${mensagem.id}`;
    return this._http.delete(`${url}`);
  }
}
