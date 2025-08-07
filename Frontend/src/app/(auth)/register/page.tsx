"use client";

import React, { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/style";
import Image from "next/image";
import Typography from "antd/es/typography";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, FormProps, message, Flex, Spin } from "antd/es";
import { useRegisterClientActions } from "@/providers/auth-provider";
import Link from "next/link";

type FieldType = {
  emailAddress: string;
  password: string;
  roleName: string;
  name: string;
  surname: string;
  address: string;
  contactNumber: number;
  userName: string;
};

const RegistrationForm = () => {
  const router = useRouter();
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  const { registerClient } = useRegisterClientActions();

  const handleRegister: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const payload = {
        emailAddress: values.emailAddress,
        password: values.password,
        roleName: "Client",
        userName: values.userName,
        name: values.name,
        surname: values.surname,
      };
      await registerClient(payload);
      message.success("Registered successfully!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      message.error("Register failed. Please try again.");
    }
    setLoading(false);
    return router.push("/login");
  };

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
        <>
          <div className={styles.splitLeft}>
            <div className={styles.centered}>
              <Image
                src="/AppLogo-Big.png"
                alt="Profile"
                width={300}
                height={300}
              ></Image>
              <Title style={{ color: "#969aa2ff" }}>
                To Get Started...please register to SalonHub
              </Title>
            </div>
          </div>

          <div className={styles.splitRight}>
            <div className={styles.page}>
              <div className={styles.form}>
                <Form
                  form={form}
                  name="register"
                  onFinish={handleRegister}
                  scrollToFirstError
                >
                  <h1 className={styles.heading}>Register</h1>
                  <Form.Item
                    name="emailAddress"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email"
                      prefix={<MailOutlined />}
                      className={styles.input}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        type: "regexp",
                        pattern: new RegExp(
                          "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                        ),
                        message: "Does not meet requirements",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      className={styles.input}
                      size="large"
                      placeholder="Password"
                      prefix={<LockOutlined />}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Username"
                      prefix={<UserOutlined />}
                      className={styles.input}
                    />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your First Name!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="First Name"
                      prefix={<UserOutlined />}
                      className={styles.input}
                    />
                  </Form.Item>

                  <Form.Item
                    name="surname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Last Name!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Last Name"
                      prefix={<UserOutlined />}
                      className={styles.input}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      style={{ width: "300px" }}
                      size="large"
                    >
                      Register
                    </Button>
                  </Form.Item>
                  <Link href="/login">
                    <Button
                      type="default"
                      className={styles.loginBtn}
                      block
                      style={{ width: "300px" }}
                      size="large"
                    >
                      <ArrowLeftOutlined />
                      Back to Login
                    </Button>
                  </Link>
                </Form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RegistrationForm;
