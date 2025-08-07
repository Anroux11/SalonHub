"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Divider,
  Modal,
  message,
  Typography,
  Avatar,
  Space,
} from "antd/es";
import { useRouter } from "next/navigation";
import { useClientActions } from "@/providers/client-provider";
import {
  useCurrentUserActions,
  useCurrentUserState,
} from "@/providers/auth-provider";
import { IClient } from "@/providers/client-provider/context";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useStyles } from "./style/styles";

const { Text, Title } = Typography;

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ open, onClose }) => {
  const { styles } = useStyles();
  const router = useRouter();
  const { getClient, updateClient, deleteClient } = useClientActions();
  const { currentUser } = useCurrentUserActions();
  const { user } = useCurrentUserState();

  const [form] = Form.useForm();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      await currentUser();
    };
    fetch();
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        userName: user.userName,
        name: user.name,
        surname: user.surname,
        emailAddress: user.emailAddress,
      });
    }
  }, [user]);

  const handleUpdateDetails = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const payload: IClient = {
        id: parseInt(sessionStorage.getItem("userId") || "0"),
        userName: values.userName,
        name: values.name,
        surname: values.surname,
        emailAddress: values.emailAddress,
        roleName: values.roleNames,
        isActive: true,
      };

      await updateClient(payload);
      message.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      message.error("Something went wrong while updating your details.");
    }
  };

  const confirmDelete = async () => {
    try {
      await getClient(sessionStorage.getItem("userId") || "");
      await deleteClient(sessionStorage.getItem("userId") || "");
      message.success("Account deleted successfully!");
      sessionStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Something went wrong while deleting your account.");
    }
  };

  const getInitials = () => {
    if (user?.name && user?.surname) {
      return `${user.name.charAt(0)}${user.surname.charAt(0)}`;
    }
    return user?.userName?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <>
      <Drawer
        title={null}
        placement="right"
        width={420}
        onClose={onClose}
        open={open}
        className={styles.drawer}
        styles={{
          body: { padding: 0 },
          header: { display: "none" },
        }}
      >
        <div className={styles.drawerContent}>
          <div className={styles.header}>
            <div className={styles.avatarSection}>
              <Avatar
                size={80}
                className={styles.avatar}
                icon={<UserOutlined />}
              >
                {getInitials()}
              </Avatar>
              <div className={styles.userInfo}>
                <Title level={3} className={styles.userName}>
                  {user?.name && user?.surname
                    ? `${user.name} ${user.surname}`
                    : user?.userName}
                </Title>
                <Text className={styles.userEmail}>{user?.emailAddress}</Text>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <EditOutlined className={styles.sectionIcon} />
              <Title level={4} className={styles.sectionTitle}>
                Update Profile
              </Title>
            </div>

            <Form layout="vertical" form={form} className={styles.form}>
              <Form.Item
                name="userName"
                label="Username"
                rules={[
                  { required: true, message: "Please enter your Username" },
                ]}
              >
                <Input
                  placeholder="Username"
                  className={styles.input}
                  prefix={<UserOutlined className={styles.inputIcon} />}
                />
              </Form.Item>

              <Space className={styles.nameRow}>
                <Form.Item
                  name="name"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please enter your Name" },
                  ]}
                  className={styles.nameField}
                >
                  <Input placeholder="First Name" className={styles.input} />
                </Form.Item>
                <Form.Item
                  name="surname"
                  label="Last Name"
                  rules={[
                    { required: true, message: "Please enter your Surname" },
                  ]}
                  className={styles.nameField}
                >
                  <Input placeholder="Last Name" className={styles.input} />
                </Form.Item>
              </Space>

              <Form.Item
                name="emailAddress"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter your Email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Email Address" className={styles.input} />
              </Form.Item>

              <Button
                type="primary"
                block
                onClick={handleUpdateDetails}
                className={styles.updateButton}
                loading={loading}
                icon={<EditOutlined />}
              >
                Update Profile
              </Button>
            </Form>
          </div>

          <div className={styles.deleteSection}>
            <Divider className={styles.divider}>
              <Text className={styles.dividerText}>Danger Zone</Text>
            </Divider>

            <div className={styles.dangerZone}>
              <div className={styles.dangerInfo}>
                <DeleteOutlined className={styles.dangerIcon} />
                <div>
                  <Text strong className={styles.dangerTitle}>
                    Delete Account
                  </Text>
                  <br />
                  <Text className={styles.dangerDescription}>
                    This action cannot be undone. All your data will be
                    permanently removed.
                  </Text>
                </div>
              </div>

              <Button
                danger
                ghost
                onClick={() => setDeleteModalVisible(true)}
                className={styles.deleteButton}
                icon={<DeleteOutlined />}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </Drawer>

      <Modal
        open={deleteModalVisible}
        title={
          <Space>
            <DeleteOutlined style={{ color: "#ff4d4f" }} />
            <span>Confirm Account Deletion</span>
          </Space>
        }
        onCancel={() => setDeleteModalVisible(false)}
        onOk={confirmDelete}
        okText="Yes, Delete My Account"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        className={styles.deleteModal}
      >
        <div className={styles.modalContent}>
          <Text className={styles.modalText}>
            Are you absolutely sure you want to delete your account? This action
            cannot be undone and will permanently remove all your data.
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default ProfileDrawer;
