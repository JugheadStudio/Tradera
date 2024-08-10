import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [timeFrame, setTimeFrame] = useState('weeks');

  const dayData = {
    labels: ['7am', '9am', '11am', '1pm', '3pm', '5pm', '7pm'],
    values: [2, 3.5, 4.5, 3, 5, 4, 2.5],
  };

  const weekData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    values: [3, 5.5, 4, 1.5, 7, 4.5, 3],
  };

  const yearData = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    values: [10, 12, 15, 13, 18, 20, 22],
  };

  const getDataForTimeFrame = () => {
    switch (timeFrame) {
      case 'day':
        return dayData;
      case 'weeks':
        return weekData;
      case 'years':
        return yearData;
      default:
        return weekData;
    }
  };

  const currentData = getDataForTimeFrame();

  const data = {
    labels: currentData.labels,
    datasets: [
      {
        data: currentData.values,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.top,
            chartArea.right,
            chartArea.bottom
          );
          gradient.addColorStop(0, '#9CCDDC');
          gradient.addColorStop(1, '#5591A9');
          return gradient;
        },
        barThickness: 20,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        position: 'top',
        grid: {
          color: '#2C2B31',
          lineWidth: 1,
        },
      },
      y: {
        display: false,
        grid: {
          color: '#2C2B31',
          lineWidth: 1,
        },
      },
    },
    barPercentage: 0.6,
    categoryPercentage: 0.8,
  };

  const buttonStyle = {
    backgroundColor: '#1A191E',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    color: 'white',
    borderRadius: '0px 0px 10px 10px',
    marginRight: '5px',
  };

  const selectedButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#99CADA',
    color: 'black',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // height: '300px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <button 
          onClick={() => setTimeFrame('day')} 
          style={timeFrame === 'day' ? selectedButtonStyle : buttonStyle}
        >
          Day
        </button>
        <button 
          onClick={() => setTimeFrame('weeks')} 
          style={timeFrame === 'weeks' ? selectedButtonStyle : buttonStyle}
        >
          Weeks
        </button>
        <button 
          onClick={() => setTimeFrame('years')} 
          style={timeFrame === 'years' ? selectedButtonStyle : buttonStyle}
        >
          Years
        </button>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;