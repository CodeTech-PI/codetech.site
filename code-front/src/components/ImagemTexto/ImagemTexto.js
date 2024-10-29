import './ImagemTexto.css'

const ImagemTexto = (props) => {
    return (
     

        <section className='imagem-texto'>
            
            <div className='container-sobre'>
            <h2 className='titulo-sobre'>{props.title}</h2>
            <div className='container-conteudo'>
            <img className='img-leticia' src={props.image} alt={props.descricao}></img>
            <p className='texto-sobre'>{props.texto}</p>
            </div>
            </div>

        </section>
         
    )
}

export default ImagemTexto



   