import React, { Component } from 'react';

export default class Home extends Component {
  state = {
    paginaVazia: true,
  };

  render() {
    const { paginaVazia } = this.state;

    return (
      <>
        <input type="text" />
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
