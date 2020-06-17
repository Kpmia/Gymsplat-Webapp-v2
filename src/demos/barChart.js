import ChartJS from 'chart.js';

export const getBarChart = ({ labels, data, label }) => canvas => {
  const ctx = canvas.getContext('2d');

  let gradient = ctx.createLinearGradient(0, 0, 0, 255);
  {
  gradient.addColorStop(
    0,
    ChartJS.helpers
      .color('#75B1F9')
      .alpha(0.9)
      .rgbString()
  );
  gradient.addColorStop(
    1,
    ChartJS.helpers
      .color('#9D81FA')
      .alpha(0.9)
      .rgbString()
  )
  }


  return {
    type: 'bar',
    labels,
    data,
    datasets: [
      {
        data: data,
        label: label,
        borderColor: '#7E7AFF',
        backgroundColor: gradient,
        fill: '#7E7AFF'
      },
    ],
  };
};

export const stackLineChartOptions = {

  tooltips: {
    intersect: true,
  },
  animation: {
    duration: 2,
  },
  cornerRadius: 20,
  scales: {
    xAxes: [
      {
        barPercentage: 1.2
      },
    ],
    yAxes: [{ display: true }],
  },
  legend: {
    display: false
 },
  // elements: {
  //   line: {
  //     tension: 0, // disables bezier curves
  //   },
  // },
};