"use client";

import { useEffect, useState } from "react";
import { Table } from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "../../app/salon/bookings/style/styles";
import "@ant-design/v5-patch-for-react-19";
import { ISalonService } from "@/providers/salonService-provider/context";
import { useSalonServiceActions, useSalonServiceState } from "@/providers/salonService-provider";



const SalonServices = ({}: { salonServices?: ISalonService[] }) => {
  const { styles } = useStyles();
  const { salonServices } = useSalonServiceState();
  // const salonServices = passedSalonServices ?? contextSalonServices;
  // const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();
  const { getSalonServiceList } = useSalonServiceActions();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // getBookingList();
    // getEmployeeTechnicianList();
    getSalonServiceList();
    setLoading(false);
  }, [""]);

  useEffect(() => {
    // getBookingList();
    // getEmployeeTechnicianList();
    // getSalonServiceList();
  }, [salonServices]);

  const columns: ColumnsType<ISalonService> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => record.name || "-",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => record.description  || "-",
    },
    
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => record.price || "-",
    },

  ];

  return (
    <>
        <div className={styles.bookingContainer}>
          <Table
            columns={columns}
            dataSource={salonServices}
            className={styles.bookingTable}
            pagination={{ pageSize: 3 }}
            rowKey="id"
            scroll={{x: "max-content"}}
            loading={!salonServices || loading }
          />
        </div>
    </>
  );
};

export default SalonServices
