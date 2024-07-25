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
    if (allZero) {
        chartData = [1, 1, 1];
    }

    const data = {
        labels: labels,
        datasets: [
            {
                data: chartData,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 1.0)',
                //     'rgba(54, 162, 235, 1.0)',
                //     'rgba(75, 192, 192, 1.0)'
                // ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(75, 192, 192, 1)'
                // ],
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
                position: 'none'
            },
            datalabels: {
                color: '#000',
                font: {
                    size: 16
                },
                display: true,
                formatter: (value, context) => {
                    if (allZero) {
                        return `${context.chart.data.labels[context.dataIndex]}: 0`;
                    }
                    return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
                }
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
