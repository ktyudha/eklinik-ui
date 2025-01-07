import { FunctionComponent } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

type ChartProps = {
  dataChart?: number[]
  labels?: string[]
  titleDisplay?: boolean
  legendDisplay?: boolean
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  titleText?: string
}

const ChartWrapper: FunctionComponent<ChartProps> = ({ dataChart, labels, titleDisplay, legendDisplay, legendPosition, titleText }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: legendDisplay ? legendDisplay : false,
        position: legendPosition ? legendPosition : 'top' as const,
      },
      title: {
        display: titleDisplay ? titleDisplay : false,
        text: titleText ? titleText : 'Chart.js Horizontal Bar Chart',
      },
    },
  };

  const data = {
    labels: labels ? labels : ['Red', 'Blue'],
    datasets: [
      {
        data: dataChart ? dataChart : [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Bar data={data} options={options} className='w-full' />
  )
}

export default ChartWrapper