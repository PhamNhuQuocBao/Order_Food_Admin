import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TableRestaurant from "../../components/molecule/table/restaurant";
import { Header } from "antd/es/layout/layout";
import { Button, Form, Input, message, Modal, Typography } from "antd";
import {
  FieldTypeRestaurant,
  RestaurantRequest,
  RestautantResponse,
} from "../../types";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurantByOwnerId,
  updateRestaurant,
} from "../../services/restaurant";
import { columnsRestaurant as CLRES } from "../../constants/columns";

const MenuRestaurant = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<RestautantResponse[]>([]);
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const ref = useRef({ selectedId: "" });
  const [messageApi, contextHolder] = message.useMessage();

  console.log("render");

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const toggleModalUpdate = useCallback(
    async (record?: RestautantResponse) => {
      setIsOpenModalUpdate((prev) => !prev);

      if (!record) {
        return;
      }

      formUpdate.setFieldsValue({
        ...record,
        street: record?.address.street,
        city: record?.address.city,
      });

      ref.current.selectedId = record?._id;
    },
    [formUpdate],
  );

  const submit = useCallback(async () => {
    // handle submit restaurant
    const data = await formAdd.getFieldsValue();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { street, city, ...rest } = data;
    const userData = localStorage.getItem("user");
    if (!userData) {
      messageApi.error("Something went wrong!");
      return;
    }

    const dataFormatted: RestaurantRequest = {
      ...rest,
      address: {
        street: data.street,
        city: data.city,
      },
      ownerId: JSON.parse(userData)._id,
    };

    const res = await createRestaurant(dataFormatted);
    console.log(res);

    toggleModal();
    fetch();
  }, [toggleModal]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteRestaurant(id);

    fetch();
  }, []);

  const handleUpdate = useCallback(async () => {
    const data = await formUpdate.getFieldsValue();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { street, city, ...rest } = data;
    const dataFormatted: RestaurantRequest = {
      ...rest,
      address: {
        street: data.street,
        city: data.city,
      },
    };
    console.log(dataFormatted);

    await updateRestaurant(ref.current.selectedId, dataFormatted);

    toggleModalUpdate();
    fetch();
  }, []);

  const columnsRestaurant = useMemo(() => {
    return CLRES(handleDelete, toggleModalUpdate);
  }, [handleDelete, toggleModalUpdate]);

  const fetch = useCallback(async () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      messageApi.error("Something went wrong!");
      return;
    }
    const res = await getRestaurantByOwnerId(JSON.parse(userData)._id);

    setRestaurants(res.data);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {contextHolder}
      <div>
        <Header className="flex justify-between bg-white px-0">
          <Typography.Title className="text-left">Restaurants</Typography.Title>
          <Button type="primary" onClick={toggleModal}>
            Add new
          </Button>
        </Header>
        <TableRestaurant columns={columnsRestaurant} dataSource={restaurants} />
        {/* form add  */}
        <Modal open={isOpenModal} onCancel={toggleModal} onOk={submit}>
          <Form
            name="formAdd"
            layout="vertical"
            form={formAdd}
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldTypeRestaurant>
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input restaurant name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldTypeRestaurant>
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true, message: "Please input street!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input city!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        {/* form update  */}
        <Modal
          open={isOpenModalUpdate}
          onCancel={() => toggleModalUpdate()}
          onOk={handleUpdate}
        >
          <Form
            name="formUpdate"
            layout="vertical"
            form={formUpdate}
            autoComplete="off"
          >
            <Form.Item<FieldTypeRestaurant>
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input restaurant name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldTypeRestaurant>
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true, message: "Please input street!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input city!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default MenuRestaurant;
