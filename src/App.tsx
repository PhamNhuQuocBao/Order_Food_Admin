import React, { useMemo } from "react";
import {
  AppstoreOutlined,
  PicLeftOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Input, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const items: MenuProps["items"] = [
  {
    icon: AppstoreOutlined,
    label: <Link to="/restaurants">Restaurants</Link>,
  },
  {
    icon: PicLeftOutlined,
    label: <Link to="/food-menu">Menu</Link>,
  },
].map((value, index) => ({
  key: String(index + 1),
  icon: React.createElement(value.icon),
  label: value.label,
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const itemsAvatar: MenuProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: <Link to={"/login"}>Log in</Link>,
      },
    ],
    [],
  );

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <div className="flex items-center justify-between bg-white p-4">
          <Input placeholder="Search" className="w-[500px] p-2" />
          <Dropdown
            menu={{ items: itemsAvatar }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="hover:cursor-pointer"
            />
          </Dropdown>
        </div>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "100vh",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Food Dashboard ©{new Date().getFullYear()} Created by Bao Pham
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;