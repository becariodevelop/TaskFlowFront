import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type DemandProps = {
    celula: string
    labels: []
    dataChart: []
    label: string
}

const DemandChart = ({ celula, labels, dataChart, label }: DemandProps ) => {

    console.log(celula)
    console.log(labels)
    console.log(dataChart)
    console.log(label)

    return(
        <>
            <p>Este va a hacer los gráficos</p>
        </>
    );
}

export default DemandChart;