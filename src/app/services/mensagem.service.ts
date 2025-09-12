import {Inject, Injectable} from "@angular/core";
import {Environment} from '../model/Environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MensagemModel} from "../model/mensagem.model";

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    @Inject('ENVIRONMENT') private environment: Environment,
    private _http: HttpClient
  ) {}

  consultarMensagens(): Observable<MensagemModel[]> {
    const url = `${this.environment.BASE_URL}/mensagens`;
    return this._http.get<MensagemModel[]>(`${url}`);
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
