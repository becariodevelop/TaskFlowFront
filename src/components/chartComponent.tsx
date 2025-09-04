import axios from 'axios';
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { Clientes, Celulas, Bitacora } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

import Menu from './menu';
import { useEffect, useState } from 'react';

interface RecurrenciaUCI {
    unidad_negocio: string;
    recurrencia: number;
    porcentaje: number;
}

interface PieChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }>;
}

// Tipo para las opciones del gráfico de pie
interface PieChartOptions {
    responsive: boolean;
    plugins: {
        legend: { position: 'top' };
        title: { display: boolean; text: string };
        tooltip?: {
            callbacks: {
                label: (ctx: any) => string;
            };
        };
        datalabels: {
            display: boolean;
            color: string;
            font: {
                weight: 'bold' | 'normal' | 'bolder' | 'lighter' | number;
                size: number;
            };
            formatter: (value: number, ctx: any) => string;
        };
    };
}

const ChartComponent = () => {

    const baseUrl = import.meta.env.VITE_API_URL_BACKEND
    const [registrosBitacoraFechaCelula, setRegistrosBitacoraFechaCelula] = useState<Bitacora[]>([]);
    const currentDate = new Date();
    const currentFormattedBeginMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().length > 0 ? (`0${currentDate.getMonth()+1}`):(currentDate.getMonth()+1)}-0${currentDate.getDate()**0}`;
    const currentFormattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().length > 0 ? (`0${currentDate.getMonth()+1}`):(currentDate.getMonth()+1)}-${String(currentDate.getDate()).padStart(2,'0')}`;

    const [fechaInicio, setFechaInicio] = useState(String(currentFormattedBeginMonth))
    const [fechaFin, setFechaFin] = useState(String(currentFormattedDate))
    
    const [clientesInternos, setClientesInternos] = useState<Clientes[]>([]);
    const [selectedNombreClienteInterno, setSelectedNombreClienteInterno] = useState<{
        id: number;
        nombre_cliente_interno: string;
    }>({id: 0, nombre_cliente_interno: ''});

    const [ cantidadTotalRecurrencia, setCantidadTotalRecurrenca ] = useState(0);
    const [ porcentajeRecurrenciaUCI, setPorcentajeRecurrenciaUCI ] = useState<RecurrenciaUCI[]>([])

    const [ dataPie, setDataPie ] = useState<PieChartData | null>(null);
    const [ optionsPie, setOptionsPie ] = useState<PieChartOptions | null>(null);

    const [celulas, setCelulas] = useState<Celulas[]>([]);
    const [selectedCelula, setSelectedCelula] = useState<{
        id: number;
        nombre_celula: string;
    }>({id: 0, nombre_celula: ''});


    const fetchBitacoraFC = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const response = await axios.get(`${baseUrl}bitacora-registros-fecha-celula/`,{
                params: {
                    fecha_inicio: fechaInicio,
                    fecha_termino: fechaFin,
                    celula: selectedCelula.nombre_celula
                }
            })
            setRegistrosBitacoraFechaCelula(response.data)
            console.log(response.data)
            const registros = response.data;
    
            const resumenUnidades: { [unidad: string]: number } = {};
    
            registros.forEach((r: any) => {
                if (resumenUnidades[r.nombre_cliente_interno]) {
                    resumenUnidades[r.nombre_cliente_interno] += r.cantidad;
                } else {
                    resumenUnidades[r.nombre_cliente_interno] = r.cantidad;
                }
            });
    
            const labels = Object.keys(resumenUnidades);
            const dataValues = Object.values(resumenUnidades);
            const total = dataValues.reduce((acc, val) => acc + val, 0);
    
            const dataChart = {
                labels,
                datasets: [
                {
                    label: 'Recurrencia por unidad',
                    data: dataValues,
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)'
                    ],
                    borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                },
                ],
            };
    
            const optionsChart: PieChartOptions = {
                responsive: true,
                plugins: {
                    legend: { position: 'top' as const },
                    title: { display: true, text: 'Demanda por Unidad de Negocio' },
                    tooltip: {
                        callbacks: {
                        label: (ctx: any) => {
                            const value = ctx.parsed;
                            const porcentaje = ((value / total) * 100).toFixed(1);
                            return `${ctx.label}: ${value} (${porcentaje}%)`;
                        },
                        },
                    },
                    datalabels: {
                        display: true, // Mostrar las etiquetas
                        color: '#fff', // Color del texto (blanco para que se vea sobre los colores)
                        font: {
                            weight: 'bold', // Texto en negrita
                            size: 12 // Tamaño de fuente
                        },
                        // Función para formatear cada etiqueta
                        formatter: (value: number, ctx: any) => {
                            // Calcular el porcentaje de cada valor
                            const porcentaje = ((value / total) * 100).toFixed(1);
                            // Retornar el porcentaje con símbolo %
                            return `${porcentaje}%`;
                        }
                    }
                },
            };
            setDataPie(dataChart);
            setOptionsPie(optionsChart);
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }
    }
    //fetchBitacoraFC();

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
            const fetchClientes = async () => {
                const response = await axios.get(`${baseUrl}unidades-cliente-interno/`);
                setClientesInternos(response.data)
                console.log(response.data, 'Clientes ----');
            }
            fetchClientes();
        }catch(e){
            console.error('Error en la obtención de datos: ', e)
        }        
    }, [baseUrl])

    const data = {
        labels: registrosBitacoraFechaCelula.map(r => r.actividad),
        datasets: [
            {
                label: 'Cantidad por actividad',
                data: registrosBitacoraFechaCelula.map(r => r.cantidad),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const options: PieChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Rendimiento de actividades' },
            datalabels: {
                display: true,
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 12
                },
                formatter: (value: number, ctx: any) => {
                    // Para el gráfico por defecto, necesitamos calcular el total de forma diferente
                    // porque no tenemos acceso directo a la variable 'total'
                    const dataset = ctx.chart.data.datasets[ctx.datasetIndex];
                    const totalDefault = dataset.data.reduce((a: number, b: number) => a + b, 0);
                    const porcentaje = ((value / totalDefault) * 100).toFixed(1);
                    return `${porcentaje}%`;
                }
            }
        },
    };

    return (
        <>
            <Menu />
            <p>
                <strong>
                    Rendimiento
                </strong>
            </p>
            <div id='demandaUnidadOrganizativa'>

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

                    <button type='submit'>Generar Grafico</button>
                </form>

                <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                    {dataPie && optionsPie ? (
                        <Pie data={dataPie} options={optionsPie} />
                    ) : (
                        <Pie data={data} options={options} />
                    )}
                </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </>
    );
}

export default ChartComponent;