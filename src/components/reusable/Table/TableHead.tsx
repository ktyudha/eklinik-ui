import { FunctionComponent, PropsWithChildren } from 'react'

export type Props = PropsWithChildren

const TableHead: FunctionComponent<Props> = ({
  children,
  ...restProps
}) => {
  return (
    <thead
      className="bg-gray-100 border-b"
      {...restProps}
    >
      <tr>{children}</tr>
    </thead>
  )
}

export default TableHead