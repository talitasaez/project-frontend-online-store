import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProdutoDetalhado from './pages/ProdutoDetalhado';
import ShoppingCart from './pages/ShoppingCart';
// import * as api from './services/api';

export default class App extends React.Component {
  state = {
    produtosNoCarrinho: [],
    pegarProdutos: [],
  };

  componentDidMount() {
    this.somarCarrinho();
  }

  adicionarAoCarrinho = (produto) => {
    this.setState((prevState) => ({
      produtosNoCarrinho: [...prevState.produtosNoCarrinho, produto],
    }), () => {
      const { produtosNoCarrinho } = this.state;
      localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));
    });
  };

  somarCarrinho = () => {
    this.setState({
      pegarProdutos: JSON.parse(localStorage.getItem('produtosNoCarrinho')),
    });
  };

  render() {
    const { produtosNoCarrinho, pegarProdutos } = this.state;
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
          <Route
            path="/cart"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                pegarProdutos={ pegarProdutos }
                somarCarrinho={ this.somarCarrinho }
                adicionarAoCarrinho={ this.adicionarAoCarrinho }
              />
            ) }
          />
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
        </Switch>
      </BrowserRouter>
    );
  }
}
