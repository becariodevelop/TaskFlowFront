import { useEffect, useState } from "react";
import Menu from "./menu";
import axios from "axios";
import type { Colaborador } from "../types";


const Inicio = () => {

    const baseUrl = import.meta.env.VITE_API_URL_BACKEND
    const [nombreUsuario, setNombreUsuario] = useState<string>('')
    const [idColaboradorUsuario, setIdColaboradorUsuario] = useState<number>()
    const [currentColaboradorUser, setCurrentColaboradorUser] = useState<Colaborador>({});

    const tokenString = localStorage.getItem('token')
    console.log('obtenido', tokenString)
    const token = tokenString ? JSON.parse(tokenString) : null;
    console.log('parseado', token)
    
    useEffect(()=>{
        if(token){
            setNombreUsuario(token.nombre_usuario)
            setIdColaboradorUsuario(token.id_colaborador)
            console.log('id', token.id_colaborador)
        }

    }, [token]);

    useEffect(() => {

    const fetchColaborador = async () => {
        if(idColaboradorUsuario){
            try{
                //const response = await axios.get(`${baseUrl}colaborador/${idColaboradorUsuario}`);
                const response = await axios.get(`${baseUrl}colaborador/`,{
                    params: {
                        id_colaborador: idColaboradorUsuario
                    }
                })
                console.log('Fetched', response.data)
                setCurrentColaboradorUser(response.data)
                console.log(currentColaboradorUser, 'Fetched Object')
    
            }catch(error){
                console.error('Error en la obtencion de datos', error)
            }
        }
    }
    fetchColaborador();
    }, [baseUrl, idColaboradorUsuario])

    return (
        <>
            <Menu/>
            <div className="containerInicio">
                <div className="mensajeBienvenida">
                    <p>Bienvenido {nombreUsuario}</p>
                </div>
                <div className="usuarioDatos">
                    <p>Celula: {currentColaboradorUser?.celula || ''}</p>
                    <p>Nombre Usuario: {currentColaboradorUser.nombre_colaborador}</p>
                    <p>Puesto Usuario: {currentColaboradorUser.puesto_colaborador}</p>
                    <p>Estatus Usuario: {currentColaboradorUser.estatus_colaborador}</p>
                </div>
            </div>
        </>
    );
}

export default Inicio;