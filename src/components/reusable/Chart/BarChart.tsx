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
  totalDatasSet?: number | undefined
  labelDataSet1?: string | undefined
  labelDataSet2?: string | undefined
  titleDisplay?: boolean
  legendDisplay?: boolean
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  titleText?: string
}

const ChartWrapper: FunctionComponent<ChartProps> = ({ dataChart, labels, totalDatasSet, labelDataSet1, labelDataSet2, titleDisplay, legendDisplay, legendPosition, titleText }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: legendDisplay ? legendDisplay : false,
        position: legendPosition ? legendPosition : 'top' as const,
      },
      title: {
        display: titleDisplay ? titleDisplay : false,
        text: titleText ? titleText : '',
      },
    },
  }

  let data = {
    labels: labels ? labels : ['Red', 'Blue'],
    datasets: [
      {
        label: labelDataSet1 ? labelDataSet1 : 'Total',
        data: dataChart ? dataChart : [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#facc15',
          '#06b6d4',
          '#ef4444',
          '#3b82f6',
          '#f97316',
        ],
        borderColor: [
          '#facc15',
          '#06b6d4',
          '#ef4444',
          '#3b82f6',
          '#f97316',
        ],
        borderWidth: 1,
      },
    ],
  }

  if (totalDatasSet === 2) {
    data = {
      labels: labels ? labels : ['Red', 'Blue'],
      datasets: [
        {
          label: labelDataSet1 ? labelDataSet1 : 'Data 1',
          data: dataChart ? dataChart : [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: labelDataSet2 ? labelDataSet2 : 'Data 2',
          data: dataChart ? dataChart : [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  }

  return (
    <Bar data={data} options={options} className='w-full' />
  )
}

export default ChartWrapper