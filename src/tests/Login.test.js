import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_TEST = 'teste@teste.com';
const PASSWORD_INPUT_TESTID = 'password-input';

describe('testes da página de Login', () => {
  it('testa se o botão está desabilitado quando a página carrega', () => {
    renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, EMAIL_TEST);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    userEvent.type(passwordInput, '123456');

    expect(loginButton).toBeEnabled();
  });

  it('teste se o botão é habilitado quando os campos de email e senha possuem valores válidos', () => {
    renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', { name: /entrar/i });

    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, EMAIL_TEST);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    userEvent.type(passwordInput, '123456');

    expect(loginButton).toBeEnabled();
  });

  it('testa se a página é redirecionada par a apágina de carteira quando fizer o login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, EMAIL_TEST);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    userEvent.type(passwordInput, '123456');

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(loginButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
