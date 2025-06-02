import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importe MemoryRouter
import Home from '../Home'; // Ajuste o caminho se o arquivo Home.js estiver em outro local relativo

describe('Página Home', () => {
  // Teste 1: Verifica se a mensagem principal da home é renderizada
  it('deve renderizar a mensagem "Arte que dura para sempre."', () => {
    // Envolver o componente Home em MemoryRouter
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const homeMessage = screen.getByText('Arte que dura para sempre.');
    expect(homeMessage).toBeInTheDocument();
  });

  // Teste 2: Verifica se o título da seção "Quem é Leticia Lombardi?" é renderizado
  it('deve renderizar o título "Quem é Leticia Lombardi?"', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const leticiaTitle = screen.getByRole('heading', { name: 'Quem é Leticia Lombardi?' });
    expect(leticiaTitle).toBeInTheDocument();
  });

  // Teste 3: Verifica se parte do texto de descrição da Leticia é renderizada
  it('deve renderizar parte da descrição da Leticia Lombardi', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const leticiaDescription = screen.getByText(/Minha trajetória artística começou ainda na infância./i);
    expect(leticiaDescription).toBeInTheDocument();
  });

  // Teste 4: Verifica se o título da seção de orçamento é renderizado
  it('deve renderizar o título "Tem uma ideia? Vamos trazê-la à vida. Faça seu orçamento!"', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const budgetTitle = screen.getByRole('heading', { name: 'Tem uma ideia? Vamos trazê-la à vida. Faça seu orçamento!' });
    expect(budgetTitle).toBeInTheDocument();
  });

  // Teste 5: Verifica se o botão de orçamento é renderizado
  it('deve renderizar o botão "Orçamento"', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const budgetButton = screen.getByRole('button', { name: 'Orçamento' });
    expect(budgetButton).toBeInTheDocument();
  });

  // Teste 6: Verifica se o título da seção de endereço é renderizado
  it('deve renderizar o título "Onde nos encontrar:"', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const addressTitle = screen.getByRole('heading', { name: 'Onde nos encontrar:' });
    expect(addressTitle).toBeInTheDocument();
  });
  
});
