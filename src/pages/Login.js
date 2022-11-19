import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsCashCoin } from 'react-icons/bs';
import { loginAction } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
    inputPasswordType: 'password',
  };

  checkForm = () => {
    const { email, password } = this.state;
    const passwordLength = 6;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (emailRegex.test(email) && password.length >= passwordLength) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.checkForm();
    });
  };

  submitEmail = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { handleLogin, history } = this.props;
    handleLogin(email);
    history.push('/carteira');
  };

  handleShowPassword = () => {
    const { inputPasswordType } = this.state;
    if (inputPasswordType === 'password') {
      this.setState({
        inputPasswordType: 'text',
      });
    } else {
      this.setState({
        inputPasswordType: 'password',
      });
    }
  };

  render() {
    const { email, password, buttonDisabled, inputPasswordType } = this.state;
    return (
      <main className="form_container">
        <form onSubmit={ this.submitEmail } className="form">
          <div className="teste">
            <h1 className="title-container">
              <BsCashCoin style={ { fontSize: '3.125rem' } } />
              {' '}
              E-Wallet
            </h1>
          </div>
          <div className="input-container">
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              className="input"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
            <div className="password-wrapper">
              <input
                name="password"
                type={ inputPasswordType }
                placeholder="Password"
                className="input"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleChange }
              />
              <input
                name="showPassword"
                className="show-password-input"
                type="checkbox"
                onClick={ this.handleShowPassword }
              />
            </div>
            <button
              type="submit"
              className="button"
              disabled={ buttonDisabled }
            >
              Login
            </button>
          </div>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  handleLogin: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
