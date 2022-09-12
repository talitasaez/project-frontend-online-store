import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ProdutoDetalhado from './pages/ProdutoDetalhado';
import ShoppingCart from './pages/ShoppingCart';
// import * as api from './services/api';

export default class App extends React.Component {
  state = {
    produtosNoCarrinho: [],
  };

  componentDidMount() {
    const produtosGuardados = localStorage.getItem('produtosNoCarrinho');

    if (produtosGuardados) {
      this.setState({
        produtosNoCarrinho: JSON.parse(produtosGuardados),
      });
    }
  }

  adicionarAoCarrinho = (produto) => {
    this.setState((prevState) => ({
      produtosNoCarrinho: [...prevState.produtosNoCarrinho, produto],
    }), () => {
      const { produtosNoCarrinho } = this.state;
      localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));
    });
  };

  render() {
    const { produtosNoCarrinho } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home
                { ...props }
                adicionarAoCarrinho={ this.adicionarAoCarrinho }
                produtosNoCarrinho={ produtosNoCarrinho }
              />
            ) }
          />
          <Route path="/cart" component={ ShoppingCart } />
          <Route
            path="/produto/:id"
            render={ (props) => (
              <ProdutoDetalhado
                { ...props }
                adicionarAoCarrinho={ this.adicionarAoCarrinho }
                produtosNoCarrinho={ produtosNoCarrinho }
              />
            ) }
          />
          <Route
            path="/checkout"
            render={ (props) => (
              <Checkout
                { ...props }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
