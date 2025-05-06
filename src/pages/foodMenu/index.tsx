import { Layout, Menu, MenuProps, message } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getRestaurantByOwnerId } from "../../services/restaurant";
import { RestautantResponse } from "../../types";

const FoodMenu = () => {
  const [restaurants, setRestaurants] = useState<RestautantResponse[]>([]);

  const items: MenuProps["items"] = useMemo(
    () =>
      restaurants.map((value, index) => ({
        key: String(index + 1),
        label: <Link to={`/food-menu/${value._id}`}>{value.name}</Link>,
      })),
    [restaurants],
  );

  const fetch = useCallback(async () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      message.error("Something went wrong!");
      return;
    }
    const res = await getRestaurantByOwnerId(JSON.parse(userData)._id);

    setRestaurants(res.data);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Layout hasSider>
      <Sider className="bg-white">
        <div className="demo-logo-vertical max-w-[300px]" />
        <Menu theme="light" mode="inline" items={items} className="w-full" />
      </Sider>
      <Layout>
        <Content className="bg-white">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default FoodMenu;
