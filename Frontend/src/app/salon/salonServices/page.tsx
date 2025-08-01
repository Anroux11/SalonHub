"use client";

import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Flex, Spin, Divider } from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/styles";
import { useSalonServiceActions, useSalonServiceState } from "@/providers/salonService-provider";
import { ISalonService } from "@/providers/salonService-provider/context";

const SalonServicePage = () => {
  const { styles } = useStyles();

  const { salonServices} = useSalonServiceState();
  const { getSalonServiceList } = useSalonServiceActions();


  const [modalVisible, setModalVisible] = useState(false);
  const { createSalonService } = useSalonServiceActions();

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    getSalonServiceList();
  }, [""]);

  const handleAddSalonService = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const payload: ISalonService = {
        name: values.name,
        description: values.description,
        price: values.price,
        salonName: sessionStorage.getItem("salonName") || "",
      };

      createSalonService(payload);
      setModalVisible(false);
      form.resetFields();
      getSalonServiceList();
      message.success(`Added Salon Service ${values.name}`);
    } catch (error) {
      console.error("Error adding Salon Service:", error);
      message.error("Failed to add Salon Service");
    }

    setLoading(false);
  };

  const columns: ColumnsType<ISalonService> = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => record.name || "-",
    },
    {
      title: "Description",
      key: "description",
      render: (_, record) => record.description || "-",
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => record.price || "-",
    },
  ];

  return (
    <>
      {loading ? (
        <div>
          <Flex
            justify="center"
            align="center"
            style={{ height: "100vh" }}
          >
            <Spin size="large" />
          </Flex>
        </div>
      ) : (
        <div className={styles.salonServiceContainer}>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 style={{ margin: 0 }}>Service List</h2>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add Service
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={salonServices}
            className={styles.salonServiceTable}
            rowKey="key"
            pagination={{ pageSize: 5 }}
            scroll={{x: "max-content"}}
          />

          <Modal
            title="Add Service"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={
              <Space>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                <Button type="primary" onClick={handleAddSalonService}>
                  Add
                </Button>
              </Space>
            }
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Name of Service"
                rules={[{ required: true, message: "Please enter Service Name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Please enter Description of service" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Please enter price of service",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Divider />
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default SalonServicePage;
