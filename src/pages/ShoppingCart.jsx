import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ShoppingCart extends Component {
  state = {
    filtrar: [],
    produtosNoCarrinho: [],
  };

  componentDidMount() {
    this.setState({
      produtosNoCarrinho: JSON.parse(localStorage.getItem('produtosNoCarrinho')),
    }, () => {
      const { produtosNoCarrinho } = this.state;

      if (produtosNoCarrinho) {
        const setProduto = new Set();

        this.setState({
          filtrar: produtosNoCarrinho.filter((produto) => {
            const produtoDuplicado = setProduto.has(produto.id);
            setProduto.add(produto.id);
            return !produtoDuplicado;
          }),
        });
      }
    });
  }

  adicionarQuantidade = (produto) => {
    const { produtosNoCarrinho } = this.state;

    console.log(produto.available_quantity);

    const quantidadeAtual = produtosNoCarrinho.map((e) => produto.name === e.name).length;

    if (quantidadeAtual < produto.available_quantity) {
      this.setState((prevState) => ({
        produtosNoCarrinho: [...prevState.produtosNoCarrinho, produto],
      }), () => {
        const { produtosNoCarrinho: produtos } = this.state;
        localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtos));
      });
    }
  };

  subtrairQuantidade = (indice) => {
    this.setState((prevState) => ({
      produtosNoCarrinho: [...prevState.produtosNoCarrinho
        .filter((_e, i) => i !== indice)],
    }), () => {
      const { produtosNoCarrinho } = this.state;
      localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));
    });
  };

  removerProduto = (produto) => {
    this.setState((prevState) => ({
      produtosNoCarrinho: [...prevState.produtosNoCarrinho
        .filter((e) => e.title !== produto.title)],
    }), () => {
      const { produtosNoCarrinho } = this.state;
      localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));

      if (produtosNoCarrinho) {
        const setProduto = new Set();

        this.setState({
          filtrar: produtosNoCarrinho.filter((produtos) => {
            const produtoDuplicado = setProduto.has(produtos.id);
            setProduto.add(produtos.id);
            return !produtoDuplicado;
          }),
        });
      }
    });
  };

  render() {
    const { produtosNoCarrinho, filtrar } = this.state;

    return (
      <div>
        {produtosNoCarrinho && filtrar.map((e, i) => (
          <div key={ e.id }>
            <h3 data-testid="shopping-cart-product-name">{ e.title }</h3>
            <h4>{ e.price }</h4>
            <span
              data-testid="shopping-cart-product-quantity"
            >
              { produtosNoCarrinho.filter((a) => a.id === e.id).length }
            </span>
            <button
              data-testid="product-increase-quantity"
              type="button"
              onClick={ () => {
                this.adicionarQuantidade(e);
              } }
            >
              +
            </button>
            <button
              data-testid="product-decrease-quantity"
              type="button"
              onClick={ () => {
                this.subtrairQuantidade(i);
              } }
            >
              -
            </button>
            <button
              data-testid="remove-product"
              type="button"
              onClick={ () => {
                this.removerProduto(e);
              } }
            >
              Remover
            </button>

          </div>
        ))}
        <Link to="/checkout">
          <button
            data-testid="checkout-products"
            type="button"
          >
            Finalizar compra
          </button>
        </Link>
        {(!produtosNoCarrinho || produtosNoCarrinho.length === 0) && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        )}
      </div>
    );
  }
}
