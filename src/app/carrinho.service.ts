import { Oferta } from './shared/oferta.model';
import { Injectable } from '@angular/core';
import { ItemCarrinho } from './shared/item-carrinho.model';

@Injectable()
export class CarrinhoService {
  public itens: ItemCarrinho[] = [];
  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }
  public incluirItem(oferta: Oferta): void {
    const itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    );
    // verificar se o item já existe dentro do array, caso exista recupera a referencia do objeto no array
    const itemCarrrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemCarrrinhoEncontrado) {
      itemCarrrinhoEncontrado.quantidade += 1;
    } else {
      this.itens.push(itemCarrinho);
    }
  }

  public totalCarrinhoCompras(): number {
    let total = 0;
    this.itens.map((item: ItemCarrinho) => {
      total += (item.valor * item.quantidade);
    });
    return total;
  }
  public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    const itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemEncontrado) {
      itemEncontrado.quantidade ++;
    }
  }
  public subtrairQuantidade(itemCarrinho: ItemCarrinho): void {
    const itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemEncontrado) {
      itemEncontrado.quantidade --;
      if (itemEncontrado.quantidade === 0) {
        this.itens.splice(this.itens.indexOf(itemEncontrado), 1);
      }
    }
  }

  public limparCarrinho(): void {
      this.itens = [];
  }
}
