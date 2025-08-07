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
  UserOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  Modal,
  theme,
  Image,
  Space,
  Typography,
  Tooltip,
  Avatar,
  Dropdown,
} from "antd/es";
import "@ant-design/v5-patch-for-react-19";
import { useStyles } from "./style/styles";
import withAuth from "@/hoc/withAuth";
import ProfileDrawer from "@/components/client-components/profileDrawer";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

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
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
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

  const getInitials = () => {
    if (loggedInUser && loggedInUser !== "Guest") {
      return loggedInUser.charAt(0).toUpperCase();
    }
    return "G";
  };

  const profileMenuItems = [
    {
      key: "profile",
      label: "View Profile",
      icon: <UserOutlined />,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleProfileMenuClick = ({ key }: { key: string }) => {
    if (key === "profile") {
      setIsProfileDrawerOpen(true);
    } else if (key === "logout") {
      setLogoutModalVisible(true);
    }
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
          <div className={styles.headerContainer}>
            <div className={styles.profileSection}>
              <Dropdown
                menu={{
                  items: profileMenuItems,
                  onClick: handleProfileMenuClick,
                }}
                placement="bottomRight"
                arrow
                trigger={["click"]}
              >
                <Button
                  type="text"
                  className={styles.profileButton}
                  onClick={(e) => e.preventDefault()}
                >
                  <Space align="center" size="small">
                    <Avatar
                      size="small"
                      className={styles.profileAvatar}
                      icon={<UserOutlined />}
                    >
                      {getInitials()}
                    </Avatar>
                    <span className={styles.profileButtonText}>
                      {loggedInUser}
                    </span>
                    <DownOutlined className={styles.profileDropdownIcon} />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
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

      <ProfileDrawer
        open={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
      />
    </Layout>
  );
};

export default withAuth(ClientLayout, { allowedRoles: ["Client"] });
