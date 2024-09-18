import { FunctionComponent, useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

type ChartProps = {
  dataChart?: number[]
  labels?: string[]
  titleDisplay?: boolean
  legendDisplay?: boolean
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  titleText?: string
  isPercentage?: boolean
}

const ChartWrapper: FunctionComponent<ChartProps> = ({
  dataChart,
  labels,
  titleDisplay,
  legendDisplay,
  legendPosition,
  titleText,
  isPercentage = false,
}) => {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const options = {
    titleDisplay: true,
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
      tooltip: {
        callbacks: {
          label: (val: any) => {
            if (isPercentage) {
              return `${+val.raw}%`
            }
            return val.raw
          },
        },
      },
    },
  }

  const isNotEmpty = dataChart?.some(data => data > 0)
  const backgroundColor = useMemo(() => {
    if (dataChart && isNotEmpty) {
      return ['#fb923c', '#38bdf8', '#f43f5e', '#3b82f6', '#fde047', '#22c55e']
    }
    return ['#fb923c', '#38bdf8', '#f43f5e', '#3b82f6', '#fde047', '#22c55e']
  }, [])

  const borderColor = useMemo(() => {
    if (dataChart && isNotEmpty) {
      return ['#fafafa', '#fafafa', '#fafafa', '#fafafa', '#fafafa', '#fafafa']
    }
    return ['#fafafa', '#fafafa', '#fafafa', '#fafafa', '#fafafa', '#fafafa']
  }, [])

  const data = {
    labels: labels ? labels : ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: dataChart ? dataChart : [12, 19, 3, 5, 2, 3],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  }

  return (
    <Pie data={data} options={options} className='w-full' />
  )
}

export default ChartWrapper