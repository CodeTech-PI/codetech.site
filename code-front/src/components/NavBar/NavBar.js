import './NavBar.css'

const NavBar = () => {
    return (


        <section>

            <nav className='nav-bar'>

                <img className='img-logo' src="/imagens/logo.png"
                    alt="Logo do estudico com com duas imagens de dois cup cake e um máquina de tatuagem no meio"></img>
                <ul className='teste'>
                    <li >Guerreiras</li>
                    <li>Cuidados</li>
                    <li>Anamnese</li>
                    <li>Login</li>
                </ul>

            </nav>

            <div className='linha'></div>

        </section>


    );
}

export default NavBar