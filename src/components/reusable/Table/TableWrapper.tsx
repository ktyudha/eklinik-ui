import { FunctionComponent, ReactNode } from 'react'

export interface Props {
  children: ReactNode[]
}

const TableWrapper: FunctionComponent<Props> = ({
  children,
}) => (
  <>
    <div className="w-full overflow-auto h-auto py-3">
      <table className="table-auto w-full">
        {children.map((node) => node)}
      </table>
    </div>
  </>
)

export default TableWrapper