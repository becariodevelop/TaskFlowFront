import axios from "axios";
import Menu from "./menu";
import { useEffect, useState } from "react";
import type { Actividades } from "../types";


const Actividades = () => {
    const baseUrl = import.meta.env.VITE_API_URL_BACKEND
    const [actividades, setActividades] = useState<Actividades[]>([]);

    useEffect(() => {
        const fetchActividades = async () => {
            const response = await axios.get(`${baseUrl}actividades/`);
            setActividades(response.data)
            console.log(response.data);
        }
        fetchActividades();
    },[baseUrl])

    return(
        <>
            <Menu/>
            <br></br>
            <h1>Actividades</h1>

            <table>
                <thead>
                    <tr>
                        <th>Id Actividad</th>
                        <th>Nombre Actividad</th>
                        <th>Celula</th>
                        <th>Costo Unitario</th>
                        <th>Horas Actividad</th>
                    </tr>
                </thead>
                {
                    actividades.map((actividad, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{actividad.id_actividad}</td>
                                <td>{actividad.actividad}</td>
                                <td>{actividad.celula}</td>
                                <td>{actividad.costo_unitario}</td>
                                <td>{actividad.horas_actividad}</td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </>
    )
}

export default Actividades;