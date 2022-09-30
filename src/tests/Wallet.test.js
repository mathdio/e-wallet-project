import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testes da página de Login', () => {
  it('testa se os valores dos inputs são apagados após o clique no botão', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '2');

    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'dois dólares');

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(button);

    expect(valueInput && descriptionInput).toHaveTextContent('');
  });
});
