import './BotaoRosa.css'

const BotaoRosa = ({ onClick, nomeBotao }) => (
    <button className="botao-rosa" onClick={onClick}>
      {nomeBotao}
    </button>
);
  
export default BotaoRosa;
  