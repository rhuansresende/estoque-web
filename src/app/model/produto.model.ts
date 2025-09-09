export interface ProdutoModel {
  id?: number;
  nome: string;
  quantidadeAtual: number;
  quantidadeMinima: number;
  precoCompra: number;
  precoVenda?: number;
  percentualLucro: number;
  situacao?: string;
}
