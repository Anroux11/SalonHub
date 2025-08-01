"use client";

import { useEffect, useState } from "react";
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
  Select,
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
import { useStyles } from "./style/styles";
import dayjs from "dayjs";
import { useSalonActions, useSalonState } from "@/providers/salon-provider";
import DashboardBookingList from "@/components/salon-components/dashboardBooking";
import {
  useEmployeeTechnicianActions,
  useEmployeeTechnicianState,
} from "@/providers/employeeTechnician-provider";
// import { useEmployeeTechnicianActions, useSalonState } from "@/providers/salon-provider";
// import { IEmployeeTechnician } from "@/providers/employeeTechnician-provider/context";
// import { useEmployeeTechnicianState } from "@/providers/employeeTechnician-provider";
import { ISalon } from "../../../providers/salon-provider/context";
import { IEmployeeTechnician } from "@/providers/employeeTechnician-provider/context";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().endOf("day");
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(7, 18),
  disabledMinutes: () => range(60, 60),
});

const ClientDashboard: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [salonList, setSalonList] = useState<ISalon[]>([]);
  const [employeeTechinicianList, setEmployeeTechinicianList] = useState<
    IEmployeeTechnician[]
  >([]);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [booking, setBooking] = useState<IBooking[]>([]);
  const { createBooking } = useBookingActions();
  const { uploadImage } = useImageActions();
  const { bookings } = useBookingState();
  // const { salons } = useSalonState();
  const { styles } = useStyles();
  const { Option } = Select;
  const handleBooking = () => setBookingModalVisible(true);
  const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();
  const { getSalonList } = useSalonActions();

  const [selectedEmployeeTechnician, setSelectedEmployeeTechnician] =
    useState<IEmployeeTechnician | null>(null);
  const [selectedSalon, setSelectedSalon] = useState<ISalon | null>(null);
  const { employeeTechnicians } = useEmployeeTechnicianState();
  const { salons } = useSalonState();

  useEffect(() => {
    getSalonList();
  }, [""]);

  useEffect(() => {
    if (salons?.length) {
      setSalonList(salons);
    }
  }, [salons]);

  useEffect(() => {
    if (selectedSalon) {
      sessionStorage.setItem("salonName", JSON.stringify(selectedSalon));
      getEmployeeTechnicianList();
    }
  }, [selectedSalon]);

  useEffect(() => {
    if (employeeTechnicians?.length) {
      setEmployeeTechinicianList(employeeTechnicians);
    }
  }, [employeeTechnicians]);

  useEffect(() => {
    if (selectedEmployeeTechnician) {
      
    }
  }, [selectedEmployeeTechnician]);

  const handleAddBooking = async () => {
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
        // salonName: values.salonName,
        salonName: sessionStorage.getItem("salonName") || "",
        // salonId: parseInt(sessionStorage.getItem("userId") ?? "0"),
        salonId: "25736945-bb70-4433-b7a4-2dbb7f1d6628",
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
        <DashboardBookingList />
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
            name="salonName"
            label="Salon Name"
            rules={[
              {
                required: true,
                message: "Please enter the Salon Name",
              },
            ]}
          >
            <Select
              placeholder="Select name of Salon"
              style={{ width: "100%" }}
              onChange={(value) =>
                setSelectedSalon(
                  salonList?.find((et) => et.id === value) || null
                )
              }
              value={selectedSalon?.id}
            >
              {salonList?.map((sal) => (
                <Option key={sal.id} value={sal.name}>
                  {sal.name}
                </Option>
              ))}
            </Select>
            {/* <Input /> */}
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
            <Select
              placeholder="Select name of Hairdresser"
              style={{ width: "100%" }}
              onChange={(value) =>
                setSelectedEmployeeTechnician(
                  employeeTechinicianList?.find((et) => et.id === value) || null
                )
              }
              value={selectedEmployeeTechnician?.id}
            >
              {employeeTechinicianList?.map((emT) => (
                <Option key={emT.id} value={emT.id}>
                  {emT.name}
                </Option>
              ))}
            </Select>
            {/* <Input/> */}
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
