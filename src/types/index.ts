
export interface Colaborador {
  celula?: string;
  nombre_colaborador?: string;
  puesto_colaborador?: string;
  estatus_colaborador?: string;
}

export interface Colaboradores {
    id_colaborador: number;
    celula?: string;
    estatus_colaborador?: string;
    horas_diarias?: number;
    horas_mes?: number;
    id_puesto_colaborador?: number;
    nombre_colaborador?: string;
    puesto_colaborador?: string;
}

export interface Celulas {
    id_celula_agencia_digital: number;
    celula?: string;
}

export interface PuestoColaborador {
    id_puesto_colaborador: number;
    puesto_colaborador: string;
    celula: string;
    unidad_organizativa: number;
}

export interface Actividades {
    id_actividad: number;
    actividad?: string;
    celula: string;
    costo_unitario: number;
    horas_actividad: number;
}

export interface Clientes {
    id_unidad_cliente_interno: number;
    nombre_cliente_interno?: string;
}

export interface Bitacora { //Interfaz principal
    id_bitacora_registro: number;
    fecha_registro?: string; //Formatear de date a str
    id_celula_agencia: number;
    celula: string;
    id_colaborador: number;
    nombre_colaborador: number;
    id_actividad: number;
    actividad: string;
    cantidad: number;
    id_unidad_cliente_interno: number;
    nombre_cliente_interno: string;
}