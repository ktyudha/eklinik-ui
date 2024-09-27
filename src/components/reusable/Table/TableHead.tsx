import { FunctionComponent, PropsWithChildren } from "react";

export type Props = PropsWithChildren;

const TableHead: FunctionComponent<Props> = ({ children, ...restProps }) => {
  return (
    <thead {...restProps}>
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHead;
