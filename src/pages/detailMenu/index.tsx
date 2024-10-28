import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { columnsMenu as CLMN } from "../../constants/columns";
import TableMenu from "../../components/molecule/table/menu";
import { MenuRequest, MenuResponse } from "../../types";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import {
  createMenu,
  deleteMenu,
  getMenuByRestaurantId,
  updateMenu,
} from "../../services/menu";

const DetailMenu = () => {
  const [menu, setMenu] = useState<MenuResponse[]>([]);
  const ref = useRef({ selectedId: "" });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const { restaurantId } = useParams();

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const toggleModalUpdate = useCallback(
    async (record?: MenuResponse) => {
      setIsOpenModalUpdate((prev) => !prev);

      if (!record) {
        return;
      }

      formUpdate.setFieldsValue({
        ...record,
      });

      ref.current.selectedId = record?._id;
    },
    [formUpdate],
  );

  const fetch = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const res = await getMenuByRestaurantId(restaurantId);
      setMenu(res.data);
    } catch (error) {
      console.error(error);
      message.error("get menu fail");
    }
  }, [restaurantId]);

  const submit = useCallback(async () => {
    const dataForm = await formAdd.getFieldsValue();
    const res = await createMenu({ ...dataForm, restaurantId: restaurantId });
    if (res.status === 200) {
      message.success("add success");
      toggleModal();
      fetch();
      formAdd.resetFields();
    } else {
      message.error("add fail");
    }
  }, [fetch, formAdd, restaurantId, toggleModal]);

  const handleUpdate = useCallback(async () => {
    const data = await formUpdate.getFieldsValue();
    const res = await updateMenu(ref.current.selectedId, data);
    if (res.status === 200) {
      message.success("update success");
      toggleModalUpdate();
      fetch();
    } else {
      message.error("update fail");
    }
  }, [fetch, formUpdate, toggleModalUpdate]);

  const handleDelete = useCallback(async (id: string) => {
    const res = await deleteMenu(id);
    if (res.status === 200) {
      message.success("delete success");
      fetch();
    } else {
      message.error("delete fail");
    }
  }, []);

  const columnsMenu = useMemo(() => {
    return CLMN(handleDelete, toggleModalUpdate);
  }, [handleDelete, toggleModalUpdate]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <Typography.Title>Menu</Typography.Title>
        <Button type="primary" onClick={toggleModal}>
          Add new
        </Button>
      </div>
      <TableMenu columns={columnsMenu} dataSource={menu} />
      {/* modal add new  */}
      <Modal open={isOpenModal} onCancel={toggleModal} onOk={submit}>
        <Form layout="vertical" autoComplete="off" form={formAdd}>
          <Form.Item<MenuRequest>
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name item!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<MenuRequest>
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input description item!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<MenuRequest>
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input price item!" }]}
          >
            <InputNumber min={0} defaultValue={1} />
          </Form.Item>
          <Form.Item<MenuRequest>
            name="price"
            label="Price $"
            rules={[{ required: true, message: "Please input price item!" }]}
          >
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item<MenuRequest>
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Please select category item!" },
            ]}
          >
            <Select
              options={[
                { value: "food", label: "Food" },
                { value: "drink", label: "Drink" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* modal update  */}
      <Modal
        open={isOpenModalUpdate}
        onCancel={() => toggleModalUpdate()}
        onOk={handleUpdate}
      >
        <Form layout="vertical" autoComplete="off" form={formUpdate}>
          <Form.Item<MenuRequest>
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name item!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<MenuRequest>
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input description item!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<MenuRequest>
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input price item!" }]}
          >
            <InputNumber min={0} defaultValue={1} />
          </Form.Item>
          <Form.Item<MenuRequest>
            name="price"
            label="Price $"
            rules={[{ required: true, message: "Please input price item!" }]}
          >
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item<MenuRequest>
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Please select category item!" },
            ]}
          >
            <Select
              options={[
                { value: "food", label: "Food" },
                { value: "drink", label: "Drink" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailMenu;
