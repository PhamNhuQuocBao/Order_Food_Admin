import { Image, Popconfirm, TableColumnsType } from "antd";
import { MenuResponse, RestautantResponse } from "../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// Column Restaurants
export const columnsRestaurant = (
  onDelete: (id: string) => void,
  onUpdate: (record: RestautantResponse) => void,
): TableColumnsType<RestautantResponse> => [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
    render: (_, record) => (
      <p>
        {record.address.street}, {record.address.city}
      </p>
    ),
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (_, record) => <Image width={100} src={record.image} preview />,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <div className="flex gap-6">
        <EditOutlined
          className="text-2xl text-blue-500 hover:cursor-pointer"
          onClick={() => onUpdate(record)}
        />
        <Popconfirm
          title="Delete this restaurant"
          description="Are you sure to delete this restaurant?"
          onConfirm={() => onDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined className="text-2xl text-red-600 hover:cursor-pointer" />
        </Popconfirm>
      </div>
    ),
  },
];

// Column Menu Item
export const columnsMenu = (
  onDelete: (id: string) => void,
  onUpdate: (record: MenuResponse) => void,
): TableColumnsType<MenuResponse> => [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <div className="flex gap-6">
        <EditOutlined
          className="text-2xl text-blue-500 hover:cursor-pointer"
          onClick={() => onUpdate(record)}
        />
        <Popconfirm
          title="Delete this restaurant"
          description="Are you sure to delete this item?"
          onConfirm={() => onDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined className="text-2xl text-red-600 hover:cursor-pointer" />
        </Popconfirm>
      </div>
    ),
  },
];
