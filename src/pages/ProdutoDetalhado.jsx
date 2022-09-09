import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

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

    return (
      <div>
        <h3 data-testid="product-detail-name">{ produto.title }</h3>
        <img
          src={ produto.thumbnail }
          alt={ produto.title }
          data-testid="product-detail-image"
        />
        <h3 data-testid="product-detail-price">{ produto.price }</h3>
        <Link to="/cart" data-testid="shopping-cart-button">
          <button
            type="button"
          >
            Carrinho
          </button>
        </Link>
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
};
