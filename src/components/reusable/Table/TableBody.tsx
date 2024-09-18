import { FunctionComponent, PropsWithChildren } from "react"

export type Props = PropsWithChildren

const TableBody: FunctionComponent<Props> = ({
  children,
  ...restProps
}) => {
  return (
    <tbody {...restProps}>{children}</tbody>
  )
}

export default TableBody