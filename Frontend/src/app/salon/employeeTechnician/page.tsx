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
  Card,
  Typography,
  Row,
  Col,
} from "antd/es";
import type { ColumnsType } from "antd/es/table";
import {
  UserAddOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useStyles } from "./style/styles";
import { IEmployeeTechnician } from "@/providers/employeeTechnician-provider/context";
import {
  useEmployeeTechnicianActions,
  useEmployeeTechnicianState,
} from "@/providers/employeeTechnician-provider";

const { Title, Text } = Typography;

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
  }, [employeeTechnicians]);

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
        salonName: sessionStorage.getItem("salon-name") || "",
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

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
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
      render: (_, record) => record.contactNumber || "",
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
            <h2 style={{ margin: 0 }}>Employee List</h2>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              size="large"
              onClick={() => setModalVisible(true)}
              className={styles.addButton}
            >
              Add
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={employeeTechnicians}
            className={styles.employeeTechnicianTable}
            rowKey="key"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />

          <Modal
            title={
              <div className={styles.modalHeader}>
                <UserAddOutlined className={styles.modalHeaderIcon} />
                <Title level={3} className={styles.modalHeaderTitle}>
                  Add New Employee
                </Title>
                <Text type="secondary" className={styles.modalHeaderSubtitle}>
                  Fill in the details to add a new team member
                </Text>
              </div>
            }
            open={modalVisible}
            onCancel={handleCancel}
            width={600}
            centered
            maskClosable={false}
            className={styles.modal}
            // styles={{
            //   body: modalStyles.modalBody,
            //   header: modalStyles.modalHeaderBackground,
            // }}
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
                    onClick={handleAddEmployeeTechnician}
                    loading={loading}
                    size="large"
                    className={styles.submitButton}
                  >
                    Add Employee
                  </Button>
                </Space>
              </div>
            }
          >
            <Card className={styles.formCard}>
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                className={styles.formContainer}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label={
                        <Text strong className={styles.fieldLabel}>
                          <UserOutlined className={styles.fieldIcon} />
                          Full Name
                        </Text>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter the employee's full name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter employee's full name"
                        size="large"
                        className={styles.inputField}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label={
                        <Text strong className={styles.fieldLabel}>
                          <MailOutlined className={styles.fieldIcon} />
                          Email Address
                        </Text>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter email address",
                        },
                      ]}
                    >
                      <Input
                        placeholder="employee@company.com"
                        size="large"
                        className={styles.inputField}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="contactNumber"
                      label={
                        <Text strong className={styles.fieldLabel}>
                          <PhoneOutlined className={styles.fieldIcon} />
                          Contact Number
                        </Text>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter contact number",
                        },
                      ]}
                    >
                      <Input
                        placeholder="+27 XX XXX XXXX"
                        size="large"
                        className={styles.inputField}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="jobTitle"
                      label={
                        <Text strong className={styles.fieldLabel}>
                          Job Title
                        </Text>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter job title",
                        },
                      ]}
                    >
                      <Input
                        placeholder="e.g., Hair Stylist, Nail Technician"
                        size="large"
                        className={styles.inputField}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="password"
                      label={
                        <Text strong className={styles.fieldLabel}>
                          <LockOutlined className={styles.fieldIcon} />
                          Password
                        </Text>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter an initial password",
                        },
                        {
                          min: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Minimum 6 characters"
                        size="large"
                        className={styles.inputField}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider className={styles.formDivider} />
                <Text type="secondary" className={styles.footerText}>
                  * The employee will be able to Login after they have been
                  added
                </Text>
              </Form>
            </Card>
          </Modal>
        </div>
      )}
    </>
  );
};

export default EmployeeTechnicianPage;
