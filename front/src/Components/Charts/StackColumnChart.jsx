import React, { useContext, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axiosInstance from '../../Config/AxoisConfig';
import { AppContext } from '../../Context/AppContext';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

export const StackedColumnChart = () => {
    const _id = useContext(AppContext);
    const [data, setData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = {
                    _id: _id
                };
                const response = await axiosInstance.post("/vehicle/count", postData);
                if (response.data.success) {
                    const { twoWheeler, threeWheeler, fourWheeler, totalTwoWheeler, totalThreeWheeler, totalFourWheeler } = response.data.data;
                    setData({
                        labels: [totalTwoWheeler && 'Bike', totalThreeWheeler && 'Auto', totalFourWheeler && 'Car'],
                        datasets: [
                            {
                                label: 'Free Spaces',
                                data: [totalTwoWheeler && (totalTwoWheeler - twoWheeler), totalThreeWheeler && (totalThreeWheeler - threeWheeler), totalFourWheeler && (totalFourWheeler - fourWheeler)],
                                // backgroundColor: 'rgba(75, 192, 192, 1.0)',
                                // borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: '#88d8b0',
                                borderColor: '#88d8b0',
                                borderWidth: 1,
                            },
                            {
                                label: 'Occupied Spaces',
                                data: [totalTwoWheeler && twoWheeler, totalThreeWheeler && threeWheeler, totalFourWheeler && fourWheeler],
                                // backgroundColor: 'rgba(255, 99, 132, 1.0)',
                                // borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: '#ff6384',
                                borderColor: '#ff6384',
                                borderWidth: 1,
                            }
                        ]
                    });
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                alert(error.response?.data?.message || "Internal Server Error");
            }
        };
        fetchData();
    }, [_id]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#000', // Set legend text color
                    font: {
                        size: 16 // Increase legend font size
                    }
                }
            },
            datalabels: {
                display: false
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: '#000', // Set x-axis text color
                    font: {
                        size: 14 // Increase x-axis font size
                    }
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    color: '#000', // Set y-axis text color
                    font: {
                        size: 14 // Increase y-axis font size
                    }
                }
            }
        },
        indexAxis: 'y'
    };

    return (
        <div style={{ width: '500px', height: '200px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default StackedColumnChart;
