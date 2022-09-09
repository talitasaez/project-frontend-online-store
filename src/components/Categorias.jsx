import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Categorias extends Component {
  state = {
    categorias: [],
  };

  async componentDidMount() {
    this.pegarCategorias();
  }

  pegarCategorias = async () => {
    const fetchCategorias = await getCategories();
    this.setState({ categorias: fetchCategorias });
  };

  render() {
    const { categorias } = this.state;
    const { handleSearch } = this.props;

    return (
      <div>
        {
          categorias.map((e) => (
            <label key={ e.id } htmlFor={ e.id } data-testid="category">
              {e.name}
              <input
                type="radio"
                id={ e.id }
                name="categoria"
                onClick={ () => handleSearch(e.id, '') }
              />
            </label>

          ))
        }

      </div>
    );
  }
}

Categorias.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
