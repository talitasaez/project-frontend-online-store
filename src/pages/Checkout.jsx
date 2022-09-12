import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Checkout extends Component {
  state = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    metodoPagamento: '',
    verificacao: true,
    redirect: false,
    produtosNoCarrinho: [],
    filtrar: [],
  };

  componentDidMount() {
    const data = localStorage.getItem('produtosNoCarrinho');

    this.setState({
      produtosNoCarrinho: JSON.parse(data),
    }, () => {
      const { produtosNoCarrinho } = this.state;
      if (produtosNoCarrinho) {
        const setProduto = new Set();

        this.setState({
          filtrar: produtosNoCarrinho.filter((produto) => {
            const produtoDuplicado = setProduto.has(produto.id);
            setProduto.add(produto.id);
            return !produtoDuplicado;
          }),
        });
      }
    });
  }

  verificarCampos = () => {
    const { nome, cpf, telefone, cep, endereco, metodoPagamento, email } = this.state;

    const regex = /\S+@\S+\.\S+/;

    if (regex.test(email) && nome && cpf && telefone
    && cep && endereco && metodoPagamento) {
      this.setState({
        verificacao: true,
        redirect: true,
      }, () => {
        localStorage.removeItem('produtosNoCarrinho');
      });
    } else {
      this.setState({ verificacao: false });
    }
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { verificacao, filtrar, nome, cpf, telefone,
      cep, endereco, email, redirect } = this.state;

    return (
      <div>
        Checkout
        {filtrar.map((e) => (
          <h4 key={ e.id }>{e.title}</h4>
        ))}
        <form>
          <label htmlFor="fullName">
            Nome Completo:
            <input
              id="fullName"
              data-testid="checkout-fullname"
              type="text"
              name="nome"
              value={ nome }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              data-testid="checkout-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            Cpf:
            <input
              id="cpf"
              data-testid="checkout-cpf"
              type="text"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="phone">
            Telefone:
            <input
              id="phone"
              data-testid="checkout-phone"
              type="text"
              name="telefone"
              value={ telefone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              id="cep"
              data-testid="checkout-cep"
              type="text"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="address">
            Endereço:
            <input
              id="address"
              data-testid="checkout-address"
              type="text"
              name="endereco"
              value={ endereco }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="boleto">
            Boleto:
            <input
              id="boleto"
              name="metodoPagamento"
              data-testid="ticket-payment"
              type="radio"
              value="boleto"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="visa">
            Visa:
            <input
              id="visa"
              name="metodoPagamento"
              data-testid="visa-payment"
              type="radio"
              value="visa"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="masterCard">
            MasterCard:
            <input
              id="masterCard"
              name="metodoPagamento"
              data-testid="master-payment"
              type="radio"
              value="masterCard"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="elo">
            Elo:
            <input
              id="elo"
              name="metodoPagamento"
              data-testid="elo-payment"
              type="radio"
              value="elo"
              onChange={ this.handleChange }
            />
          </label>
        </form>

        <button
          data-testid="checkout-btn"
          type="button"
          onClick={ this.verificarCampos }
        >
          Finalizar
        </button>

        {redirect && <Redirect to="/" />}

        {(!verificacao)
          && <p data-testid="error-msg">Campos inválidos</p>}
      </div>
    );
  }
}
