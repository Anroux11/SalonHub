"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Tag,
  Flex,
  Spin,
  Image
} from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "./style/styles";
import {
  useBookingActions,
  useBookingState,
} from "@/providers/booking-provider";
import { IBooking } from "@/providers/booking-provider/context";
import { Divider } from 'antd/es';

const BookingListPage: React.FC = () => {
  const { styles } = useStyles();
  const { bookings, isPending } = useBookingState();
  const { getBookingList } = useBookingActions();

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getBookingList();
  }, []);

  const handleView = (booking: IBooking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
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
      render: (_, record) => record.date || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Submitted"
            ? "yellow"
            : status === "Approved"
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
          <Table
            columns={columns}
            dataSource={bookings}
            className={styles.bookingTable}
            rowKey="id"
            pagination={{ pageSize: 5 }}
             scroll={{x: "max-content"}}
          />

          <Modal
            title="Booking Details"
            open={modalVisible}
            onCancel={handleCancel}
            footer={
              <Button onClick={handleCancel} type="primary">
                Close
              </Button>
            }
          >
            {selectedBooking && (
              <>
                <p>
                  {selectedBooking.imageUrl && (
                    <Image
                      width={200}
                      src={selectedBooking.imageUrl}
                      alt="Booking Image"
                    />
                  )}
                </p>
                <p>
                  <strong>Salon Name:</strong>{" "}
                  {selectedBooking.salonName}
                </p>
                <p>
                  <strong>Name of Hairdresser:</strong>{" "}
                  {selectedBooking.employeeTechnicianName || "-"}
                </p>
                <p>
                  <strong>Service Requested:</strong>{" "}
                  {selectedBooking.service || "-"}
                </p>
                <p>
                  <strong>Date and Time:</strong> {selectedBooking.date || "-"}
                  </p>
                <p>
                  <strong>Status:</strong> {selectedBooking.status}
                </p>
                <Divider />
              </>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default BookingListPage;
