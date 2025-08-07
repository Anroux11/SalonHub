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
  Flex,
  Spin,
  Divider,
  Typography,
  Card,
  Row,
  Col,
} from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "../employeeTechnician/style/styles";
import {
  useSalonServiceActions,
  useSalonServiceState,
} from "@/providers/salonService-provider";
import { ISalonService } from "@/providers/salonService-provider/context";
import {
  DollarOutlined,
  PlusCircleOutlined,
  ScissorOutlined,
  SignatureOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const SalonServicePage = () => {
  const { styles } = useStyles();

  const { salonServices } = useSalonServiceState();
  const { getSalonServiceList } = useSalonServiceActions();

  const [modalVisible, setModalVisible] = useState(false);
  const { createSalonService } = useSalonServiceActions();

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    getSalonServiceList();
  }, [""]);

  useEffect(() => {
    getSalonServiceList();
  }, [salonServices]);

  const handleAddSalonService = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const payload: ISalonService = {
        name: values.name,
        description: values.description,
        price: values.price,
        salonName: sessionStorage.getItem("salon-name") || "",
      };

      createSalonService(payload);
      setModalVisible(false);
      form.resetFields();
      message.success(`Added Salon Service ${values.name}`);
    } catch (error) {
      console.error("Error adding Salon Service:", error);
      message.error("Failed to add Salon Service");
    }

    setLoading(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
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
          <Flex justify="center" align="center" style={{ height: "100vh" }}>
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
            <h2 style={{ margin: 0 }}>Service List</h2>
            <Button
              type="primary"
              onClick={() => setModalVisible(true)}
              className={styles.addButton}
            >
              Add Service
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={salonServices}
            className={styles.employeeTechnicianTable}
            rowKey="key"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />

          <Modal
            title={
              <div className={styles.modalHeader}>
                <PlusCircleOutlined className={styles.modalHeaderIcon} />
                <Title level={3} className={styles.modalHeaderTitle}>
                  Add Service
                </Title>
                <Text type="secondary" className={styles.modalHeaderSubtitle}>
                  Fill in the details to add a new service to your Salon
                </Text>
              </div>
            }
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            width={600}
            centered
            className={styles.modal}
            footer={
              <div className={styles.modalFooter}>
                <Space size="middle">
                  <Button
                    onClick={handleCancel}
                    size="large"
                    className={styles.cancelButton}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleAddSalonService}
                    loading={loading}
                    size="large"
                    className={styles.submitButton}
                  >
                    Add Service
                  </Button>
                </Space>
              </div>
            }
          >
            <Card>
              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label={
                        <Text strong className={styles.fieldLabel}>
                          <ScissorOutlined className={styles.fieldIcon} />
                          Service Name
                        </Text>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter Service Name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Col span={24}>
                  <Form.Item
                    name="description"
                    label={
                      <Text strong className={styles.fieldLabel}>
                        <SignatureOutlined className={styles.fieldIcon} />
                        Description
                      </Text>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter Description of service",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="price"
                    label={
                      <Text strong className={styles.fieldLabel}>
                        <DollarOutlined className={styles.fieldIcon} />
                        Price
                      </Text>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter price of service",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Divider />
              </Form>
            </Card>
          </Modal>
        </div>
      )}
    </>
  );
};

export default SalonServicePage;
