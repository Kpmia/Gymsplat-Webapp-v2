import ChartJS from 'chart.js';

export const getStackLineChart = ({ labels, data, data1 }) => canvas => {
  const ctx = canvas.getContext('2d');
  let gradient = ctx.createLinearGradient(0, 0, 0, 255);
  {
  gradient.addColorStop(
    1,
    ChartJS.helpers
      .color('#FFF')
      .alpha(0.2)
      .rgbString()
  );
  gradient.addColorStop(
    .3,
    ChartJS.helpers
      .color('#D4CAFA')
      .alpha(0.8)
      .rgbString()
  )
  }


  return {
    labels,
    data,
    datasets: [
      {
        data: data,
        label: 'Relative Activity',
        borderColor: '#7E7AFF',
        backgroundColor: gradient,
        fill: 'origin'
      },
      {
        data: data1,
        label: 'Weights Section',
        borderColor: '#A37CD7',
        backgroundColor: gradient,
        fill: 'origin'
      },
    ],
  };
};

export const stackLineChartOptions = {

  tooltips: {
    intersect: false,
  },
  animation: {
    duration: 2,
  },
  scales: {
    xAxes: [
      {
        display: true,
      },
    ],
    yAxes: [{ display: true }],
  },
  legend: {
    display: false,
  },
  // elements: {
  //   line: {
  //     tension: 0, // disables bezier curves
  //   },
  // },
};
