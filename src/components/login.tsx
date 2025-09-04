import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/login.css';

const Login = () => {

    const [usuario, setUsuario] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const baseUrl = import.meta.env.VITE_API_URL_BACKEND
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            /*
            //GET Example.
            const response = await axios.get(`${baseUrl}colaboradores/`);
            console.log(response.data);
            */
            //POST Example.
            const response = await axios.post(`${baseUrl}login/`, {
                nombre_usuario: usuario,
                clave: password
            });
            localStorage.setItem('token', JSON.stringify(response.data));
            //console.log(localStorage.getItem('token').nombre_usuario);
            //console.log(response.status);
            //console.log(response.data);
            navigate('/inicio');
            
        } catch (error) {
            console.log('Error al iniciar sesión', error);
        }

    }

    return (
        <>
            <div className="loginContent">
                <div className="loginContainer">
                    <img src="./src/assets/DNA-LOGO.png" className="logoDNA" alt="Logo DNA"/> 
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="formContainer">
                            <div className="inputUser">
                                <p><strong>USUARIO</strong></p>
                                <input 
                                    type="text" 
                                    id="username"
                                    name="username"
                                    placeholder="Usuario" 
                                    value={usuario} 
                                    onChange={(e) => setUsuario(e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="inputUser">
                                <p><strong>CLAVE</strong></p>
                                <input 
                                    type="password" 
                                    id="password"
                                    name="password"
                                    placeholder="Contraseña" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required />
                            </div>
                            <div className="inputUser">
                                <button 
                                    type="submit"
                                >
                                    <strong>
                                        INICIAR
                                    </strong>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;