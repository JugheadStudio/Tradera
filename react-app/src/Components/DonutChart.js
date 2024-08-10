import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const data = {
    datasets: [{
      data: [80, 20],
      backgroundColor: ['#9CCDDC', '#1A191E'],
      borderWidth: 0,
      borderRadius: 20,
    }],
  };

  const options = {
    cutout: '80%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const plugins = [{
    id: 'centerText',
    beforeDraw: (chart) => {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;

      ctx.restore();
      ctx.font = '34px Montserrat, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';

      const text = '20';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }];

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default DonutChart;