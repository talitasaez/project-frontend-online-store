import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categorias from '../components/Categorias';

export default class Home extends Component {
  state = {
    paginaVazia: true,
  };

  render() {
    const { paginaVazia } = this.state;

    return (
      <>
        <input type="text" />

        <Link to="/cart" data-testid="shopping-cart-button">
          <button
            type="button"
          >
            Carrinho
          </button>
        </Link>
        <Categorias />
        {paginaVazia && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
      </>
    );
  }
}
