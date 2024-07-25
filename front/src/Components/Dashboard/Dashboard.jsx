import React, { useContext, useEffect, useState } from 'react'
import "./Dashboard.css"

import axiosInstance from '../../Config/AxoisConfig'
import { AppContext } from '../../Context/AppContext'

import { BarChart } from "../Charts/BarChart"
import { PieChart } from "../Charts/PieChart"
import { StackedColumnChart } from "../Charts/StackColumnChart"

export const Dashboard = () => {
  const _id = useContext(AppContext)
  const [revenue, setRevenue] = useState({
    total: 0,
    twoWheeler: 0,
    threeWheeler: 0,
    fourWheeler: 0
  })
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const postData = {
          _id: _id
        }
        const response = await axiosInstance.post("/record/revenue", postData)
        if (response.data.success) {
          // console.log(response.data)
          setRevenue({
            total: response.data.data.totalRevenue,
            twoWheeler: response.data.data.twoWheelerRevenue,
            threeWheeler: response.data.data.threeWheelerRevenue,
            fourWheeler: response.data.data.fourWheelerRevenue,
          })
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert(error.response?.data?.message || "Internal Server Error")
      }
    }
    fetchRevenue()
  }, [_id])
  return (
    <div className='dashboard'>
      <div className='dashboard-container'>
        <div className='dashboard-header'>
          <div className='dashboard-header-total'>
            <h5>Total Revenue</h5>
            <h3>{Number(revenue.total).toFixed(2)} LKR</h3>
          </div>
          {revenue.twoWheeler && <div className='dashboard-header-two'>
            <h5>Bike</h5>
            <h3>{Number(revenue.twoWheeler).toFixed(2)} LKR</h3>
          </div>}
          {revenue.threeWheeler && <div className='dashboard-header-three'>
            <h5>Auto</h5>
            <h3>{Number(revenue.threeWheeler).toFixed(2)} LKR</h3>
          </div>}
          {revenue.fourWheeler && <div className='dashboard-header-four'>
            <h5>Car</h5>
            <h3>{Number(revenue.fourWheeler).toFixed(2)} LKR</h3>
          </div>}
        </div>
        <div className='dashboard-graph'>
          <div className='dashboard-bar'>
            <h3>Week Report</h3>
            <BarChart />
          </div>
          <div className='dashboard-pieAndStack'>
            <div className='dashboard-stack'>
              <h3>Slot Status</h3>
              <StackedColumnChart />
            </div>
            <div className='dashboard-pie'>
              <h3>Today's Report</h3>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
