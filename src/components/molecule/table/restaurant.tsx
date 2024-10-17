import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { RestautantResponse } from "../../../types";

interface Props extends TableProps<RestautantResponse> {
  dataSource: RestautantResponse[];
  columns: TableColumnsType<RestautantResponse>;
}

const TableRestaurant: React.FC<Props> = ({ dataSource, columns, ...rest }) => {
  return (
    <div>
      <Table<RestautantResponse>
        columns={columns}
        dataSource={dataSource}
        {...rest}
      />
    </div>
  );
};

export default TableRestaurant;
