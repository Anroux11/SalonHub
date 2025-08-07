"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Space,
  message,
  FormProps,
  Flex,
  Spin,
  Input,
} from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/styles";
import { ISalon } from "@/providers/salon-provider/context";
import { useSalonActions, useSalonState } from "@/providers/salon-provider";

const AddSalon = () => {
  const { styles } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createSalon } = useSalonActions();
  const [form] = Form.useForm();
  const { salons } = useSalonState();
  const { getSalonList } = useSalonActions();

  const handleCreateSalon: FormProps<ISalon>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
      };
      await createSalon(payload);
      message.success("Salon added successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to add a Salon. Please try again.");
    }
    setLoading(false);
  };

  const handleAddUser = () => {
    form.validateFields().then((values) => {
      const newSalon: ISalon = {
        name: values.name,
      };
      handleCreateSalon(newSalon);
      setModalVisible(false);
      form.resetFields();
      getSalonList();
    });
  };

  useEffect(() => {
    getSalonList();
  }, [""]);

  const columns: ColumnsType<ISalon> = [
    {
      title: "Salon Name",
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
            <h2 style={{ margin: 0 }}>Salon List</h2>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add Salon
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={salons}
            className={styles.employeeTechnicianTable}
            pagination={{ pageSize: 6 }}
            rowKey="key"
          />

          <Modal
            title="Add Salon"
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
            <Form form={form} layout="vertical" onFinish={handleCreateSalon}>
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
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AddSalon;
