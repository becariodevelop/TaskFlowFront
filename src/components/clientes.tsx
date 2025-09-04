import axios from "axios";
import Menu from "./menu";
import { useEffect, useState } from "react";
import type { Clientes } from "../types";


const Clientes = () => {
    const baseUrl = import.meta.env.VITE_API_URL_BACKEND
    const [clientes, setClientes] = useState<Clientes[]>([]);

    useEffect(() => {
        try{
            const fetchClientes = async () => {
                const response = await axios.get(`${baseUrl}unidades-cliente-interno/`);
                setClientes(response.data)
                console.log(response.data);
            }
            fetchClientes();
            
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }        
    },[baseUrl])

    return(
        <>
            <Menu/>
            <br></br>
            <h1>Clientes</h1>

            <table>
                <thead>
                    <tr>
                        <th>Id Cliente Interno</th>
                        <th>Nombre Cliente Interno</th>
                    </tr>
                </thead>
                {
                    clientes.map((cliente, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{cliente.id_unidad_cliente_interno}</td>
                                <td>{cliente.nombre_cliente_interno}</td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </>
    )
}

export default Clientes;