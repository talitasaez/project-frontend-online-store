import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import Categorias from '../components/Categorias';
import Pesquisa from '../components/Pesquisa';
import Produtos from '../components/Produtos';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    produtos: [],
    foiPesquisado: false,
  };

  handleSearch = async (categoryId, query) => {
    const fetchSearch = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({
      produtos: fetchSearch.results,
      foiPesquisado: true,
    });
  };

  render() {
    const { produtos, foiPesquisado } = this.state;
    const { adicionarAoCarrinho, produtosNoCarrinho } = this.props;
    return (
      <>
        <Pesquisa handleSearch={ this.handleSearch } />
        <Link to="/cart" data-testid="shopping-cart-button">
          <button
            type="button"
          >
            Carrinho
          </button>
        </Link>
        <Categorias handleSearch={ this.handleSearch } />
        {foiPesquisado && <Produtos
          produtos={ produtos }
          adicionarAoCarrinho={ adicionarAoCarrinho }
          produtosNoCarrinho={ produtosNoCarrinho }
        />}

        {(produtos.length === 0 && foiPesquisado) && <p>Nenhum produto foi encontrado</p>}

        {!foiPesquisado && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
      </>
    );
  }
}

Home.propTypes = {
  adicionarAoCarrinho: PropTypes.func.isRequired,
  produtosNoCarrinho:
  PropTypes.arrayOf(shape([PropTypes.string, PropTypes.number])).isRequired,
};
