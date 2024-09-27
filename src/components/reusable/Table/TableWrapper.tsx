import { FunctionComponent, ReactNode } from "react";

export interface Props {
  children: ReactNode[];
}

const TableWrapper: FunctionComponent<Props> = ({ children }) => (
  <>
    <div className="overflow-x-auto">
      <table className="table rounded-lg bg-base-100">
        {children.map((node) => node)}
      </table>
    </div>
  </>
);

export default TableWrapper;
