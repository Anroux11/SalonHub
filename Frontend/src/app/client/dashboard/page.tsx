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
  message,
  Modal,
  Row,
  Select,
  Typography,
  // Spin,
  // Typography,
  Upload,
} from "antd/es";
import {
  PlusOutlined,
  // EnvironmentOutlined,
  FileTextOutlined,
  CameraOutlined,
  ScissorOutlined,
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  // ClockCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
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
import { ISalonService } from "@/providers/salonService-provider/context";
import {
  useSalonServiceActions,
  useSalonServiceState,
} from "@/providers/salonService-provider";

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
  disabledHours: () => range(0, 24).splice(18),
  disabledMinutes: () => range(60, 60),
});

const formatBookingDate = (date: string) => {
  return dayjs(date).format('ddd, MMM DD [at] h:mm A');
  // e.g., "Sun, Dec 15 at 2:30 PM"
};

const ClientDashboard: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [salonList, setSalonList] = useState<ISalon[]>([]);
  const [employeeTechinicianList, setEmployeeTechinicianList] = useState<
    IEmployeeTechnician[]
  >([]);
  const [salonServiceList, setSalonServiceList] = useState<ISalonService[]>([]);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [booking, setBooking] = useState<IBooking[]>([]);
  const { createBooking } = useBookingActions();
  const { uploadImage } = useImageActions();
  const { bookings } = useBookingState();
  const { styles } = useStyles();
  const { Option } = Select;
  const handleBooking = () => setBookingModalVisible(true);
  const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();
  const { getSalonList } = useSalonActions();
  const { getSalonServiceList } = useSalonServiceActions();

  const [selectedEmployeeTechnician, setSelectedEmployeeTechnician] = useState<
    string | null
  >(null);
  const [selectedSalonService, setSelectedSalonService] = useState<
    string | null
  >(null);
  // const [selectedEmployeeTechnician, setSelectedEmployeeTechnician] =
  // useState<IEmployeeTechnician | null>(null);
  // const [selectedSalonService, setSelectedSalonService] =
  // useState<ISalonService | null>(null);
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);
  const { employeeTechnicians } = useEmployeeTechnicianState();
  const { salons } = useSalonState();
  const { salonServices } = useSalonServiceState();
  const { Text } = Typography;

  useEffect(() => {
    getSalonList();
    getSalonServiceList();
  }, [""]);

  useEffect(() => {
    if (salons?.length) {
      setSalonList(salons);
    }
  }, [salons]);

  useEffect(() => {
    if (selectedSalon) {
      sessionStorage.setItem("salon-name", selectedSalon);
      getEmployeeTechnicianList();
      getSalonServiceList();
    }
  }, [selectedSalon]);

  useEffect(() => {
    if (employeeTechnicians?.length) {
      setEmployeeTechinicianList(employeeTechnicians);
    }
  }, [employeeTechnicians]);

  useEffect(() => {
    if (salonServices?.length) {
      setSalonServiceList(salonServices);
    }
  }, [salonServices]);

  useEffect(() => {
    if (selectedEmployeeTechnician) {
    }
  }, [selectedEmployeeTechnician]);

  const handleAddBooking = async () => {
    try {
      const values = await form.validateFields();

      let imageUrl = null;
      
      // Only upload image if a file was provided
      const file = values.imageUrl?.[0]?.originFileObj;
      if (file) {
        try {
          imageUrl = await uploadImage(file);
          if (!imageUrl) {
            message.warning("Failed to upload image, but booking will continue without photo.");
          }
        } catch (error) {
          console.error("Image upload error:", error);
          message.warning("Failed to upload image, but booking will continue without photo.");
        }
      }

      const payload: IBooking = {
        date: values.date,
        service: values.service,
        status: "Submitted",
        imageUrl: imageUrl || "",
        bookingUserId: parseInt(sessionStorage.getItem("userId") ?? "0"),
        salonName: values.salonName,
        salonId: sessionStorage.getItem("salonId") ?? "0",
        employeeTechnicianName: values.employeeTechnicianName,
        employeeTechnicianId: values.employeeTechnicianName,
        salonServiceId: values.service,
        salonServiceName: values.service,
      };

      await createBooking(payload);

      setBooking([...booking, payload]);

      const successMessage = imageUrl 
        ? `Booking made successfully for ${formatBookingDate(values.date)} with reference photo!`
        : `Booking made successfully for ${formatBookingDate(values.date)}!`;
        
      message.success(successMessage);
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
            className={styles.createBtn}
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
          <div className={styles.modalTitleContainer}>
            <FileTextOutlined className={styles.modalTitleIcon} />
            <span className={styles.modalTitleText}>
              Create New Booking
            </span>
          </div>
        }
        open={bookingModalVisible}
        onCancel={() => setBookingModalVisible(false)}
        footer={
          <div className={styles.modalFooterContainer}>
            <Button 
              onClick={() => setBookingModalVisible(false)}
              className={styles.cancelButton}
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              onClick={handleAddBooking}
              className={styles.submitButton}
              size="large"
            >
              Create Booking
            </Button>
          </div>
        }
        width={520}
        centered
        className={styles.modalContent}
      >
        <Form form={form} layout="vertical" initialValues={{ date: dayjs() }}>
          <Form.Item
            name="date"
            label={
              <div className={styles.formLabel}>
                <CalendarOutlined className={styles.fieldIcon} />
                <span>Preferred Date & Time</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: "Please choose a date and time",
              },
            ]}
            className={styles.formItem}
          >
            <DatePicker
              placeholder="Select your preferred date and time"
              format="DD MMM YYYY, h:mm A" 
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ 
                defaultValue: dayjs("09:00:00", "HH:mm"),
                format: "h:mm A", 
                minuteStep: 15
              }}
              className={styles.inputField}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="salonName"
            label={
              <div className={styles.formLabel}>
                <HomeOutlined className={styles.fieldIcon} />
                <span>Choose Salon</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: "Please select a salon",
              },
            ]}
            className={styles.formItem}
          >
            <Select
              placeholder="Select your preferred salon"
              className={styles.inputField}
              size="large"
              onChange={(value) => setSelectedSalon(value)}
              value={selectedSalon}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  ?.includes(input.toLowerCase())
              }
            >
              {salonList?.map((sal) => (
                <Option key={sal.name} value={sal.name}>
                  {sal.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="employeeTechnicianName"
            label={
              <div className={styles.formLabel}>
                <UserOutlined className={styles.fieldIcon} />
                <span>Select Hairdresser</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: "Please select your preferred hairdresser",
              },
            ]}
            className={styles.formItem}
          >
            <Select
              placeholder="Choose your hairdresser"
              className={styles.inputField}
              size="large"
              onChange={(value) => setSelectedEmployeeTechnician(value)}
              value={selectedEmployeeTechnician}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  ?.includes(input.toLowerCase())
              }
            >
              {employeeTechinicianList?.map((emT) => (
                <Option key={emT.name} value={emT.name}>
                  {emT.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="service"
            label={
              <div className={styles.formLabel}>
                <ScissorOutlined className={styles.fieldIcon} />
                <span>Service Requested</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: "Please choose a service",
              },
            ]}
            className={styles.formItem}
          >
            <Select
              placeholder="Select the service you need"
              className={styles.inputField}
              size="large"
              onChange={(value) => setSelectedSalonService(value)}
              value={selectedSalonService}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  ?.includes(input.toLowerCase())
              }
            >
              {salonServiceList?.map((serR) => (
                <Option key={serR.name} value={serR.name}>
                  {serR.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <div className={styles.formLabel}>
                <CameraOutlined className={styles.fieldIcon} />
                <span>Upload Reference Photo</span>
                <Text type="secondary" className={styles.secondaryText}>
                  (Optional - helps your stylist understand your vision)
                </Text>
              </div>
            }
            name="imageUrl"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            className={styles.formItem}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              maxCount={1}
              className={styles.uploadArea}
              accept="image/*"
            >
              <div className={styles.uploadContainer}>
                <PlusOutlined className={styles.uploadIcon} />
                <div className={styles.uploadText}>
                  Upload Photo
                </div>
                <div className={styles.uploadSubText}>
                  JPG, PNG up to 10MB
                </div>
              </div>
            </Upload>
          </Form.Item>

          <div className={styles.tipContainer}>
            <Text className={styles.tipText}>
              💡 <strong>Tip:</strong> Upload a reference photo to help your stylist understand exactly what you&apos;re looking for!
            </Text>
          </div>
          <Divider />
        </Form>
      </Modal>
    </div>
  );
};

export default ClientDashboard;
