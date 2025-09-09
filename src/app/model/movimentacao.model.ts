import { ProdutoModel } from "./produto.model";

export interface MovimentacaoModel {
  id?: number;
  produto: ProdutoModel;
  tipo: string;
  quantidade: number;
  dataMovimentacao: string;
  precoCompra?: number;
  justificativa?: string;
}
