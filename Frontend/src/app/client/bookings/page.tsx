"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Tag,
  Flex,
  Spin,
  Image,
  Space,
  Typography,
  Card,
  Col,
  Row,
  Input,
} from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/styles";
import {
  useBookingActions,
  useBookingState,
} from "@/providers/booking-provider";
import { IBooking } from "@/providers/booking-provider/context";
import {
  CalendarOutlined,
  ScissorOutlined,
  ShopOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const BookingListPage: React.FC = () => {
  const { styles } = useStyles();
  const { bookings, isPending } = useBookingState();
  const { getBookingList } = useBookingActions();
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBookings, setFilteredBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    getBookingList();
  }, []);

  useEffect(() => {
    const bookingList = bookings ?? [];

    if (!searchQuery.trim()) {
      setFilteredBookings(bookingList);
    } else {
      const filtered = bookingList.filter((booking) =>
        booking.salonName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]);

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

  const handleView = (booking: IBooking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "warning";
      case "Confirmed":
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
      title: "Salon Name",
      dataIndex: "salonName",
      key: "salonName",
    },
    {
      title: "Name of Hairdresser",
      key: "employeeTechnicianName",
      render: (_, record) => record.employeeTechnicianName || "-",
    },
    {
      title: "Service Requested",
      dataIndex: "service",
      key: "service",
      render: (_, record) => record.service || "-",
    },
    {
      title: "Date and Time",
      dataIndex: "date",
      key: "date",
      render: (_, record) => formatBookingDate(record.date) || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Submitted"
            ? "yellow"
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
        <Button type="link" onClick={() => handleView(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      {isPending ? (
        <Flex
          justify="center"
          align="center"
          style={{ width: "100%", height: "100vh" }}
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <div className={styles.bookingContainer}>
          <div style={{ width: "100%", padding: "0 16px" }}>
            <Input.Search
              className={styles.searchInput}
              placeholder="Search bookings by salon name"
              allowClear
              enterButton
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredBookings}
            className={styles.bookingTable}
            rowKey="id"
            pagination={{ pageSize: 5 }}
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
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleCancel} type="primary">
                  Close
                </Button>
              </Flex>
            }
            width={600}
            className={styles.modalBody}
          >
            {selectedBooking && (
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
          </Modal>
        </div>
      )}
    </>
  );
};

export default BookingListPage;
