import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
// import * as api from './services/api';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Home /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
