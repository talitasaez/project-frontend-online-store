import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {
  state = {
    filtrar: [],
  };

  componentDidMount() {
    this.atualizaCarrinho();
  }

  atualizaCarrinho = () => {
    const { pegarProdutos } = this.props;

    if (pegarProdutos) {
      const setProduto = new Set();

      this.setState({
        filtrar: pegarProdutos.filter((produto) => {
          const produtoDuplicado = setProduto.has(produto.id);
          setProduto.add(produto.id);
          return !produtoDuplicado;
        }),
      });
    }
  };

  render() {
    const { filtrar } = this.state;
    const { adicionarAoCarrinho, pegarProdutos, somarCarrinho } = this.props;

    return (
      <div>
        {pegarProdutos && filtrar.map((e) => (
          <div key={ e.id }>
            <h3 data-testid="shopping-cart-product-name">{ e.title }</h3>
            <h4>{ e.price }</h4>
            <span
              data-testid="shopping-cart-product-quantity"
            >
              { pegarProdutos.filter((a) => a.id === e.id).length }
            </span>
            <button
              data-testid="product-increase-quantity"
              type="button"
              onClick={ () => {
                adicionarAoCarrinho(e);
                this.atualizaCarrinho();
                somarCarrinho();
              } }
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
        {!pegarProdutos && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        )}
      </div>
    );
  }
}
ShoppingCart.propTypes = {
  adicionarAoCarrinho: PropTypes.func.isRequired,
};
