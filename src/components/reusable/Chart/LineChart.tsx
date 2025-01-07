import { FunctionComponent } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type ChartProps = {
  dataChart1?: number[]
  dataChart2?: number[]
  labels?: string[]
  labelDataSet1?: string | undefined
  labelDataSet2?: string | undefined
  titleDisplay?: boolean
  legendDisplay?: boolean
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  titleText?: string
}

const ChartWrapper: FunctionComponent<ChartProps> = ({ dataChart1, dataChart2, labels, labelDataSet1, labelDataSet2, titleDisplay, legendDisplay, legendPosition, titleText }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: legendDisplay ? legendDisplay : false,
        position: legendPosition ? legendPosition : 'top' as const,
      },
      title: {
        display: titleDisplay ? titleDisplay : false,
        text: titleText ? titleText : 'Chart.js Line Chart',
      },
    },
  }

  const data = {
    labels: labels ? labels : ['2020', '2021', '2022'],
    datasets: [
      {
        label: labelDataSet1 ? labelDataSet1 : 'Data 1',
        data: dataChart1 ? dataChart1 : [0, 0, 15, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 3,
      },
      {
        label: labelDataSet2 ? labelDataSet2 : 'Data 2',
        data: dataChart2 ? dataChart2 : [0, 0, 0, 15, 20, 3],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 3,
      },
    ],
  }

  return (
    <Line data={data} options={options} className='w-full' />
  )
}

export default ChartWrapper