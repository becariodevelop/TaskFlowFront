import axios from "axios";
import Menu from "./menu";
import { useEffect, useState } from "react";

interface Bitacora { //Interfaz principal
    id_bitacora_registro: number;
    fecha_registro?: string; //Formatear de date a str
    id_celula_agencia: number;
    celula: string;
    id_colaborador: number;
    nombre_colaborador: number;
    id_actividad: number;
    actividad: number;
    cantidad: number;
    id_unidad_cliente_interno: number;
    nombre_cliente_interno: number;
}

interface Celulas {
    id_celula_agencia_digital: number;
    celula?: string;
}

interface Colaborador {
    id_colaborador: number;
    celula?: string;
    estatus_colaborador?: string;
    horas_diarias?: number;
    horas_mes?: number;
    id_puesto_colaborador?: number;
    nombre_colaborador?: string;
    puesto_colaborador?: string;
}

interface Clientes {
    id_unidad_cliente_interno: number;
    nombre_cliente_interno?: string;
}

interface Actividades {
    id_actividad: number;
    actividad?: string;
    celula: string;
    costo_unitario: number;
    horas_actividad: number;
}

const Bitacora = () => {
    const baseUrl = import.meta.env.VITE_API_URL_BACKEND
    const [bitacora, setBitacora] = useState<Bitacora[]>([]);
    const [ createRecord, setCreateRecord ] = useState(false);

    const [celulas, setCelulas] = useState<Celulas[]>([]);
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
    const [actividades, setActividades] = useState<Actividades[]>([]);
    const [clientesInternos, setClientesInternos] = useState<Clientes[]>([]);
    const currentDate = new Date();
    const currentFormattedBeginMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().length > 0 ? (`0${currentDate.getMonth()+1}`):(currentDate.getMonth()+1)}-0${currentDate.getDate()**0}`;
    const currentFormattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().length > 0 ? (`0${currentDate.getMonth()+1}`):(currentDate.getMonth()+1)}-${String(currentDate.getDate()).padStart(2,'0')}`;
    console.log("Fecha-inicio: ", currentFormattedBeginMonth, "Fecha-fin: ", currentFormattedDate)
    const [ fechaInicio, setFechaInicio ] = useState(currentFormattedBeginMonth)
    const [ fechaFin, setFechaFin ] = useState(currentFormattedDate)

    


    const [selectedDate, setSelectedDate] = useState<Bitacora["fecha_registro"]>(currentFormattedDate);
    const [selectedCelula, setSelectedCelula] = useState<{
        id: number;
        nombre_celula: string;
    }>({id: 0, nombre_celula: ''});
    const [selectedNombreColaborador, setSelectedNombrecolaborador] = useState<{
        id: number;
        nombre_colaborador: string;
    }>({id: 0, nombre_colaborador: ''});
    const [selectedActividad, setSelectedActividad] = useState<{
        id: number;
        actividad: string;
    }>({id: 0, actividad: ''});
    const [selectedCantidad, setSelectedCantidad] = useState<Bitacora["cantidad"]>(1);
    const [selectedNombreClienteInterno, setSelectedNombreClienteInterno] = useState<{
        id: number;
        nombre_cliente_interno: string;
    }>({id: 0, nombre_cliente_interno: ''});


    useEffect(() => {
        try{
            const fetchBitacora = async () => {
                const response = await axios.get(`${baseUrl}bitacora-registros-fecha/`,{
                    params:{
                        fecha_inicio: currentFormattedBeginMonth,
                        fecha_termino: currentFormattedDate
                    }
                });
                setBitacora(response.data);
                console.log('Bitacora', response.data);
            }
            fetchBitacora();
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }
    },[baseUrl]);
    
    //Obtener celulas
    useEffect(() => {
        const fetchCelulas = async () => {
            const response = await axios.get(`${baseUrl}celulas/`);
            setCelulas(response.data);
            console.log(response.data, 'Celulas-----')
        }
        fetchCelulas();
    }, [baseUrl]);
    //Obtener colaboradores
    useEffect(() => {
        try{
            const fetchColaboradores = async () => {
                const response = await axios.get(`${baseUrl}colaboradores-activos/`);
                setColaboradores(response.data);
                console.log(response.data, 'Colaboradores-----')
            }
            fetchColaboradores();
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }        
    }, [baseUrl]);
    //Obtener actividades
    useEffect(() => {
        try{
            const fetchActividades = async () => {
                const response = await axios.get(`${baseUrl}actividades/`);
                setActividades(response.data)
                console.log(response.data);
            }
            fetchActividades();
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }        
    }, [baseUrl]);
    //Obtener clientes internos
    useEffect(() => {
        try{
            const fetchClientes = async () => {
                const response = await axios.get(`${baseUrl}unidades-cliente-interno/`);
                setClientesInternos(response.data)
                console.log(response.data);
            }
            fetchClientes();
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }
    }, [baseUrl])


    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        
        try{
            e.preventDefault();
            console.log(selectedDate)
            console.log(selectedCelula)
            console.log(selectedNombreColaborador)
            console.log(selectedActividad)
            console.log(selectedCantidad)
            console.log(selectedNombreClienteInterno)

            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Espera");

            const nuevoRegistro = {
                fecha_registro: selectedDate, //Formatear de date a str
                id_celula_agencia_digital: selectedCelula.id,
                celula: selectedCelula.nombre_celula,
                id_colaborador: selectedNombreColaborador.id,
                nombre_colaborador: selectedNombreColaborador.nombre_colaborador,
                id_actividad: selectedActividad.id,
                actividad: selectedActividad.actividad,
                cantidad: selectedCantidad,
                id_unidad_cliente_interno: selectedNombreClienteInterno.id,
                nombre_cliente_interno: selectedNombreClienteInterno.nombre_cliente_interno,
            }
    
            const response = await axios.post(
                `${baseUrl}crear-bitacora-registro/`, 
                nuevoRegistro,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            ;
            console.log ( response.data );
            

            setSelectedDate(currentFormattedDate)
            setSelectedCelula({
                id: 0,
                nombre_celula: ''
            })
            setSelectedNombrecolaborador({
                id: 0,
                nombre_colaborador: ''
            })
            setSelectedActividad({
                id: 0,
                actividad: ''
            })
            setSelectedCantidad(1)
            setSelectedNombreClienteInterno({
                id: 0,
                nombre_cliente_interno: ''
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

    const fetchBitacoraFC = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const response = await axios.get(`${baseUrl}bitacora-registros-fecha/`,{
                params: {
                    fecha_inicio: fechaInicio,
                    fecha_termino: fechaFin
                }
            })
            setBitacora(response.data);
            console.log('Bitacora new', response.data);
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }        
    }


    return(
        <>
            <Menu/>
            <br></br>
            <h1>Bitacora</h1>

            <button onClick={handleChangeStatus}>AGREGAR</button>

            {createRecord && 
                <div className="addRecord">
                    <form onSubmit={handleAdd} className="formAddRecord">
                        <div className="formContainer">
                            <div className="inputValue">
                                <p><strong>Fecha Registro</strong></p>
                                <input 
                                    type="date" 
                                    id="fechaRegistro"
                                    name="fechaRegistro"
                                    placeholder="fechaRegistro" 
                                    value={selectedDate} 
                                    onChange={(e) => setSelectedDate(e.target.value)} 
                                    required
                                />
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
                                <p><strong>Colaborador</strong></p>
                                <select
                                    value={selectedNombreColaborador.id}
                                    onChange={(e) => {
                                        const selectedId = Number(e.target.value);
                                        const colaboradorSeleccionado = colaboradores.find(c => c.id_colaborador === selectedId);
                                        setSelectedNombrecolaborador({
                                            id: selectedId,
                                            nombre_colaborador: colaboradorSeleccionado?.nombre_colaborador || "",
                                        });
                                    }}
                                    required
                                >
                                    <option value={''}>Seleccione un Colaborador</option>
                                    {colaboradores.map((colaborador) => (
                                        <option
                                            key={colaborador.id_colaborador}
                                            value={colaborador.id_colaborador}
                                        >
                                            {colaborador.nombre_colaborador}
                                        </option>
                                    ))

                                    }
                                </select>
                            </div>
                            <div className="inputValue">
                                <p><strong>Actividad</strong></p>
                                <select
                                    value={selectedActividad.id}
                                    onChange={(e) => {
                                        const selectedId = Number(e.target.value);
                                        const actividadSeleccionada = actividades.find(c => c.id_actividad === selectedId);
                                        setSelectedActividad({
                                            id: selectedId,
                                            actividad: actividadSeleccionada?.actividad || "",
                                        });
                                    }}
                                    required
                                >
                                    <option value={''}>Seleccione una Actividad</option>
                                    {actividades.map((actividad) => (
                                        <option
                                            key={actividad.id_actividad}
                                            value={actividad.id_actividad}
                                        >
                                            {actividad.actividad}
                                        </option>
                                    ))

                                    }
                                </select>
                            </div>   
                            <div className="inputValue">
                                <p><strong>Cantidad</strong></p>
                                <input 
                                    type="number" 
                                    min="1"
                                    max="100"
                                    step="1"
                                    id="cantidad"
                                    name="cantidad"
                                    placeholder="Cantidad" 
                                    value={selectedCantidad} 
                                    onChange={(e) => setSelectedCantidad(Number(e.target.value))} 
                                    required
                                />
                            </div>
                            <div className="inputValue">
                                <p><strong>Unidad Cliente</strong></p>
                                <select
                                    value={selectedNombreClienteInterno.id}
                                    onChange={(e) => {
                                        const selectedId = Number(e.target.value);
                                        const clienteSeleccionado = clientesInternos.find(c => c.id_unidad_cliente_interno === selectedId);
                                        setSelectedNombreClienteInterno({
                                            id: selectedId,
                                            nombre_cliente_interno: clienteSeleccionado?.nombre_cliente_interno || "",
                                        });
                                    }}
                                    required
                                >
                                    <option value={''}>Seleccione un Cliente</option>
                                    {clientesInternos.map((cliente) => (
                                        <option
                                            key={cliente.id_unidad_cliente_interno}
                                            value={cliente.id_unidad_cliente_interno}
                                        >
                                            {cliente.nombre_cliente_interno}
                                        </option>
                                    ))
                                    }
                                </select>
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

            <div className="consultarParametros">
                <form onSubmit={fetchBitacoraFC}>
                    <div className="inputValue">
                        <p><strong>Fecha Inicio</strong></p>
                        <input 
                            type="date" 
                            id="fechaInicio"
                            name="fechaInicio"
                            placeholder="fechaInicio" 
                            value={fechaInicio} 
                            onChange={(e) => setFechaInicio(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="inputValue">
                        <p><strong>Fecha Fin</strong></p>
                        <input 
                            type="date" 
                            id="fechaFin"
                            name="fechaFin"
                            placeholder="fechaFin" 
                            value={fechaFin} 
                            onChange={(e) => setFechaFin(e.target.value)} 
                            required
                        />
                    </div>

                    <button type='submit'>Consultar</button>
                </form>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Fecha Registro</th>
                        <th>Celula</th>
                        <th>Colaborador</th>
                        <th>Actividad</th>
                        <th>Cantidad</th>
                        <th>Unidad Cliente</th>
                    </tr>
                </thead>
                {
                    bitacora.map((registro, index) => (
                        <tbody key={index}>
                            <tr>
                                
                                <td>{registro.fecha_registro}</td>
                                <td>{registro.celula}</td>
                                <td>{registro.nombre_colaborador}</td>
                                <td>{registro.actividad}</td>
                                <td>{registro.cantidad}</td>
                                <td>{registro.nombre_cliente_interno}</td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </>
    )
}

export default Bitacora;