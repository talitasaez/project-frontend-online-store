import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';

export default class Produtos extends Component {
  render() {
    const { produtos } = this.props;
    return (
      <div>
        {
          produtos.length !== 0 ? produtos.map((a) => (
            <div data-testid="product" key={ a.id }>
              <h3>{ a.title }</h3>
              <img src={ a.thumbnail } alt={ a.title } />
              <h3>{ a.price }</h3>
            </div>
          )) : <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}

Produtos.propTypes = {
  produtos: PropTypes.arrayOf(shape()).isRequired,
};
