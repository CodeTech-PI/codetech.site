import './Footer.css'

const Footer = () => {
    return(
        <section className='footer'>
            <h2 className='titulo-footer'>ACOMPANHE MEU TRABALHO:</h2>
            <div>
                <img className='img-insta' src="./imagens/instagram.png" alt='Icone do instagram'></img>
                <p className="p-copyright">@LombardiTattoo</p>
            </div>
            <p className="p-texto">COPYRIGHT © 2024 Lombardi Tattoo</p>
            <p className="p-texto">Desenvolvido por CodeTech</p>
        </section>
    )
}

export default Footer