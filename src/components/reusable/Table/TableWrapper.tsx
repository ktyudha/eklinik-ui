import { FunctionComponent, ReactNode } from "react";

export interface Props {
  children: ReactNode[];
}

const TableWrapper: FunctionComponent<Props> = ({ children }) => (
  <>
    <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow-sm">
      <table className="table">
        {children.map((node) => node)}
      </table>
    </div>
  </>
);

export default TableWrapper;
