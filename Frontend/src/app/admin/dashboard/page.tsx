"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Select,
  FormProps,
  Flex,
  Spin,
} from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/styles";
import { IClient } from "@/providers/client-provider/context";
import { useClientActions, useClientState } from "@/providers/client-provider";
import { useRegisterClientActions } from "@/providers/auth-provider";
import { ISalon } from "@/providers/salon-provider/context";
import { useSalonState } from "@/providers/salon-provider";

type Client = {
  key: string;
  emailAddress: string;
  password: string;
  roleName: string;
  surname: string;
  userName: string;
  name: string;
};

type User = {
  key: string;
  emailAddress: string;
  password: string;
  roleName: string;
  surname: string;
  userName: string;
  name: string;
};

const AddUser = () => {
  const { styles } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registerClient } = useRegisterClientActions();
  const [form] = Form.useForm();
  const { getClientList } = useClientActions();
  const [selectedSalon, setSelectedSalon] = useState<ISalon | null>(null);
  const [salonList, setSalonList] = useState<ISalon[]>([]);
  const { Option } = Select;
  const { clients } = useClientState();
  const { salons } = useSalonState();

  const handleRegister: FormProps<Client>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const payload = {
        emailAddress: values.emailAddress,
        password: values.password,
        roleName: "Salon",
        userName: values.userName,
        surname: values.surname,
        name: values.name,
      };
      await registerClient(payload);
      message.success("Registered successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to add a user. Please try again.");
    }
    setLoading(false);
  };

  const handleAddUser = () => {
    form.validateFields().then((values) => {
      const newUser: User = {
        key: ((clients?.length ?? 0) + 1).toString(),
        emailAddress: values.emailAddress,
        password: values.password,
        roleName: values.roleName,
        name: values.name,
        surname: values.surname,
        userName: values.userName,
      };
      handleRegister(newUser);
      setModalVisible(false);
      form.resetFields();
      message.success(`New User added Successfully`);
    });
  };

   useEffect(() => {
    if (salons?.length) {
      setSalonList(salons);
    }
  }, [salons]);

  useEffect(() => {
    getClientList();
  }, [""]);

  const columns: ColumnsType<IClient> = [
    {
      title: "Name",
      key: "userName",
      render: (_, record) => record.userName || "-",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "name",
    },
    {
      title: "Email",
      key: "emailAddress",
      render: (_, record) => record.emailAddress || "-",
    },
    {
      title: "Salon",
      dataIndex: "name",
      key: "userName",
    },
  ];

  return (
    <>
      {loading ? (
        <div>
          <Flex
            justify="center"
            align="center"
            style={{ marginBottom: 20, width: "100%", height: "100vh" }}
          >
            <Spin size="large" />
          </Flex>
        </div>
      ) : (
        <div className={styles.employeeTechnicianContainer}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ margin: 0 }}>User List</h2>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add User
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={clients}
            className={styles.employeeTechnicianTable}
            pagination={{ pageSize: 6 }}
            rowKey="key"
          />

          <Modal
            title="Add User"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={
              <Space>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                <Button type="primary" onClick={handleAddUser}>
                  Add
                </Button>
              </Space>
            }
          >
            <Form form={form} layout="vertical" onFinish={handleRegister}>
              <Form.Item
                name="emailAddress"
                label="Email"
                rules={[
                  { required: true, message: "Please enter the User's Email" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter the User's Password",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="userName"
                label="User's Name"
                rules={[
                  { required: true, message: "Please enter the User's Name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="surname"
                label="Surname"
                rules={[
                  {
                    required: true,
                    message: "Please enter the User's Surname",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="name"
                label="Salon Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Salon Name",
                  },
                ]}
              >
                <Select
                  placeholder="Select name of Salon"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setSelectedSalon(
                      salonList?.find((et) => et.id === value) || null
                    )
                  }
                  value={selectedSalon?.id}
                >
                  {salonList?.map((sal) => (
                    <Option key={sal.name} value={sal.name}>
                      {sal.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AddUser;
