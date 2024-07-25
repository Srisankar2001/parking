import React, { useContext, useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from "chart.js"
import { Bar } from "react-chartjs-2"
import axiosInstance from '../../Config/AxoisConfig'
import { AppContext } from '../../Context/AppContext'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
)

export const BarChart = () => {
  const _id = useContext(AppContext)
  const [graph, setGraph] = useState([])
  const [count, setCount] = useState({
    twoWheeler: 0,
    threeWheeler: 0,
    fourWheeler: 0,
  })

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const postData = {
          _id: _id
        }
        const response = await axiosInstance.post("/record/graph", postData)
        if (response.data.success) {
          setGraph(response.data.data)
          setCount({
            twoWheeler: response.data.twoWheeler,
            threeWheeler: response.data.threeWheeler,
            fourWheeler: response.data.fourWheeler,
          })
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert(error.response?.data?.message || "Internal Server Error")
      }
    }
    fetchGraph()
  }, [_id])

  const data = {
    labels: graph.map(item => item.date).reverse(),
    datasets: [
      count.twoWheeler && {
        label: 'Bike',
        data: graph.map(item => item.twoWheeler).reverse(),
        // backgroundColor: 'rgba(255, 99, 132, 1.0)',
        // borderColor: 'rgba(255, 99, 132, 1)',
        // backgroundColor: '#ffa600',
        // borderColor: '#ffa600',
        backgroundColor: '#ff6384',
        borderColor: '#ff6384',
        borderWidth: 1,
      },
      count.threeWheeler && {
        label: 'Auto',
        data: graph.map(item => item.threeWheeler).reverse(),
        // backgroundColor: 'rgba(54, 162, 235, 1.0)',
        // borderColor: 'rgba(54, 162, 235, 1)',
        // backgroundColor: '#003f5c',
        // borderColor: '#003f5c',
        backgroundColor: '#6b5b95',
        borderColor: '#6b5b95',
        borderWidth: 1,
      },
      count.fourWheeler && {
        label: 'Car',
        data: graph.map(item => item.fourWheeler).reverse(),
        // backgroundColor: 'rgba(75, 192, 192, 1.0)',
        // borderColor: 'rgba(75, 192, 192, 1)',
        // backgroundColor: '#bc5090',
        // borderColor: '#bc5090',
        backgroundColor: '#88d8b0',
        borderColor: '#88d8b0',
        borderWidth: 1,
      },
    ]
  };

  const options = {
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
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000', // Set x-axis text color
          font: {
            size: 14 // Increase x-axis font size
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#000', // Set y-axis text color
          font: {
            size: 14 // Increase y-axis font size
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '500px', height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
