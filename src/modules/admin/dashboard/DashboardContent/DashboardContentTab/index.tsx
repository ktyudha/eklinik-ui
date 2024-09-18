import { FunctionComponent } from 'react'
import tab_items from './tab-item-constant'
import DashboardTabItem from './DashboardTabItem'

const DashboardTab: FunctionComponent = () => {
  return (
    <>
      <ul className="max-w-lg hidden text-sm font-medium text-center text-white rounded-full shadow sm:flex bg-[#006C1C] p-1">
        {tab_items.map((tab, idx) => (
          <DashboardTabItem
            key={`tab-item-${idx}`}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </ul>
    </>
  )
}

export default DashboardTab