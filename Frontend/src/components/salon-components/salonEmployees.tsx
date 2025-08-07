"use client";

import { useEffect, useState } from "react";
import { Table } from "antd/es";
import type { ColumnsType } from "antd/es/table";
import { useStyles } from "../../app/salon/bookings/style/styles";
import {
  useBookingActions,
} from "@/providers/booking-provider";
import { useEmployeeTechnicianActions, useEmployeeTechnicianState } from "@/providers/employeeTechnician-provider";
import "@ant-design/v5-patch-for-react-19";
import { IEmployeeTechnician } from "@/providers/employeeTechnician-provider/context";

const SalonEmployees = ({}: { employeeTechnicians?: IEmployeeTechnician[] }) => {
  const { styles } = useStyles();
  // const { employeeTechnicians: contextEmployeeTechnicians } = useEmployeeTechnicianState();
  // const employeeTechnicians = passedEmployees ?? contextEmployeeTechnicians;
  const { employeeTechnicians } = useEmployeeTechnicianState();
  const { getBookingList } = useBookingActions();
  const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();
  const [loading, setLoading] = useState(false);
  // const { getSalonServiceList } = useSalonServiceActions();

  useEffect(() => {
    setLoading(true);
    getBookingList();
    getEmployeeTechnicianList();
    setLoading(false);
    // getSalonServiceList();
  }, [""]);
  
  useEffect(() => {
    // getBookingList();
    // getEmployeeTechnicianList();
    // getSalonServiceList();
  }, [employeeTechnicians]);

  const columns: ColumnsType<IEmployeeTechnician> = [
    {
      title: "Name of Hairdresser/Technician",
      dataIndex: "name",
      key: "name",
      render: (_, record) => record.name || "-",
    },
    
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      render: (_, record) => record.jobTitle || "-",
    },

  ];

  return (
    <>
        <div className={styles.bookingContainer}>
          <Table
            columns={columns}
            dataSource={employeeTechnicians}
            className={styles.bookingTable}
            pagination={{ pageSize: 5 }}
            rowKey="id"
            scroll={{x: "max-content"}}
            loading={!employeeTechnicians || loading}
          />
        </div>
    </>
  );
};

export default SalonEmployees;
