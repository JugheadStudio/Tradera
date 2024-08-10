import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

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

        // Determine the color based on price movement
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

const PriceChart = () => {
  const rawData = [
    { x: '00:00', o: 100, h: 105, l: 95, c: 102 },
    { x: '01:00', o: 102, h: 107, l: 100, c: 104 },
    { x: '02:00', o: 104, h: 106, l: 99, c: 101 },
    { x: '03:00', o: 101, h: 104, l: 98, c: 99 },
    { x: '04:00', o: 99, h: 100, l: 94, c: 96 },
    { x: '05:00', o: 96, h: 98, l: 93, c: 95 },
    { x: '06:00', o: 95, h: 97, l: 92, c: 94 },
    { x: '07:00', o: 94, h: 96, l: 91, c: 93 },
    { x: '08:00', o: 93, h: 95, l: 89, c: 90 },
    { x: '09:00', o: 90, h: 92, l: 88, c: 91 },
    { x: '10:00', o: 91, h: 94, l: 89, c: 92 },
    { x: '11:00', o: 92, h: 96, l: 91, c: 94 },
    { x: '12:00', o: 94, h: 99, l: 93, c: 98 },
    { x: '13:00', o: 98, h: 102, l: 95, c: 100 },
    { x: '14:00', o: 100, h: 104, l: 99, c: 102 },
    { x: '15:00', o: 102, h: 106, l: 101, c: 105 },
    { x: '16:00', o: 105, h: 109, l: 104, c: 107 },
    { x: '17:00', o: 107, h: 110, l: 103, c: 104 },
    { x: '18:00', o: 104, h: 107, l: 100, c: 101 },
    { x: '19:00', o: 101, h: 105, l: 97, c: 103 },
    { x: '20:00', o: 103, h: 108, l: 102, c: 107 },
    { x: '21:00', o: 107, h: 111, l: 105, c: 109 },
    { x: '22:00', o: 109, h: 112, l: 108, c: 110 },
    { x: '23:00', o: 110, h: 115, l: 109, c: 112 },
  ];

  const data = {
    datasets: [{
      label: 'Stock Price',
      data: rawData,
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
        labels: rawData.map(item => item.x)
      },
      y: {
        type: 'linear',
        beginAtZero: false,
        min: Math.min(...rawData.map(item => item.l)) * 0.95,
        max: Math.max(...rawData.map(item => item.h)) * 1.05,
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
