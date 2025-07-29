import React, { useState } from "react";
import { Button, Form, Modal, Select } from "antd/es";
import { SizeType } from "antd/es/config-provider/SizeContext";

const AssignBooking: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign
      </Button>
      <Modal
        open={open}
        title="Select Service Provider"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
          <Button htmlType="submit" type="primary">
            Assign Booking
          </Button>
        <CancelBtn />
          </>
        )}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          style={{ maxWidth: 600 }}
          name="assign-booking"
        >
          <Form.Item label="Select" name="selectService">
            <Select>
              <Select.Option value="demo">Anrouxs Company</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AssignBooking;
