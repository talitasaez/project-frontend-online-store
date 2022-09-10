import React, { Component } from 'react';

export default class Formulario extends Component {
  state = {
    email: '',
    text: '',
    rating: 0,
    verificacao: true,
    publicadas: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  adicionarComentario = () => {
    const { email, text, rating } = this.state;
    const { produtoId } = this.props;

    const novaPublicacao = {
      email,
      text,
      rating,
    };

    const regex = /\S+@\S+\.\S+/;
    const data = JSON.parse(localStorage.getItem(produtoId));

    if (regex.test(email) && rating && data) {
      this.setState(() => ({
        publicadas: [...data, novaPublicacao],
      }), () => {
        this.setState({
          email: '',
          text: '',
        });
        const { publicadas } = this.state;
        localStorage.setItem(produtoId, JSON.stringify(publicadas));
      });
    } else if (regex.test(email) && rating) {
      this.setState(((prevState) => ({
        publicadas: [...prevState.publicadas, novaPublicacao],
      }), () => {
        this.setState({
          email: '',
          text: '',
        });
        const { publicadas } = this.state;
        localStorage.setItem(produtoId, JSON.stringify(publicadas));
      }));
    }
  };

  verificarCampos = () => {
    const { email, rating } = this.state;

    const regex = /\S+@\S+\.\S+/;

    if (regex.test(email) && rating) {
      this.setState({ verificacao: true });
    } else {
      this.setState({ verificacao: false });
    }
  };

  render() {
    const { email, text, verificacao, publicadas, loading } = this.state;
    const { produtoId } = this.props;
    const localData = JSON.parse(localStorage.getItem(produtoId));

    return (
      <div>
        <form>
          <label htmlFor="product-detail-email">
            E-mail
            <input
              data-testid="product-detail-email"
              type="email"
              placeholder="digital seu e-mail"
              value={ email }
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <div>

            Avaliação:

            <label htmlFor="1">
              1
              <input
                data-testid="1-rating"
                id="1"
                type="radio"
                name="rating"
                value="1"
                onChange={ this.handleChange }

              />
            </label>
            <label htmlFor="2">
              2
              <input
                data-testid="2-rating"
                name="rating"
                id="2"
                type="radio"
                value="2"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="3">
              3
              <input
                data-testid="3-rating"
                name="rating"
                id="3"
                type="radio"
                value="3"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="4">
              4
              <input
                data-testid="4-rating"
                name="rating"
                id="4"
                type="radio"
                value="4"
                onChange={ this.handleChange }

              />
            </label>
            <label htmlFor="5">
              5
              <input
                data-testid="5-rating"
                name="rating"
                id="5"
                type="radio"
                value="5"
                onChange={ this.handleChange }

              />
            </label>
          </div>
          <label htmlFor="product-detail-evaluation">
            Comentários
            <textarea
              data-testid="product-detail-evaluation"
              type="text"
              placeholder="Faça um comentário"
              value={ text }
              name="text"
              rows="6"
              cols="20"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ () => {
              this.verificarCampos();
              this.adicionarComentario();
            } }
          >
            Enviar Avaliação
          </button>

          {(!verificacao)
          && <p data-testid="error-msg">Campos inválidos</p>}
        </form>

        <div>

          {(publicadas && localData) && localData.map((e) => (
            <div key={ `${e.email}${e.text}` }>
              <h3 data-testid="review-card-email">{ e.email }</h3>
              <h4 data-testid="review-card-rating">{ e.rating }</h4>
              <p data-testid="review-card-evaluation">{ e.text }</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
