import './BotaoRosaMaior.css'

const BotaoRosaMaior = ({ onClick, nomeBotao }) => (
    <button className="botao-rosa-maior" onClick={onClick}>
      {nomeBotao}
    </button>
);
  
export default BotaoRosaMaior;
  