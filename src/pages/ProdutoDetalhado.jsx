import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';
import { getProductById } from '../services/api';
import Formulario from '../components/Formulario';

export default class ProdutoDetalhado extends Component {
  state = {
    produto: {},
    freteGratis: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const fetchProduto = await getProductById(id);

    this.setState({
      produto: fetchProduto,
    }, () => {
      const { produto } = this.state;

      this.setState({ freteGratis: produto.shipping.free_shipping });
    });
  }

  render() {
    const { produto, freteGratis } = this.state;
    const { adicionarAoCarrinho, produtosNoCarrinho } = this.props;

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
            <p data-testid="shopping-cart-size">{ produtosNoCarrinho.length }</p>
          </button>
        </Link>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => adicionarAoCarrinho(produto) }
        >
          Adicionar ao carrinho
        </button>
        {freteGratis && <h4 data-testid="free-shipping">Frete Gratis</h4>}
        <Formulario produtoId={ produto.id } />
      </div>
    );
  }
}

ProdutoDetalhado.propTypes = {
  produtosNoCarrinho: PropTypes.arrayOf(shape()).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  adicionarAoCarrinho: PropTypes.func.isRequired,
};
