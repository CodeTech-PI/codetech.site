
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrossel.css';

const Carrossel = (props) => {
    return (
      <div className="container-carrosel-test">
      <div className=" custom-carousel-container">
        { <h2 className="titulo-carrossel">{props.tituloCarrosel}</h2>}
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* Primeiro grupo de 3 imagens */}
            <div className="carousel-item active">
              <div className="row-carossel-test">
                <div >
                  <img className="img-test" src={props.image1}  alt={props.descricao1} />
                </div>
                <div >
                  <img className="img-test" src={props.image2}   alt={props.descricao2} />
                </div>
                <div >
                  <img className="img-test" src={props.image3}   alt={props.descricao3} />
                </div>
              </div>
            </div>
            {/* Segundo grupo de 3 imagens */}
            <div className="carousel-item">
              <div className="row-carossel-test">
                <div >
                  <img className="img-test" src={props.image4}  alt={props.descricao4} />
                </div>
                <div >
                  <img className="img-test" src={props.image5}  alt={props.descricao5} />
                </div>
                <div >
                  <img className="img-test" src={props.image6}  alt={props.descricao6} />
                </div>
              </div>
            </div>
          </div>
  
          {/* Controles de navegação */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
  
      </div>
      </div>
    );
  }

        export default Carrossel