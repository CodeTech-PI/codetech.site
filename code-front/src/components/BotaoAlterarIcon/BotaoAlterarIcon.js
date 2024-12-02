import './BotaoAlterarIcon.css';

const BotaoAlterarIcon = ({ onClick, altText }) => {
    return (
        <button 
            className='botao-alterar-icon' 
            onClick={onClick}
        >
            <img src='' alt={altText} className='icon' />
        </button>
    );
}

export default BotaoAlterarIcon;