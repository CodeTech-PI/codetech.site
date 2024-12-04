// src/components/BotaoFechar/BotaoFechar.js

import React from "react";
import "./BotaoFechar.css";

const BotaoFechar = ({ onClick }) => {
  return (
    <button className="botao-fechar" onClick={() => {
      console.log("Fechar botão clicado");
      onClick();
    }}>
      Cancelar
    </button>
  );
};

export default BotaoFechar;
