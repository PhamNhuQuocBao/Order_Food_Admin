import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MenuResponse } from "../../../types";

interface Props extends TableProps<MenuResponse> {
  dataSource: MenuResponse[];
  columns: TableColumnsType<MenuResponse>;
}

const TableMenu: React.FC<Props> = ({ dataSource, columns, ...rest }) => {
  return (
    <div>
      <Table<MenuResponse>
        columns={columns}
        dataSource={dataSource}
        {...rest}
      />
    </div>
  );
};

export default TableMenu;
