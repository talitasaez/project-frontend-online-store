import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import '../styles/Produtos.css';
import { Link } from 'react-router-dom';

export default class Produtos extends Component {
  render() {
    const { produtos, adicionarAoCarrinho } = this.props;
    return (
      <div>
        {
          produtos.length !== 0 ? produtos.map((a) => (
            <div className="listaDeProdutos" data-testid="product" key={ a.id }>
              <h3>{ a.title }</h3>
              <img src={ a.thumbnail } alt={ a.title } />
              <h3>{ a.price }</h3>
              <Link to={ `/produto/${a.id}` } data-testid="product-detail-link">
                <button type="button">Mais detalhes</button>
              </Link>
              <button
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => adicionarAoCarrinho(a) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          )) : <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}

Produtos.propTypes = {
  produtos: PropTypes.arrayOf(shape()).isRequired,
  adicionarAoCarrinho: PropTypes.func.isRequired,

};
