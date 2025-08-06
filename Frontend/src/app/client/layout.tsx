"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined,
  EditOutlined,
  PushpinOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme, Image } from "antd/es";
import Title from "antd/es/typography/Title";
import { useStyles } from "@/app/employeeTechnician/style/styles";
import "@ant-design/v5-patch-for-react-19";

const { Header, Sider, Content } = Layout;

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [loggedInUser, setLoggedInUser] = useState("Guest");

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const storedData = sessionStorage.getItem("username");
      if (storedData) {
        setLoggedInUser(storedData);
      }
    }
  }, [""]);

  const [collapsed, setCollapsed] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const { styles } = useStyles();
  const router = useRouter();
  const pathname = usePathname();

  const getSelectedKey = () => {
    if (pathname.includes("/dashboard")) return "1";
    if (pathname.includes("/bookings")) return "2";
    if (pathname.includes("/salons")) return "3";
    if (pathname.includes("/chatbot")) return "4";
    return "1";
  };

  const confirmLogout = () => {
    sessionStorage.clear();
    setLogoutModalVisible(false);
    router.push("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="80"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{ position: "relative" }}
      >
        <div className={styles.imageContainer}>
          <Image
            src="/AppLogo-Small.png"
            alt="Logo"
            width={collapsed ? 40 : 70}
            height={collapsed ? 40 : 70}
            className={styles.image}
            preview={false}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          onClick={(info) => {
            if (info.key === "1") router.push("/client/dashboard");
            if (info.key === "2") router.push("/client/bookings");
            if (info.key === "3") router.push("/client/salons");
            if (info.key === "4") router.push("/client/chatbot");
          }}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <EditOutlined />,
              label: "Bookings",
            },
            {
              key: "3",
              icon: <PushpinOutlined />,
              label: "Salons",
            },
            {
              key: "4",
              icon: <AliwangwangOutlined />,
              label: "Chatbot",
            },
          ]}
        />

        <div className={styles.logout}>
          <Button
            type="default"
            danger
            icon={<LogoutOutlined />}
            block
            onClick={() => setLogoutModalVisible(true)}
            className={styles.logoutBtn}
          >
            {!collapsed && "Logout"}
          </Button>
        </div>
      </Sider>

      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className={styles.toggleButton}
        style={{
          left: collapsed ? "80px" : "200px",
          background: colorBgContainer,
        }}
      />

      <Layout>
        <Header className={styles.headerTitle}>
          <Title level={2} className={styles.title}>
            Welcome, {loggedInUser}
          </Title>
        </Header>

        <Content className={styles.contentContainer}>{children}</Content>
      </Layout>

      <Modal
        open={logoutModalVisible}
        title="Confirm Logout"
        onCancel={() => setLogoutModalVisible(false)}
        onOk={confirmLogout}
        okText="Yes, Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};

export default ClientLayout;
