import React, { useCallback, useMemo, useState } from "react";
import { columnsMenu as CLMN } from "../../constants/columns";
import TableMenu from "../../components/molecule/table/menu";
import { MenuRequest, MenuResponse } from "../../types";
import { Form, Input, Modal, Typography } from "antd";

const DetailMenu = () => {
  const [menu, setMenu] = useState<MenuResponse[]>([
    {
      _id: "1",
      name: "pizza",
      description: "pizza vua ngon vua re",
      __v: 0,
      amount: 200,
      category: "food",
      price: 20,
    },
  ]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);

  const toggleModal = useCallback(() => {}, []);

  const toggleModalUpdate = useCallback(() => {
    setIsOpenModalUpdate((prev) => !prev);
  }, []);

  const handleUpdate = useCallback(() => {}, []);

  const handleDelete = useCallback(() => {}, []);

  const columnsMenu = useMemo(() => {
    return CLMN(handleDelete, toggleModalUpdate);
  }, [handleDelete, toggleModalUpdate]);

  return (
    <div className="px-4">
      <Typography.Title>Menu</Typography.Title>
      <TableMenu columns={columnsMenu} dataSource={menu} />
      {/* modal update  */}
      <Modal
        open={isOpenModalUpdate}
        onCancel={toggleModalUpdate}
        onOk={toggleModalUpdate}
      >
        <Form layout="vertical" autoComplete="off">
          <Form.Item<MenuRequest>
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name item!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailMenu;
