"use client";

import { useEffect, useState } from "react";
import { Table, Button, Modal, Select, Space, Tag, message, Flex, Spin } from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "../../app/salon/bookings/style/styles";
import {
  useBookingActions,
  useBookingState,
} from "@/providers/booking-provider";
import { IBooking } from "@/providers/booking-provider/context";
import { IEmployeeTechnician } from "@/providers/employeeTechnician-provider/context";
import { useEmployeeTechnicianActions, useEmployeeTechnicianState } from "@/providers/employeeTechnician-provider";
import "@ant-design/v5-patch-for-react-19";

const { Option } = Select;

const BookingList = ({ bookings: passedBookings }: { bookings?: IBooking[] }) => {
  const { styles } = useStyles();
  const { bookings: contextBookings } = useBookingState();
  const bookings = passedBookings ?? contextBookings;
  const { getBookingList, updateBooking } = useBookingActions();

  const { employeeTechnicians } = useEmployeeTechnicianState();
  const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(
    null
  );

  const [selectedEmployeeTechnician, setSelectedEmployeeTechnician] = useState<IEmployeeTechnician | null>(
    null
  )
  const [assignMode, setAssignMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookingList();
    getEmployeeTechnicianList();
  }, [BookingList]);


  const handleView = (booking: IBooking, employeeTechnician?: IEmployeeTechnician) => {
    setSelectedBooking(booking);
    setAssignMode(false);
    setSelectedEmployeeTechnician(employeeTechnician ?? null);
    setModalVisible(true);
  };

  // const handleAssign = () => {
  //   setAssignMode(true);
  // };

  // const handleConfirmAssign = async () => {
  //   setLoading(true);
  //   try {
  //     if (!selectedBooking || !selectedEmployeeTechnician) return;

  //     const payload: IBooking = {
  //       ...selectedBooking,
  //       status: "Assigned",
  //       employeeTechnicianName: selectedEmployeeTechnician?.name,
  //     }
  //     await updateBooking(payload);
  //     setModalVisible(false);
  //     message.success(`Assigned to ${selectedEmployeeTechnician.name}`);
  //     getBookingList();
  //   } catch (error) {

  //     console.error(error);
  //     message.error("Assigning Booking failed");
  //   }

  //   setLoading(false);
  // };

  const handleComplete = async () => {
    setLoading(true);
    try {
      if (!selectedBooking) return;

      const payload: IBooking = {
        ...selectedBooking,
        status: "Completed",
      }

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
      render: (salon) => salon || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Submitted" ? "green" : status === "Completed" ? "blue" : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleView(record, employeeTechnicians?.find(sp => sp.name === record.employeeTechnicianName))}>
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
            pagination={{ pageSize: 6 }}
            rowKey="id"
            scroll={{x: "max-content"}}
          />

          <Modal
            title="Booking Details"
            open={modalVisible}
            onCancel={handleCancel}
            footer={
                <Space>
                  {selectedBooking?.status === "Submitted" && (
                    <Button type="primary" onClick={handleComplete}>
                      Mark as Completed
                    </Button>
                  )}
                  <Button onClick={handleCancel}>Close</Button>
                </Space>
            }
          >
            {selectedBooking && !assignMode && (
              <>
                <p>
                  {selectedBooking.imageUrl && (
                    <div style={{ marginTop: 16 }}>
                      <img
                        src={selectedBooking.imageUrl}
                        alt="Booking"
                        width={200}
                        style={{ borderRadius: 8, objectFit: "cover" }}
                      />
                    </div>
                  )}

                </p>
                <p><strong>Service Requested:</strong> {selectedBooking.service}</p>
                <p><strong>Date:</strong> {selectedBooking.date}</p>
                <p><strong>Salon Name:</strong> {selectedBooking.salonName || "-"}</p>
                <p><strong>Status:</strong> {selectedBooking.status}</p>
              </>
            )}

            {assignMode && (
              <>
                <p>Select a Service Provider to assign this booking:</p>
                <Select
                  placeholder="Select Service Provider"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setSelectedEmployeeTechnician(employeeTechnicians?.find((sp) => sp.id === value) || null)
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
