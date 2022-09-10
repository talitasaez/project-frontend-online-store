import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Formulario from '../components/Formulario';

export default class ProdutoDetalhado extends Component {
  state = {
    produto: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const fetchProduto = await getProductById(id);

    this.setState({ produto: fetchProduto });
  }

  render() {
    const { produto } = this.state;
    const { adicionarAoCarrinho } = this.props;

    return (
      <div>
        <h3 data-testid="product-detail-name">{ produto.title }</h3>
        <img
          src={ produto.thumbnail }
          alt={ produto.title }
          data-testid="product-detail-image"
        />
        <h3 data-testid="product-detail-price">{ produto.price }</h3>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho
          </button>
        </Link>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => adicionarAoCarrinho(produto) }
        >
          Adicionar ao carrinho
        </button>
        <Formulario produtoId={ produto.id } />
      </div>
    );
  }
}

ProdutoDetalhado.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  adicionarAoCarrinho: PropTypes.func.isRequired,
};
