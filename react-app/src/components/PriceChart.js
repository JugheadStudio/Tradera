import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  CandlestickController,
  CandlestickElement,
  Title,
  Tooltip,
  Legend
);

const customCandlestickPlugin = {
  id: 'customCandlestickPlugin',
  beforeDraw(chart) {
    const ctx = chart.ctx;
    const { datasets } = chart.data;

    datasets.forEach((dataset) => {
      const meta = chart.getDatasetMeta(0);
      meta.data.forEach((bar, index) => {
        const { o, h, l, c } = dataset.data[index];
        const x = bar.x;
        const y = bar.y;
        const barWidth = bar.width;
        const openY = chart.scales.y.getPixelForValue(o);
        const closeY = chart.scales.y.getPixelForValue(c);
        const highY = chart.scales.y.getPixelForValue(h);
        const lowY = chart.scales.y.getPixelForValue(l);

        const color = c > o ? 'rgba(209, 239, 105, 1)' : 'rgba(255, 77, 77, 1)';

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillRect(x - barWidth / 2, Math.min(openY, closeY), barWidth, Math.abs(closeY - openY));
      });
    });
  }
};

const PriceChart = ({ currentPriceDetails }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5219/api/Price/hourly-prices');
        const data = response.data.$values;
    
        if (Array.isArray(data) && data.length > 0) {
          const currentHourData = data[data.length - 1]; // Assuming latest data is last
          currentPriceDetails({
            currentPrice: currentHourData.c,
            highestPrice: Math.max(...data.map(item => item.h)),
            lowestPrice: Math.min(...data.map(item => item.l))
          });
          setChartData(data);
        } else {
          console.error('No valid data received:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(intervalId);
  }, [currentPriceDetails]);

  const defaultData = [
    { x: 'No Data', o: 0, h: 0, l: 0, c: 0 }
  ];
  
  const data = {
    datasets: [{
      label: 'Stock Price',
      data: chartData.length ? chartData : defaultData,
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 0.5,
      barThickness: 15,
    }]
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      customCandlestickPlugin: true
    },
    scales: {
      x: {
        type: 'category',
        labels: chartData.length ? chartData.map(item => item.x) : [],
      },
      y: {
        type: 'linear',
        beginAtZero: false,
        min: chartData.length ? Math.min(...chartData.map(item => item.l)) * 0.95 : 0,
        max: chartData.length ? Math.max(...chartData.map(item => item.h)) * 1.05 : 100,
      }
    }
  };
  

  return (
    <div>
      <Chart type="candlestick" data={data} options={options} plugins={[customCandlestickPlugin]} />
    </div>
  );
};

export default PriceChart;

