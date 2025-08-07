"use client";

import { useEffect } from "react";
import { Table, Tag } from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "../../app/salon/bookings/style/styles";
import {
  useBookingActions,
  useBookingState,
} from "@/providers/booking-provider";
import { IBooking } from "@/providers/booking-provider/context";
import { useEmployeeTechnicianActions } from "@/providers/employeeTechnician-provider";
import "@ant-design/v5-patch-for-react-19";

const DashboardBookingList = ({
  bookings: passedBookings,
}: {
  bookings?: IBooking[];
}) => {
  const { styles } = useStyles();
  const { bookings: contextBookings } = useBookingState();
  const bookings = passedBookings ?? contextBookings;
  const { getBookingList } = useBookingActions();
  const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();

  useEffect(() => {
    getBookingList();
    getEmployeeTechnicianList();
  }, [DashboardBookingList]);

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

  const columns: ColumnsType<IBooking> = [
    {
      title: "Salon Name",
      dataIndex: "salonName",
      key: "salonName",
    },

    {
      title: "Name of Hairdresser",
      dataIndex: "employeeTechnicianName",
      key: "employeeTechnician",
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
      render: (srvP) => formatBookingDate(srvP) || "-",
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
  ];

  return (
    <>
      <div className={styles.bookingContainer}>
        <Table
          columns={columns}
          dataSource={bookings}
          className={styles.bookingTable}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
};

export default DashboardBookingList;
