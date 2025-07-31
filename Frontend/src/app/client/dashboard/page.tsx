"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  GetProps,
  Input,
  message,
  Modal,
  Row,
  Space,
  // Spin,
  // Typography,
  Upload,
} from "antd/es";
import {
  PlusOutlined,
  // EnvironmentOutlined,
  FileTextOutlined,
  // ClockCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
import {
  // dashboardStyles,
  // cardStyles,
  // buttonStyles,
  modalStyles,
} from "./style/styles";
import { IBooking } from "@/providers/booking-provider/context";
import {
  useBookingActions,
  useBookingState,
} from "@/providers/booking-provider";
import { useImageActions } from "@/providers/image-provider";
import BookingList from "@/components/salon-components/bookings";
import { useStyles } from "./style/styles";
import dayjs from "dayjs";
import { useSalonState } from "@/providers/salon-provider";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(7, 18),
  disabledMinutes: () => range(60, 60),
});

// const { Text } = Typography;

const ClientDashboard: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  // const [salon, setSalon] = useState("");
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [booking, setBooking] = useState<IBooking[]>([]);
  const { createBooking } = useBookingActions();
  const { uploadImage } = useImageActions();
  const { bookings } = useBookingState();
  const { salons } = useSalonState();

  const { styles } = useStyles();

  // const initialDate = dayjs("2025-07-30");

  // const loggedInUser = sessionStorage.getItem("user");

  const handleBooking = () => setBookingModalVisible(true);

  // const handleCreateBooking = () => {
  //   form.setFieldsValue({
  //     salonId: salon,
  //     latitude: position?.[0] || "",
  //     longitude: position?.[1] || "",
  //     city,
  //     province,
  //   });
  //   setFullReportModalVisible(true);
  // };

  const handleAddBooking = async () => {
    debugger;
    try {
      const values = await form.validateFields();

      const file = values.imageUrl?.[0]?.originFileObj;
      if (!file) {
        message.error("Please upload a Photo.");
        return;
      }

      const imageUrl = await uploadImage(file);
      // const imageUrl = "url";
      if (!imageUrl) {
        message.error("Failed to upload image.");
        return;
      }

      const payload: IBooking = {
        date: values.date,
        service: values.service,
        status: "Submitted",
        imageUrl,
        bookingUserId: parseInt(sessionStorage.getItem("userId") ?? "0"),
        salonName: sessionStorage.getItem("salon") || "",
        salonId: parseInt(sessionStorage.getItem("userId") ?? "0"),
        // salonId: "25736945-bb70-4433-b7a4-2dbb7f1d6628",
        employeeTechnicianName: "Unallocated",
        employeeTechnicianId: parseInt(sessionStorage.getItem("userId") ?? "0"),
      };

      await createBooking(payload);

      setBooking([...booking, payload]);
      message.success("Booking made successfully!");
      setBookingModalVisible(false);
      form.resetFields();
      router.push("/client/bookings");
    } catch (error) {
      console.error("Submit error:", error);
      message.error("Something went wrong while submitting your booking.");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Row gutter={[15, 15]} className={styles.summaryRow}>
        <Col xs={24} sm={30} md={12}>
          <Card className={styles.summaryCard}>
            <h3>Bookings</h3>
            <p className="count">{bookings?.length || 0}</p>
            <p>Total Bookings</p>
          </Card>
        </Col>
        <Col xs={24} sm={30} md={12}>
          <Card className={styles.summaryCard}>
            <h3>Salons</h3>
            <p className="count">{salons?.length || 0}</p>
            <p>Total Salons Added</p>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Quick Actions</Divider>
      <Row gutter={[16, 16]} className={styles.quickActionsRow}>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            size="large"
            block
            className={styles.quickActionButton}
            onClick={() => router.push("./bookings")}
          >
            View all Bookings
          </Button>
        </Col>

        <Col xs={24} sm={8}>
          <Button
            type="default"
            size="large"
            block
            className={styles.quickActionButton}
            onClick={handleBooking}
          >
            Create Booking
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            size="large"
            block
            className={styles.quickActionButton}
            onClick={() => router.push("./salons")}
          >
            Salons
          </Button>
        </Col>
      </Row>

      <Divider orientation="left">Recent Bookings</Divider>
      <Card className={styles.bookingCard}>
        <BookingList />
      </Card>
      <Modal
        title={
          <Space>
            <FileTextOutlined />
            Add Booking
          </Space>
        }
        open={bookingModalVisible}
        onCancel={() => setBookingModalVisible(false)}
        footer={
          <Space>
            <Button onClick={() => setBookingModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleAddBooking}>
              Submit
            </Button>
          </Space>
        }
        width={400}
        centered
        style={modalStyles.large}
      >
        <Form form={form} layout="vertical" initialValues={{ date: dayjs() }}>
          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please choose a Date",
              },
            ]}
          >
            <Space direction="vertical" size={12}>
              <DatePicker
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{ defaultValue: dayjs("00:00:00", "HH:mm") }}
              />
            </Space>
          </Form.Item>

          <Form.Item
            name="employeeTechnicianName"
            label="Name of Hairdresser"
            rules={[
              {
                required: true,
                message: "Please enter name of your hairdresser",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="service"
            label="Service Requested"
            rules={[
              {
                required: true,
                message: "Please input the service you want",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="salonName"
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

          <Form.Item
            label="Upload Image"
            name="imageUrl"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              maxCount={1}
            >
              <button type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Divider />
        </Form>
      </Modal>
    </div>
  );
};

export default ClientDashboard;
