"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Select,
  Space,
  Tag,
  message,
  Flex,
  Spin,
  Typography,
  Image,
  Card,
  Col,
  Row,
} from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/styles";
import {
  useBookingActions,
  useBookingState,
} from "@/providers/booking-provider";
import { IBooking } from "@/providers/booking-provider/context";
import { IEmployeeTechnician } from "@/providers/employeeTechnician-provider/context";
import {
  useEmployeeTechnicianActions,
  useEmployeeTechnicianState,
} from "@/providers/employeeTechnician-provider";
import "@ant-design/v5-patch-for-react-19";
import {
  CalendarOutlined,
  ScissorOutlined,
  ShopOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

const BookingList = ({
  bookings: passedBookings,
}: {
  bookings?: IBooking[];
}) => {
  const { styles } = useStyles();
  const { bookings: contextBookings } = useBookingState();
  const bookings = passedBookings ?? contextBookings;
  const { getBookingList, updateBooking } = useBookingActions();

  const { employeeTechnicians } = useEmployeeTechnicianState();
  const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const [selectedEmployeeTechnician, setSelectedEmployeeTechnician] =
    useState<IEmployeeTechnician | null>(null);
  const [assignMode, setAssignMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookingList();
    getEmployeeTechnicianList();
  }, [BookingList]);

  const handleView = (
    booking: IBooking,
    employeeTechnician?: IEmployeeTechnician
  ) => {
    setSelectedBooking(booking);
    setAssignMode(false);
    setSelectedEmployeeTechnician(employeeTechnician ?? null);
    setModalVisible(true);
  };

  const formatBookingDate = (date: string) => {
    if (!date) return "-";

    const _date = new Date(date);

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(_date);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      if (!selectedBooking) return;

      const payload: IBooking = {
        ...selectedBooking,
        status: "Completed",
      };

      await updateBooking(payload);
      setModalVisible(false);
      message.success(`Marked booking as Completed`);
      getBookingList();
    } catch (error) {
      console.error(error);
      message.error("Completing Booking failed");
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const columns: ColumnsType<IBooking> = [
    {
      title: "Service Requested",
      dataIndex: "service",
      key: "service",
      render: (salon) => salon || "-",
    },
    {
      title: "Date and Time",
      dataIndex: "date",
      key: "date",
      render: (salon) => formatBookingDate(salon) || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Submitted"
            ? "green"
            : status === "Completed"
            ? "blue"
            : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() =>
            handleView(
              record,
              employeeTechnicians?.find(
                (sp) => sp.name === record.employeeTechnicianName
              )
            )
          }
        >
          View
        </Button>
      ),
    },
  ];

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
        <div className={styles.bookingContainer}>
          <Table
            columns={columns}
            dataSource={bookings}
            className={styles.bookingTable}
            pagination={{ pageSize: 5 }}
            rowKey="id"
            scroll={{ x: "max-content" }}
          />

          <Modal
            title={
              <Space>
                <CalendarOutlined />
                <Text strong style={{ fontSize: "18px" }}>
                  Booking Details
                </Text>
              </Space>
            }
            open={modalVisible}
            onCancel={handleCancel}
            footer={
              <Flex justify="end" gap="small">
                {selectedBooking?.status === "Confirmed" && (
                  <Button type="primary" onClick={handleComplete}>
                    Mark as Completed
                  </Button>
                )}
                <Button onClick={handleCancel}>Close</Button>
              </Flex>
            }
          >
            {selectedBooking && !assignMode && (
              <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                {selectedBooking.imageUrl && (
                  <Card className={styles.cardBody}>
                    <Image
                      width="100%"
                      className={styles.image}
                      src={selectedBooking.imageUrl}
                      alt="Booking Reference"
                      preview={{
                        mask: "Click to preview",
                      }}
                    />
                  </Card>
                )}
                <Card
                  title={
                    <Space>
                      <TagOutlined />
                      <Text strong className={styles.bookingContainerTitle}>
                        Booking Information
                      </Text>
                    </Space>
                  }
                  className={styles.bookingCard}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Space>
                          <ShopOutlined className={styles.shopIcon} />
                          <Text strong>Salon Name</Text>
                        </Space>
                        <Text className={styles.bookingHeaders}>
                          {selectedBooking.salonName}
                        </Text>
                      </Space>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Space>
                          <UserOutlined className={styles.userIcon} />
                          <Text strong>Hairdresser</Text>
                        </Space>
                        <Text className={styles.bookingHeaders}>
                          {selectedBooking.employeeTechnicianName ||
                            "Not assigned"}
                        </Text>
                      </Space>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Space>
                          <ScissorOutlined className={styles.scissorIcon} />
                          <Text strong>Service</Text>
                        </Space>
                        <Text className={styles.bookingHeaders}>
                          {selectedBooking.service || "Not specified"}
                        </Text>
                      </Space>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Space>
                          <CalendarOutlined className={styles.calenderIcon} />
                          <Text strong>Date & Time</Text>
                        </Space>
                        <Text className={styles.bookingHeaders}>
                          {formatBookingDate(selectedBooking.date)}
                        </Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>

                <Card size="small" className={styles.statusCard}>
                  <Flex justify="space-between" align="center">
                    <Text strong>Booking Status:</Text>
                    <Tag color={selectedBooking.status} className={styles.tag}>
                      {selectedBooking.status}
                    </Tag>
                  </Flex>
                </Card>
              </div>
            )}

            {assignMode && (
              <>
                <p>Select a Employee to confirm this booking:</p>
                <Select
                  placeholder="Select Service Provider"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setSelectedEmployeeTechnician(
                      employeeTechnicians?.find((sp) => sp.id === value) || null
                    )
                  }
                  value={selectedEmployeeTechnician?.id}
                >
                  {employeeTechnicians?.map((srvP) => (
                    <Option key={srvP.id} value={srvP.id}>
                      {srvP.name}
                    </Option>
                  ))}
                </Select>
              </>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default BookingList;
