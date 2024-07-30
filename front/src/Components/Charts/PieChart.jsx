import React, { useContext, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axiosInstance from '../../Config/AxoisConfig';
import { AppContext } from '../../Context/AppContext';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    ChartDataLabels
);

export const PieChart = () => {
    const _id = useContext(AppContext);
    const [pie, setPie] = useState({
        twoWheeler: 0,
        threeWheeler: 0,
        fourWheeler: 0
    });

    useEffect(() => {
        const fetchPie = async () => {
            try {
                const postData = {
                    _id: _id
                }
                const response = await axiosInstance.post("/record/total", postData)
                if (response.data.success) {
                    setPie({
                        twoWheeler: response.data.data.twoWheeler,
                        threeWheeler: response.data.data.threeWheeler,
                        fourWheeler: response.data.data.fourWheeler,
                    });
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Internal Server Error")
            }
        }
        fetchPie();
    }, [_id]);

    const labels = ['Bike', 'Auto', 'Car'];
    let chartData = [pie.twoWheeler, pie.threeWheeler, pie.fourWheeler];

    const allZero = chartData.every(value => value === 0);
    const singleNonZero = chartData.filter(value => value !== 0).length === 1;

    if (allZero || singleNonZero) {
        chartData = chartData.map(value => value === 0 ? 0.01 : value);
    }

    const data = {
        labels: labels,
        datasets: [
            {
                data: chartData,
                backgroundColor: [
                    '#ff6384',
                    '#6b5b95',
                    '#88d8b0'
                ],
                borderColor: [
                   '#ff6384',
                    '#6b5b95',
                    '#88d8b0'
                ],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#000',
                font: {
                    size: 16
                },
                display: true,
                formatter: (value, context) => {
                    const displayValue = (allZero || singleNonZero) && context.dataset.data[context.dataIndex] === 0.01 ? 0 : value;
                    return `${context.chart.data.labels[context.dataIndex]}: ${displayValue}`;
                },
                anchor: 'end',
                align: 'start',
                offset: 10
            }
        }
    };

    return (
        <div style={{ width: '200px', height: '200px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
