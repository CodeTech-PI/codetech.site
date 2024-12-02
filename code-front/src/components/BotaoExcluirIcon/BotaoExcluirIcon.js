import './BotaoExcluirIcon.css';

const BotaoExcluirIcon = ({ onClick, altText }) => {
    return (
        <button 
            className='botao-excluir-icon' 
            onClick={onClick}
        >
            <img src='' alt={altText} className='icon-2' />
        </button>
    );
}

export default BotaoExcluirIcon;