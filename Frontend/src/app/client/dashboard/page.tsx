"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
  Upload,
} from "antd/es";
import {
  PlusOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  dashboardStyles,
  cardStyles,
  buttonStyles,
  modalStyles,
} from "./style/styles";
import { Address, IBooking } from "@/providers/booking-provider/context";
import { useBookingActions } from "@/providers/booking-provider";
import { useImageActions } from "@/providers/image-provider";

const { Text } = Typography;

const ClientMap = dynamic(
  () => import("@/components/client-components/client-map"),
  {
    ssr: false,
  }
);

const ClientDashboard: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [salon, setSalon] = useState("");
  const [quickReportModalVisible, setQuickReportModalVisible] = useState(false);
  const [fullReportModalVisible, setFullReportModalVisible] = useState(false);
  const [fullReport, setFullReport] = useState<IBooking[]>([]);
  const { createBooking } = useBookingActions();
  const { uploadImage } = useImageActions();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setPosition(coords);
        updateMemoryStorage(coords);
        reverseGeocode(coords[0], coords[1]);
      },
      () => {
        const defaultCoords: [number, number] = [-26.2041, 28.0473];
        setPosition(defaultCoords);
        updateMemoryStorage(defaultCoords);
        reverseGeocode(defaultCoords[0], defaultCoords[1]);
        message.error("Failed to retrieve your location. Using default.");
      }
    );
  }, []);

  const confirmQuickReport = () => {
    const addressPayload: Address = {
      city: sessionStorage.getItem("city") || "",
      province: sessionStorage.getItem("province") || "",
    };
    const payload: IBooking = {
      description: "Quick Report",
      status: "Submitted",
      latitude: position ? position[0] : 0,
      longitude: position ? position[1] : 0,
      bookingAddress: addressPayload,
      reportingUserId: parseInt(sessionStorage.getItem("userId") ?? "0"),
      salonName: sessionStorage.getItem("salon") || "",
      employeeTechnicianName: "Unallocated",
    };
    createBooking(payload);
    setQuickReportModalVisible(false);
    router.push("/client/bookings");
  };
  const updateMemoryStorage = (coords: [number, number]) => {
    sessionStorage.setItem("lat", coords[0].toString());
    sessionStorage.setItem("lng", coords[1].toString());
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      const addr = data.address || {};

      const newAddress = data.display_name || "";
      const newProvince = addr.state || "";
      const newCity = addr.city || addr.town || addr.village || "";
      const newSalon = addr.county || addr.salon || "";

      setAddress(newAddress);
      setProvince(newProvince);
      setCity(newCity);
      setSalon(newSalon);

      form.setFieldsValue({
        province: newProvince,
        city: newCity,
        salonId: newSalon,
      });

      sessionStorage.setItem("address", newAddress);
      sessionStorage.setItem("province", newProvince);
      sessionStorage.setItem("city", newCity);
      sessionStorage.setItem("salon", newSalon);
    } catch {
      setAddress("");
      setProvince("");
      setCity("");
      setSalon("");
      form.setFieldsValue({
        province: "",
        city: "",
        salonId: "",
      });
    }
  };

  const handleMarkerDragEnd = (coords: [number, number]) => {
    setPosition(coords);
    form.setFieldsValue({
      latitude: coords[0],
      longitude: coords[1],
    });
    updateMemoryStorage(coords);
    reverseGeocode(coords[0], coords[1]);
  };

  const handleQuickReport = () => setQuickReportModalVisible(true);

  const handleCreateBooking = () => {
    form.setFieldsValue({
      salonId: salon,
      latitude: position?.[0] || "",
      longitude: position?.[1] || "",
      city,
      province,
    });
    setFullReportModalVisible(true);
  };

  const handleAddFullReport = async () => {
    try {
      const values = await form.validateFields();

      const file = values.imageUrl?.[0]?.originFileObj;
      if (!file) {
        message.error("Please upload a pothole image.");
        return;
      }

      const imageUrl = await uploadImage(file);
      if (!imageUrl) {
        message.error("Failed to upload pothole image.");
        return;
      }

      const payload: IBooking = {
        description: values.description,
        status: "Submitted",
        imageUrl,
        latitude: values.latitude,
        longitude: values.longitude,
        bookingAddress: {
          city: values.city,
          province: values.province,
        },
        reportingUserId: parseInt(sessionStorage.getItem("userId") ?? "0"),
        salonName: sessionStorage.getItem("salon") || "",
        employeeTechnicianName: "Unallocated",
      };

      await createBooking(payload);

      setFullReport([...fullReport, payload]);
      message.success("Pothole report submitted successfully!");
      setFullReportModalVisible(false);
      form.resetFields();
      router.push("/client/bookings");
    } catch (error) {
      console.error("Submit error:", error);
      message.error("Something went wrong while submitting your report.");
    }
  };

  if (!position) {
    return (
      <Flex
        justify="center"
        align="center"
        style={dashboardStyles.loadingContainer}
      >
        <Card style={cardStyles.loadingCard}>
          <Spin size="large" />
          <div style={dashboardStyles.loadingText}>
            Loading your location...
          </div>
        </Card>
      </Flex>
    );
  }

  return (
    <div style={dashboardStyles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            title={
              <Space>
                <EnvironmentOutlined />
                Your Map Location
              </Space>
            }
            style={cardStyles.standard}
          >
            <ClientMap
              position={position}
              onMarkerDragEnd={handleMarkerDragEnd}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <EnvironmentOutlined />
                Current Location
              </Space>
            }
            style={cardStyles.standard}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Address">{address}</Descriptions.Item>
              <Descriptions.Item label="Coordinates">
                <Text code>
                  {position[0].toFixed(6)}, {position[1].toFixed(6)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Province">{province}</Descriptions.Item>
              <Descriptions.Item label="City">{city}</Descriptions.Item>
              <Descriptions.Item label="Salon">
                {salon}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <PlusOutlined />
                Actions
              </Space>
            }
            style={cardStyles.standard}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<ClockCircleOutlined />}
                  onClick={handleQuickReport}
                  style={buttonStyles.primary}
                >
                  Quick Report
                </Button>
                <Text
                  type="secondary"
                  style={dashboardStyles.buttonDescription}
                >
                  Submit a quick booking report
                </Text>
              </Col>

              <Col span={12}>
                <Button
                  type="default"
                  size="large"
                  block
                  icon={<FileTextOutlined />}
                  onClick={handleCreateBooking}
                  style={buttonStyles.secondary}
                >
                  Detailed Report
                </Button>
                <Text
                  type="secondary"
                  style={dashboardStyles.buttonDescription}
                >
                  Create a comprehensive report with details
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>

        {fullReport.length > 0 && (
          <Col span={24}>
            <Card title="Recent Reports" style={cardStyles.standard}>
              <Row gutter={[16, 16]}>
                {fullReport.map((report, index) => (
                  <Col xs={24} md={12} lg={8} key={index}>
                    <Card size="small" style={cardStyles.reportCard}>
                      <Text strong>{report.description}</Text>
                      <br />
                      <Text type="secondary">Status: {report.status}</Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        )}
      </Row>

      <Modal
        open={quickReportModalVisible}
        title={
          <Space>
            <ClockCircleOutlined />
            Confirm Quick Report
          </Space>
        }
        onCancel={() => setQuickReportModalVisible(false)}
        onOk={confirmQuickReport}
        okText="Yes, Create Report"
        cancelText="Cancel"
        centered
        style={modalStyles.standard}
      >
        <div style={modalStyles.content}>
          <Text>
            Are you sure you want to create a quick report for your current
            location?
          </Text>
          <Divider />
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Location">
              {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </Descriptions.Item>
            <Descriptions.Item label="Salon">
              {salon}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>

      {/* Full Report Modal */}
      <Modal
        title={
          <Space>
            <FileTextOutlined />
            Add Full Report
          </Space>
        }
        open={fullReportModalVisible}
        onCancel={() => setFullReportModalVisible(false)}
        footer={
          <Space>
            <Button onClick={() => setFullReportModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleAddFullReport}>
              Submit
            </Button>
          </Space>
        }
        width={900}
        centered
        style={modalStyles.large}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[24, 16]}>
            <Col xs={24} lg={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter report description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Describe the booking..."
                />
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
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item label="Adjust Your Location">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div style={modalStyles.mapContainer}>
                    <ClientMap
                      position={position}
                      onMarkerDragEnd={handleMarkerDragEnd}
                    />
                  </div>
                </Space>
              </Form.Item>

              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Form.Item name="latitude" label="Latitude">
                    <Input readOnly value={position[0]} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="longitude" label="Longitude">
                    <Input readOnly value={position[1]} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 8]}>
            <Col xs={24} md={8}>
              <Form.Item name="province" label="Province">
                <Input readOnly value={province} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="city" label="City">
                <Input readOnly value={city} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="salonId"
                label="Salon"
                rules={[
                  { required: true, message: "Salon is required" },
                ]}
              >
                <Input readOnly value={salon} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ClientDashboard;
