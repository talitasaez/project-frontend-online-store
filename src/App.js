import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProdutoDetalhado from './pages/ProdutoDetalhado';
import ShoppingCart from './pages/ShoppingCart';
// import * as api from './services/api';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ ShoppingCart } />
        <Route path="/produto/:id" component={ ProdutoDetalhado } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
