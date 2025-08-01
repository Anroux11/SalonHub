"use client";

import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Flex, Spin, Divider } from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/styles";
import { IEmployeeTechnician } from "@/providers/employeeTechnician-provider/context";
import { useEmployeeTechnicianActions, useEmployeeTechnicianState } from "@/providers/employeeTechnician-provider";

const EmployeeTechnicianPage = () => {
  const { styles } = useStyles();

  const { employeeTechnicians } = useEmployeeTechnicianState();
  const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();


  const [modalVisible, setModalVisible] = useState(false);
  const { createEmployeeTechnician } = useEmployeeTechnicianActions();

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    getEmployeeTechnicianList();
  }, []);

  const handleAddEmployeeTechnician = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const payload: IEmployeeTechnician = {
        name: values.name,
        email: values.email,
        password: values.password,
        jobTitle: values.jobTitle,
        contactNumber: values.contactNumber,
        salonName: sessionStorage.getItem("salonName") || "",
      };

      createEmployeeTechnician(payload);
      setModalVisible(false);
      form.resetFields();
      getEmployeeTechnicianList();
      message.success(`Added Employee ${values.name}`);
    } catch (error) {
      console.error("Error adding Employee:", error);
      message.error("Failed to add Employee");
    }

    setLoading(false);
  };

  const columns: ColumnsType<IEmployeeTechnician> = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => record.name || "-",
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => record.email || "-",
    },
    {
      title: "Job Title",
      key: "address",
      render: (_, record) => record.jobTitle || "-",
    },
    {
      title: "Contact Number",
      key: "contactNumber",
      render: (_, record) => record.contactNumber || ""
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
        <div className={styles.employeeTechnicianContainer}>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 style={{ margin: 0 }}>Employee List</h2>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add Employee
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={employeeTechnicians}
            className={styles.employeeTechnicianTable}
            rowKey="key"
            pagination={{ pageSize: 5 }}
          />

          <Modal
            title="Add Service Provider"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={
              <Space>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                <Button type="primary" onClick={handleAddEmployeeTechnician}>
                  Add
                </Button>
              </Space>
            }
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Employee Name"
                rules={[{ required: true, message: "Please enter Service Provider name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email" }]}
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
                name="jobTitle"
                label="Job Title"
                rules={[{ required: true, message: "Please enter the Job Title" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[{ required: true, message: "Please enter the Contact Number" }]}
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

export default EmployeeTechnicianPage;
