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
  Card,
  Image,
  Row,
  Col,
} from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "../../app/client/bookings/style/styles";
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
  const [bookingMode, setBookingMode] = useState(false);
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
    setBookingMode(false);
    setSelectedEmployeeTechnician(employeeTechnician ?? null);
    setModalVisible(true);
  };

  const handleAssign = () => {
    setBookingMode(true);
  };

  const handleConfirmAssign = async () => {
    setLoading(true);
    try {
      if (!selectedBooking || !selectedEmployeeTechnician) return;

      const payload: IBooking = {
        ...selectedBooking,
        status: "Confirmed",
        employeeTechnicianName: selectedEmployeeTechnician?.name,
      };
      await updateBooking(payload);
      setModalVisible(false);
      message.success(`Booking Confirmed`);
      getBookingList();
    } catch (error) {
      console.error(error);
      message.error("Booking failed");
    }

    setLoading(false);
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
      message.success(`Marked booking ${selectedBooking.id} as Completed`);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "warning";
      case "Approved":
        return "success";
      case "Pending":
        return "processing";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const columns: ColumnsType<IBooking> = [
    {
      title: "Employee ",
      dataIndex: "employeeTechnicianName",
      key: "salonNemployeeTechnicianNameame",
      render: (srvP) => srvP || "-",
    },
    {
      title: "Service Requested",
      dataIndex: "service",
      key: "service",
      render: (srvP) => srvP || "-",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (srvP) => srvP || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Confirmed"
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
              bookingMode ? (
                <Space>
                  <Button onClick={() => setBookingMode(false)}>Back</Button>
                  <Button
                    type="primary"
                    disabled={!selectedEmployeeTechnician}
                    onClick={handleConfirmAssign}
                  >
                    Confirm Booking
                  </Button>
                </Space>
              ) : (
                <Space>
                  {selectedBooking?.status === "Assigned" && (
                    <Button type="primary" onClick={handleComplete}>
                      Mark as Completed
                    </Button>
                  )}
                  {selectedBooking?.status !== "Completed" && (
                    <Button onClick={handleAssign}>Confirm</Button>
                  )}
                  <Button onClick={handleCancel}>Close</Button>
                </Space>
              )
            }
            width={600}
            className={styles.modalBody}
          >
            {selectedBooking && !bookingMode && (
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
                          <UserOutlined className={styles.shopIcon} />
                          <Text strong>Name of Employee</Text>
                        </Space>
                        <Text className={styles.bookingHeaders}>
                          {selectedBooking.employeeTechnicianName ||
                            "Not confirmed"}
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
                          <ScissorOutlined className={styles.userIcon} />
                          <Text strong>Service Requested</Text>
                        </Space>
                        <Text className={styles.bookingHeaders}>
                          {selectedBooking.service || "Not assigned"}
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
                          {selectedBooking.date || "Not scheduled"}
                        </Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>

                <Card size="small" className={styles.statusCard}>
                  <Flex justify="space-between" align="center">
                    <Text strong>Booking Status:</Text>
                    <Tag
                      color={getStatusColor(selectedBooking.status)}
                      className={styles.tag}
                    >
                      {selectedBooking.status}
                    </Tag>
                  </Flex>
                </Card>
              </div>
            )}

            {bookingMode && (
              <>
                <p>Select an Employee to confirm Booking:</p>
                <Select
                  placeholder="Select Employee"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setSelectedEmployeeTechnician(
                      employeeTechnicians?.find((et) => et.id === value) || null
                    )
                  }
                  value={selectedEmployeeTechnician?.id}
                >
                  {employeeTechnicians?.map((emT) => (
                    <Option key={emT.id} value={emT.id}>
                      {emT.name}
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
