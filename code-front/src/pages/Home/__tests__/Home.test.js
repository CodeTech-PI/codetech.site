import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Página Home', () => {
  // Teste 1: Verifica se a mensagem principal da home é renderizada
  it('deve renderizar a mensagem "Arte que dura para sempre."', () => {
    render(<Home />);
    // Usa getByText para encontrar um elemento que contenha o texto exato
    const homeMessage = screen.getByText('Arte que dura para sempre.');
    // Verifica se o elemento está presente no documento
    expect(homeMessage).toBeInTheDocument();
  });

  // Teste 2: Verifica se o título da seção "Quem é Leticia Lombardi?" é renderizado
  it('deve renderizar o título "Quem é Leticia Lombardi?"', () => {
    render(<Home />);
    // Usa getByRole para encontrar um elemento de cabeçalho (h1, h2, etc.) com o texto
    const leticiaTitle = screen.getByRole('heading', { name: 'Quem é Leticia Lombardi?' });
    expect(leticiaTitle).toBeInTheDocument();
  });

  // Teste 3: Verifica se parte do texto de descrição da Leticia é renderizada
  it('deve renderizar parte da descrição da Leticia Lombardi', () => {
    render(<Home />);
    // Pode-se usar uma expressão regular ou parte do texto para encontrar o elemento
    const leticiaDescription = screen.getByText(/Minha trajetória artística começou ainda na infância./i);
    expect(leticiaDescription).toBeInTheDocument();
  });

  // Teste 4: Verifica se o título da seção de orçamento é renderizado
  it('deve renderizar o título "Tem uma ideia? Vamos trazê-la à vida. Faça seu orçamento!"', () => {
    render(<Home />);
    const budgetTitle = screen.getByRole('heading', { name: 'Tem uma ideia? Vamos trazê-la à vida. Faça seu orçamento!' });
    expect(budgetTitle).toBeInTheDocument();
  });

  // Teste 5: Verifica se o botão de orçamento é renderizado
  it('deve renderizar o botão "Orçamento"', () => {
    render(<Home />);
    // Usa getByRole para encontrar um botão com o texto "Orçamento"
    const budgetButton = screen.getByRole('button', { name: 'Orçamento' });
    expect(budgetButton).toBeInTheDocument();
  });

  // Teste 6: Verifica se o título da seção de endereço é renderizado
  it('deve renderizar o título "Onde nos encontrar:"', () => {
    render(<Home />);
    const addressTitle = screen.getByRole('heading', { name: 'Onde nos encontrar:' });
    expect(addressTitle).toBeInTheDocument();
  });
});