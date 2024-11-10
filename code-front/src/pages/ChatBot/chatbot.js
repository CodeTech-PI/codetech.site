// src/components/Chatbot/Chatbot.js

import React, { useState } from "react";
import Fuse from "fuse.js";
import { FaRobot } from "react-icons/fa";
import "./chatbot.css";

const faqData = [
    {
        question: "A tatuagem dói?",
        answer: "A dor varia de pessoa para pessoa e depende da área do corpo.",
      },
      {
        question: "Quanto tempo demora para cicatrizar?",
        answer: "O tempo médio de cicatrização é de 2 a 4 semanas.",
      },
      {
        question: "Quais cuidados devo ter após fazer uma tatuagem?",
        answer:
          "Evite exposição ao sol, mantenha a área hidratada e siga as recomendações do tatuador.",
      },
      {
        question: "Posso fazer tatuagem se estiver grávida?",
        answer:
          "Recomenda-se evitar tatuagens durante a gravidez para segurança do bebê.",
      },
      {
        question: "A tatuagem pode causar infecção?",
        answer:
          "Sim, se os cuidados pós-tatuagem não forem seguidos corretamente, pode haver risco de infecção.",
      },
      {
        question: "Quanto tempo depois da tatuagem posso tomar sol?",
        answer:
          "Evite a exposição direta ao sol durante o processo de cicatrização, geralmente de 2 a 4 semanas.",
      },
      {
        question: "O que pode acontecer se eu não cuidar da tatuagem?",
        answer:
          "Você pode sofrer com infecções, cicatrização inadequada e até perda de definição da tatuagem.",
      },
      {
        question: "Posso fazer tatuagem se tiver diabetes?",
        answer:
          "É possível, mas é importante consultar seu médico para garantir que não haverá complicações no processo de cicatrização.",
      },
      {
        question: "Quanto tempo leva para fazer uma tatuagem?",
        answer:
          "O tempo depende do tamanho e complexidade do desenho. Pode variar de 30 minutos a várias horas.",
      },
      {
        question: "A tatuagem pode desbotar com o tempo?",
        answer:
          "Sim, com o tempo e a exposição ao sol, a tatuagem pode desbotar, mas cuidados adequados ajudam a manter a cor.",
      },
      {
        question: "Qual é a melhor área do corpo para tatuar?",
        answer:
          "Depende da dor e da preferência de cada pessoa, mas áreas com mais gordura ou músculo geralmente doem menos.",
      },
      {
        question: "É possível remover uma tatuagem?",
        answer:
          "Sim, a remoção pode ser feita com laser, mas o processo é demorado e pode deixar cicatrizes.",
      },
      {
        question: "Tatuagens em pele escura ficam boas?",
        answer:
          "Sim, mas pode ser necessário usar cores mais claras ou técnicas especiais para garantir boa visibilidade.",
      },
      {
        question: "Posso tatuar sobre uma cicatriz?",
        answer:
          "É possível, mas o resultado pode variar dependendo da cicatriz e da técnica utilizada pelo tatuador.",
      },
      {
        question: "Tatuagem pode causar alergias?",
        answer:
          "Sim, algumas pessoas podem ter reações alérgicas às tintas usadas nas tatuagens, especialmente as cores mais vibrantes.",
      },
      {
        question: "Como escolher o tatuador certo?",
        answer:
          "Pesquise sobre o portfólio, leia avaliações, e converse sobre o design desejado antes de escolher o profissional.",
      },
      {
        question: "Posso tatuar com a pele bronzeada?",
        answer:
          "É recomendável esperar até que a pele esteja completamente curada e sem marcas de queimaduras solares.",
      },
      {
        question: "Quanto custa uma tatuagem?",
        answer:
          "O custo pode variar dependendo do tamanho, complexidade do design e do tatuador, mas geralmente é cobrado por hora.",
      },
      {
        question: "Posso fazer uma tatuagem se estiver doente?",
        answer:
          "Não é recomendado, pois o corpo pode ter uma resposta imunológica mais fraca e a cicatrização pode ser comprometida.",
      },
      {
        question: "Tatuagem pode fazer mal à saúde?",
        answer:
          "Desde que seja feita por um profissional qualificado e com os devidos cuidados, tatuagens não fazem mal à saúde.",
      },
      {
        question: "Posso fazer uma tatuagem se tiver pressão alta?",
        answer:
          "É recomendável consultar seu médico antes de fazer a tatuagem para garantir que não haverá complicações.",
      },
      {
        question: "Bom dia",
        answer: "bom dia!",
      },
      {
        question: "Boa tarde",
        answer: "boa tarde!",
      },
      {
        question: "Boa noite",
        answer: "boa noite!",
      },
      {
        question: "Oi",
        answer: "Oi, como posso ajudar ?",
      },
      {
        question: "Quanto custa a tatuagem?",
        answer: "Você precisará fazer o orçamento via whatsApp. Entre em contato com a Letícia Lombardi, por favor.",
      },
      {
        question: "Qual orçamento da tatuagem?",
        answer: "Você precisará fazer o orçamento via whatsApp. Entre em contato com a Letícia Lombardi, por favor.",
      },
      {
        question: "Quais tipos de tatuagem faz?",
        answer: "Dos mais variados possíveis: Aquarela, Realista e.",
      },
      {
        question: "Quais dias está disponível para atendimento",
        answer: "Todos os dias da semana",
      },

];

const fuse = new Fuse(faqData, {
  keys: ["question"],
  threshold: 0.3,
});

function Chatbot() {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = fuse.search(query);

    const answer =
      results.length > 0
        ? results[0].item.answer
        : "Desculpe, não encontrei uma resposta para essa pergunta.";

    setConversation([...conversation, { question: query, answer }]);
    setQuery("");
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <FaRobot className="robot-icon" />
        <h2>Chatbot de Perguntas Frequentes</h2>
      </div>

      <div className="conversation">
        {conversation.map((msg, index) => (
          <div key={index} className="message">
            <p>
              <strong>Você:</strong> {msg.question}
            </p>
            <p>
              <strong>Chatbot:</strong> {msg.answer}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSearch} className="input-area">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite sua pergunta..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Pesquisar
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
