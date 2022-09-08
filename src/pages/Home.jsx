import React, { Component } from 'react';
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
        <Categorias />
        {foiPesquisado && <Produtos produtos={ produtos } />}
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
