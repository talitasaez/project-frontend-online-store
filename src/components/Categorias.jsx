import React, { Component } from 'react';
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

    return (
      <div>
        {
          categorias.map((e) => (
            <label key={ e.id } htmlFor={ e.id } data-testid="category">
              {e.name}
              <input type="radio" id={ e.id } name="categoria" />
            </label>

          ))
        }

      </div>
    );
  }
}
