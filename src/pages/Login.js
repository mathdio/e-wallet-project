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
    invalidEmail: false,
    invalidPassword: false,
    buttonClasses: 'button',
    passwordClasses: 'password-wrapper',
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
    if (email.length > 0 && !emailRegex.test(email)) {
      this.setState({
        invalidEmail: true,
        passwordClasses: 'password-wrapper Login-password-wrapper-warnings',
      });
    } else {
      this.setState({
        invalidEmail: false,
        passwordClasses: 'password-wrapper',
      });
    }
    if (password.length > 0 && password.length < passwordLength) {
      this.setState({
        invalidPassword: true,
        buttonClasses: 'button Login-button-warnings',
      });
    } else {
      this.setState({
        invalidPassword: false,
        buttonClasses: 'button',
      });
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
    localStorage.setItem('loginWallet', JSON.stringify(email));
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
    const { email, password, buttonDisabled, inputPasswordType,
      invalidEmail, invalidPassword, buttonClasses, passwordClasses } = this.state;
    return (
      <main className="form_container">
        <form onSubmit={ this.submitEmail } className="form">
          <h1 className="title-container">
            <BsCashCoin style={ { fontSize: '3.125rem' } } />
            {' '}
            E-Wallet
          </h1>
          <div className="input-container">
            <label htmlFor="email" className="Login-email-label">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                className="input"
                data-testid="email-input"
                value={ email }
                onChange={ this.handleChange }
              />
              {invalidEmail && (
                <p
                  className="Login__form-warning"
                >
                  E-mail&apos;s format must be valid.
                </p>)}
            </label>
            <div className={ passwordClasses }>
              <input
                name="password"
                type={ inputPasswordType }
                placeholder="Password"
                className="input"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleChange }
              />
              {invalidPassword && (
                <p className="Login__form-warning">
                  Password must have at least 6 characters.
                </p>)}
              <input
                name="showPassword"
                className="show-password-input"
                type="checkbox"
                onClick={ this.handleShowPassword }
              />
            </div>
            <button
              type="submit"
              className={ buttonClasses }
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
