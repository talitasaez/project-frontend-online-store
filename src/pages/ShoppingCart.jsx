import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {
  state = {
    produtosNoCarrinho: [],
    filtrar: [],
  };

  componentDidMount() {
    this.atualizaCarrinho();
  }

  atualizaCarrinho = () => {
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
  };

  render() {
    const { produtosNoCarrinho, filtrar } = this.state;
    const { adicionarAoCarrinho } = this.props;

    return (
      <div>
        {produtosNoCarrinho && filtrar.map((e) => (
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
                adicionarAoCarrinho(e);
                this.atualizaCarrinho();
              } }
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
        {!produtosNoCarrinho && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        )}
      </div>
    );
  }
}
ShoppingCart.propTypes = {
  adicionarAoCarrinho: PropTypes.func.isRequired,
};
