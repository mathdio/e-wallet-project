import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testes da página de Login', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<Login />);
  });

  it('testa se o botão está desabilitado quando a página carrega', () => {
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, 'teste@teste.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '123456');

    expect(loginButton).toBeEnabled();
  });

  it('teste se o botão é habilitado quando os campos de email e senha possuem valores válidos', () => {
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, 'teste@teste.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '123456');

    expect(loginButton).toBeEnabled();
  });
});
