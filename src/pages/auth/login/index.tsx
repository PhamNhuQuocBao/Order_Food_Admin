import { Button, Form, Input, message, Typography } from "antd";
import { FieldTypeUser } from "../../../types";
import { useCallback } from "react";
import { login } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = useCallback(async () => {
    try {
      const dataForm = await form.getFieldsValue();
      const res = await login(dataForm);

      if (!res) {
        messageApi.error("user not found");
        return;
      }

      if (res.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userFormatted } = res.data;
        localStorage.setItem("user", JSON.stringify(userFormatted));

        navigate("/");
      }
    } catch {
      messageApi.error("loi request");
    }
  }, []);

  return (
    <>
      {contextHolder}
      <div className="flex h-screen flex-col items-center justify-center gap-5">
        <Typography.Title>Login to Dashboard</Typography.Title>
        <Form
          name="login"
          layout="vertical"
          form={form}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          className="w-full max-w-[600px]"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldTypeUser>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input email!", type: "email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldTypeUser>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
