import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    produtosNoCarrinho: [],
  };

  componentDidMount() {
    this.setState({
      produtosNoCarrinho: JSON.parse(localStorage.getItem('produtosNoCarrinho')),
    });
  }

  render() {
    const { produtosNoCarrinho } = this.state;

    return (
      <div>
        {produtosNoCarrinho && produtosNoCarrinho.map((e) => (
          <div key={ e.id }>
            <h3 data-testid="shopping-cart-product-name">{ e.title }</h3>
            <h4>{ e.price }</h4>
            <span
              data-testid="shopping-cart-product-quantity"
            >
              { produtosNoCarrinho.filter((a) => a.id === e.id).length }
            </span>
          </div>
        ))}
        {!produtosNoCarrinho && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        )}
      </div>
    );
  }
}
