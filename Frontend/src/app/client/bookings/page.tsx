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

const BookingListPage = () => {
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "City",
      key: "city",
      render: (_, record) => record.bookingAddress?.city || "-",
    },
    {
      title: "Province",
      key: "province",
      render: (_, record) => record.bookingAddress?.province || "-",
    },
    {
      title: "Salon",
      key: "salon",
      render: (_, record) => record.salonName || "-",
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
          <Table
            columns={columns}
            dataSource={bookings}
            className={styles.bookingTable}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />

          <Modal
            title={selectedBooking ? `Reference No: ${selectedBooking.id}` : ""}
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
                    />
                  )}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedBooking.description}
                </p>
                <p>
                  <strong>Status:</strong> {selectedBooking.status}
                </p>
                <p>
                  <strong>City:</strong>{" "}
                  {selectedBooking.bookingAddress?.city || "-"}
                </p>
                <p>
                  <strong>Province:</strong>{" "}
                  {selectedBooking.bookingAddress?.province || "-"}
                </p>
                <p>
                  <strong>Salon:</strong>{" "}
                  {selectedBooking.salonName || "-"}
                </p>
              </>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default BookingListPage;
