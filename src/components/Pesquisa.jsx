import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pesquisa extends Component {
  state = {
    pesquisa: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ pesquisa: value });
  };

  render() {
    const { pesquisa } = this.state;
    const { handleSearch } = this.props;

    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          value={ pesquisa }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ () => {
            handleSearch('', pesquisa);
            this.setState({ pesquisa: '' });
          } }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Pesquisa.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
