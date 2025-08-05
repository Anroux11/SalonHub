"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme, Image } from "antd/es";
import Title from "antd/es/typography/Title";
import { useStyles } from "./style/styles";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { styles } = useStyles();
  const router = useRouter();
  const pathname = usePathname();

  const getSelectedKey = () => {
    if (pathname.includes("/dashboard")) return "1";
    if (pathname.includes("/salons")) return "2";
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
            if (info.key === "1") router.push("/admin/dashboard");
            if (info.key === "2") router.push("/admin/salons");
          }}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Users",
            },
            {
              key: "2",
              icon: <HomeOutlined />,
              label: "Salons",
            },
          ]}
        />

        <div className={styles.logout}>
          <Button
            type="default"
            icon={<LogoutOutlined />}
            danger
            block
            size="small"
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
            Admin Dashboard
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

export default AdminLayout;
