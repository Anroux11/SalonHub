"use client";

import React, { useState } from "react";
import { useStyles } from "./style/styles";
// import Typography from "antd/es/typography";
import { useRouter } from "next/navigation";
import { Button, Divider, Flex, Form, FormProps, Input, Spin } from "antd/es";
import message from "antd/es/message";
import "@ant-design/v5-patch-for-react-19";
import Image from "next/image";
import {
  ArrowRightOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useUserLoginActions } from "@/providers/auth-provider";
import Link from "next/link";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const { styles } = useStyles();
  // const { Title } = Typography;
  const router = useRouter();
  const { userLogin } = useUserLoginActions();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const payload = {
        userNameOrEmailAddress: values.email || "",
        password: values.password || "",
        rememberClient: true,
      };
      await userLogin(payload);
      setLoading(false);
      const user = sessionStorage.getItem("role") || "";

      if (user === "Admin") {
        message.success("Login successfully!");
        router.push("/admin/dashboard");
      } else if (user === "Client") {
        message.success("Login successfully!");
        router.push("/client/dashboard");
      } else if (user === "Salon") {
        message.success("Login successfully!");
        router.push("/salon/dashboard");
      } else if (user === "EmployeeTechnician") {
        message.success("Login successfully!");
        router.push("/employeeTechnician/dashboard");
      } else {
        message.error("Could not find user");
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error("Login failed. Please check your credentials.");
    }
  }


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
                width={350}
                height={350}
              ></Image>
              <h1 style={{color: "#969aa2ff", fontWeight: "10", fontSize: "30px"}}>Manage Your Clients</h1>
              <h1 style={{color:"#969aa2ff", fontWeight: "10"}}>Manage Your Appointments</h1>
              <h1 style={{color: "#969aa2ff", fontWeight: "10"}}>Manage Your Services</h1>
              
            </div>
          </div>
          <div className={styles.splitRight}>
            <div className={styles.page}>
              <div className={styles.mobileLogo}>
                <Image
                  src="/AppLogo-WordsBig.png"
                  alt="SalonHub Logo"
                  width={200}
                  height={200}
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.form}>
                <Form
                  name="login"
                  initialValues={{ remember: true }}
                  className={styles.formContent}
                  onFinish={onFinish}
                >
                  <h2 className={styles.heading}>Login</h2>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email or Username"
                      prefix={<MailOutlined />}
                      className={styles.input}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
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
                  <Form.Item>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "300px",
                        fontWeight: "bold",
                      }}
                      size="large"
                    >
                      Log in
                    </Button>
                  </Form.Item>
                  <Divider plain>
                    OR
                  </Divider>
                  <Link href="/register">
                      <Button
                      className={styles.registerBtn}
                      block
                      type="default"
                      size="large"
                    >
                      Register
                      <ArrowRightOutlined />
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

export default Login;
