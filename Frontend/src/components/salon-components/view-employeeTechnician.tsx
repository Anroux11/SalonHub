/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Modal, Typography } from "antd/es";
import { EyeOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";

const ViewBooking = ({ user }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Title } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <EyeOutlined />
      </Button>
      <Modal
        title="Service Provider Details"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={hideModal}
        onCancel={hideModal}
      >
        <br />
        <Title level={5}>Name:</Title>
        {user?.dateOfBirth}
        <Title level={5}>Email:</Title>
        {user?.email}
        <Title level={5}>Address:</Title>
        {user?.contactNumber}
        <Title level={5}>Contact Number:</Title>
        {user?.sex}
        
      </Modal>
    </>
  );
};

export default ViewBooking;
