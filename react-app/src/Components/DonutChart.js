import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ data, upgradeEligible, onUpgrade }) {
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

      ctx.save();
    }
  }];

  return (
    <div style={{ width: '200px', height: '200px' }}>
      {upgradeEligible ? (
        <button onClick={onUpgrade} style={{
          width: '100%', height: '100%', backgroundColor: '#4CAF50',
          border: 'none', borderRadius: '50%', color: 'white',
          fontSize: '20px', cursor: 'pointer'
        }}>
          Upgrade Now
        </button>
      ) : (
        <Doughnut data={data} options={options} plugins={plugins} />
      )}
    </div>
  );
}

export default DonutChart;