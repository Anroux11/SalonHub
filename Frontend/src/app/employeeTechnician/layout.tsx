"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined,
  FileTextOutlined,
  AliwangwangOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme, Image, Space, Tooltip, Typography } from "antd/es";
import Title from "antd/es/typography/Title";
import { useStyles } from "../client/style/styles";
import withAuth from "@/hoc/withAuth";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const EmployeeTechnicianLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let loggedInUser = "Guest";
  if (typeof sessionStorage !== "undefined") {
    const storedData = sessionStorage.getItem("username");
    if (storedData) {
      loggedInUser = storedData;
    }
  }

  const [collapsed, setCollapsed] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { styles } = useStyles();
  const router = useRouter();
  const pathname = usePathname();

  const getSelectedKey = () => {
    if (pathname.includes("/dashboard")) return "1";
    if (pathname.includes("/bookings")) return "2";
    if (pathname.includes("/chatbot")) return "3";
    return "1";
  };

  const confirmLogout = () => {
    sessionStorage.clear();
    setLogoutModalVisible(false);
    router.push("/login");
  };

  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="80"
        onBreakpoint={(broken) => setCollapsed(broken)}
        className={styles.sider}
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
            if (info.key === "1") router.push("/employeeTechnician/dashboard");
            if (info.key === "2") router.push("/employeeTechnician/bookings");
            if (info.key === "3") router.push("/employeeTechnician/chatbot");
          }}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <FileTextOutlined />,
              label: "Bookings",
            },
            {
              key: "3",
              icon: <AliwangwangOutlined />,
              label: "Chatbot",
            },
          ]}
        />

        <div
          className={`${styles.logoutSection} ${
            collapsed
              ? styles.logoutSectionCollapsed
              : styles.logoutSectionExpanded
          }`}
        >
          {!collapsed && (
            <div className={styles.userInfoSection}>
              <Space
                align="center"
                size="small"
                className={styles.userInfoSpace}
              >
                <UserOutlined className={styles.userIcon} />
                <Text
                  className={styles.userText}
                  ellipsis={{ tooltip: loggedInUser }}
                >
                  {loggedInUser}
                </Text>
              </Space>
            </div>
          )}

          <Tooltip
            title={collapsed ? `Logout (${loggedInUser})` : "Logout"}
            placement={collapsed ? "right" : "top"}
          >
            <Button
              type="text"
              danger
              icon={<LogoutOutlined className={styles.logoutButtonIcon} />}
              block
              onClick={() => setLogoutModalVisible(true)}
              className={`${styles.logoutButton} ${
                collapsed ? styles.logoutButtonCollapsed : ""
              }`}
            >
              {!collapsed && (
                <Space>
                  <span>Logout</span>
                </Space>
              )}
            </Button>
          </Tooltip>
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
            <span className={styles.titleText}>Hi, {loggedInUser}</span>
          </Title>
        </Header>

        <Content className={styles.contentContainer}>{children}</Content>
      </Layout>

      <Modal
        open={logoutModalVisible}
        title={
          <Space>
            <ExclamationCircleOutlined className={styles.modalHeaderIcon} />
            <Text strong>Confirm Logout</Text>
          </Space>
        }
        onCancel={() => setLogoutModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setLogoutModalVisible(false)}
            className={styles.modalCancelButton}
          >
            Cancel
          </Button>,
          <Button
            key="logout"
            type="primary"
            danger
            onClick={confirmLogout}
            icon={<LogoutOutlined />}
            className={styles.modalLogoutButton}
          >
            Yes, Logout
          </Button>,
        ]}
        width={400}
        centered
        styles={{
          body: {
            padding: "20px",
            fontSize: "15px",
          },
          header: {
            paddingBottom: "16px",
            borderBottom: "1px solid #f0f0f0",
          },
        }}
      >
        <div className={styles.modalContent}>
          <Text className={styles.modalText}>
            Are you sure you want to logout? You will need to sign in again to
            access your account.
          </Text>
          <div className={styles.modalUserInfo}>
            <Space>
              <UserOutlined className={styles.modalUserIcon} />
              <Text strong>Current User: </Text>
              <Text>{loggedInUser}</Text>
            </Space>
          </div>
        </div>
      </Modal>

        

    </Layout>
  );
};

export default withAuth(EmployeeTechnicianLayout, {
  allowedRoles: ["EmployeeTechnician"],
});
