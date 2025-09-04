import { useNavigate } from "react-router";
import '../css/menu.css';

const Menu = () => {

    const navigate = useNavigate()

    const handleInicioNavigation = () => {
        navigate('/inicio');
    }

    const handleColaboradoresNavigation = () => {
        navigate('/colaboradores');
    }
    
    const handleClientesNavigation = () => {
        navigate('/clientes');
    }

    const handleCatalogoNavigation = () => {
        navigate('/act-catalogo');
    }

    const handleBitacoraNavigation = () => {
        navigate('/bitacora');
    }    

    const handleIndicadoresNavigation = () => {
        navigate('/indicadores');
    }    

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login');        
    }

    return(
        <>
            
            <div className="menuContainer">
                <div className="menu">
                    <div className="menu-item" onClick={() => {}}>
                        <button className="menu-btn" onClick={() => {handleInicioNavigation()}}>
                            INICIO
                        </button>
                    </div>
                    <div className="menu-item" onClick={() => {}}>
                        <button className="menu-btn" onClick={() => {handleColaboradoresNavigation()}}>
                            COLABORADORES
                        </button>
                    </div>
                    <div className="menu-item" onClick={() => {}}>
                        <button className="menu-btn" onClick={() => {handleClientesNavigation()}}>
                            CLIENTES
                        </button>
                    </div>
                    <div className="menu-item" onClick={() => {}}>
                        <button className="menu-btn" onClick={() => {handleCatalogoNavigation()}}>
                            CATALOGO ACTIVIDADES
                        </button>
                    </div>
                    <div className="menu-item" onClick={() => {}}>
                        <button className="menu-btn" onClick={() => {handleBitacoraNavigation()}}>
                            BITACORA
                        </button>
                    </div>
                    <div className="menu-item" onClick={() => {}}>
                        <button className="menu-btn" onClick={() => {handleIndicadoresNavigation()}}>
                            INDICADORES
                        </button>
                    </div>                    
                    <div className="menu-item">
                        <button className="menu-btn" onClick={() => {handleLogOut()}}>
                            LOG OUT
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;