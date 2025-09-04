import axios from "axios";
import Menu from "./menu";
import { useEffect, useState } from "react";
import type { Colaboradores, Celulas, PuestoColaborador } from "../types";


const Colaboradores = () => {
    const baseUrl = import.meta.env.VITE_API_URL_BACKEND
    const [colaboradores, setColaboradores] = useState<Colaboradores[]>([]);
    const [ celulas, setCelulas ] = useState<Celulas[]>([]);
    const [ puestoColaborador, setPuestoColaborador ] = useState<PuestoColaborador[]>([]);
    const [ createRecord, setCreateRecord ] = useState(false);

    //FormData Input
    const [ nombreColaborador, setNombrecolaborador ] = useState<string>('');
    const [ selectedPuestoC, setSelectedPuestoC ] = useState<{
        id: number;
        puesto_colaborador: string;
    }>({ id: 0, puesto_colaborador: ''});

    const [selectedCelula, setSelectedCelula] = useState<{
        id: number;
        nombre_celula: string;
    }>({id: 0, nombre_celula: ''});
    const [ selectedIdEstatus, setIdEstatusColaborador ] = useState<number>(1); //Default 1
    const [ selectedEstatus, setSelectedEstatus ] = useState<string>('Activo'); //Default Activo
    const [ selectedHorasDiarias, setSelectedHorasDiarias] = useState(8);
    const [ selectedHorasMes, setSelectedHorasMes] = useState(0);


    useEffect(() => {
        setSelectedHorasMes( (selectedHorasDiarias*5)*4.3 )
    }, [selectedHorasDiarias])

    useEffect(() => {
        try{
            const fetchColaboradores = async () => {
                const response = await axios.get(`${baseUrl}colaboradores/`);
                setColaboradores(response.data)
                console.log(response.data);
            }
            fetchColaboradores();
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }
    },[baseUrl])

    useEffect(() => {
        try{
            const fetchCelulas = async () => {
                const response = await axios.get(`${baseUrl}celulas/`);
                setCelulas(response.data);
                console.log(response.data, 'Celulas-----')
            }
            fetchCelulas();
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }
    }, [baseUrl]);

        useEffect(() => {
        try{
            const fetchPuestos = async () => {
                const response = await axios.get(`${baseUrl}puestos-colaborador/`);
                setPuestoColaborador(response.data);
                console.log(response.data, 'Puestos-----')
            }
            fetchPuestos();
            
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }            
    }, [baseUrl]);

    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        //e.preventDefault()
        try{

            const nuevoRegistro = {
                celula: selectedCelula.nombre_celula,
                id_puesto_colaborador: selectedPuestoC.id, //Formatear de date a str
                puesto_colaborador: selectedPuestoC.puesto_colaborador,
                nombre_colaborador: nombreColaborador,
                horas_diarias: selectedHorasDiarias,
                horas_mes: selectedHorasMes,
                id_estatus_colaborador: selectedIdEstatus,
                estatus_colaborador: selectedEstatus
            }
    
            const response = await axios.post(
                `${baseUrl}crear-colaborador/`, 
                nuevoRegistro,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log ( response.data );

            setNombrecolaborador('')
            setSelectedPuestoC({
                id: 0,
                puesto_colaborador: ''
            })
            setSelectedCelula({
                id: 0,
                nombre_celula: ''
            })
            
            setCreateRecord(false)
            
        }catch(e){
            console.error("Error al crear registro", e)
            if (axios.isAxiosError(e)) {
                alert(`Error: ${e.response?.data?.message || e.message}`);
            } else {
                alert("Error desconocido al crear el registro");
            }
        }
    }

    const handleChangeStatus = () => {
        setCreateRecord(true)
    }

    return(
        <>
            <Menu/>
            <br></br>
            <h1>Colaboradores</h1>

            <button onClick={handleChangeStatus}>AGREGAR</button>

            {createRecord && 
            
                <div className="addRecord">
                    <form onSubmit={handleAdd} className="formAddRecord">
                        <div className="formContainer">
                            <div className="inputValue">
                                <p><strong>Nombre Colaborador</strong></p>
                                <input 
                                    type="text" 
                                    id="nombreColaborador"
                                    name="nombrecolaborador"
                                    placeholder="Nombre Colaborador" 
                                    value={nombreColaborador} 
                                    onChange={(e) => setNombrecolaborador(e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="inputValue">
                                <p><strong>Puesto Colaborador</strong></p>
                                <select
                                    value={selectedPuestoC.id}
                                    onChange={(e) => {
                                        const selectedId = Number(e.target.value);
                                        const puestoSeleccionado = puestoColaborador.find(c => c.id_puesto_colaborador === selectedId);
                                        setSelectedPuestoC({
                                            id: selectedId,
                                            puesto_colaborador: puestoSeleccionado?.puesto_colaborador || "",
                                        });
                                    }}
                                    required
                                >
                                    <option value={''}>Seleccione el Puesto</option>
                                    {puestoColaborador.map((puesto_colaborador) => (
                                        <option
                                            key={puesto_colaborador.id_puesto_colaborador}
                                            value={puesto_colaborador.id_puesto_colaborador}
                                        >
                                            {puesto_colaborador.puesto_colaborador}
                                        </option>
                                    ))

                                    }
                                </select>
                            </div>                            
                            <div className="inputValue">
                                <p><strong>Celula</strong></p>
                                <select
                                    value={selectedCelula.id}
                                    onChange={(e) => {
                                        const selectedId = Number(e.target.value);
                                        const celulaSeleccionada = celulas.find(c => c.id_celula_agencia_digital === selectedId);
                                        setSelectedCelula({
                                            id: selectedId,
                                            nombre_celula: celulaSeleccionada?.celula || "",
                                        });
                                    }}
                                    required
                                >
                                    <option value={''}>Seleccione una Celula</option>
                                    {celulas.map((celula) => (
                                        <option
                                            key={celula.id_celula_agencia_digital}
                                            value={celula.id_celula_agencia_digital}
                                        >
                                            {celula.celula}
                                        </option>
                                    ))

                                    }
                                </select>
                            </div>   

                            <div className="inputValue">
                                <p><strong>Horas Diarias</strong></p>
                                <input 
                                    type="number" 
                                    min="4"
                                    max="8"
                                    step="1"
                                    id="horas_diarias"
                                    name="horas_diarias"
                                    placeholder="Horas" 
                                    value={selectedHorasDiarias} 
                                    onChange={(e) => setSelectedHorasDiarias(Number(e.target.value))} 
                                    required
                                />
                            </div>

                            <div className="inputValue">
                                <p><strong>Horas Mes</strong></p>
                                <input 
                                    type="number" 
                                    min="1"
                                    max="200"
                                    step="1"
                                    id="horas_mes"
                                    name="horas_mes"
                                    placeholder="horas_mes" 
                                    value={selectedHorasMes} 
                                    onChange={(e) => setSelectedHorasMes(Number(e.target.value))} 
                                    required
                                />
                            </div>
                            
                            <div className="inputValue">
                                <button 
                                    type="submit"
                                >
                                    <strong>
                                        CREAR REGISTRO
                                    </strong>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }

            <table>
                <thead>
                    <tr>
                        <th>Id Colaborador</th>
                        <th>Nombre Colaborador</th>
                        <th>Puesto Colaborador</th>
                        <th>Celula Colaborador</th>
                        <th>Estatus Colaborador</th>
                    </tr>
                </thead>
                {
                    colaboradores.map((colaborador, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{colaborador.id_colaborador}</td>
                                <td>{colaborador.nombre_colaborador}</td>
                                <td>{colaborador.puesto_colaborador}</td>
                                <td>{colaborador.celula}</td>
                                <td>{colaborador.estatus_colaborador}</td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </>
    )
}

export default Colaboradores;