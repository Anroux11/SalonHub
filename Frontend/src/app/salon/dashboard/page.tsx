"use client";

import { Row, Col, Card, Button, Divider } from "antd/es";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/styles";
import { useBookingState, useBookingActions } from "@/providers/booking-provider";
import { useEmployeeTechnicianState, useEmployeeTechnicianActions } from "@/providers/employeeTechnician-provider";
import { useEffect } from "react";
import DashboardBookingList from "@/components/salon-components/dashboardBooking";

const EmployeeTechnicianPage = () => {
    const router = useRouter();
    const { styles } = useStyles();

    const { bookings } = useBookingState();
    const { getBookingList } = useBookingActions();

    const { employeeTechnicians } = useEmployeeTechnicianState();
    const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();


    useEffect(() => {
        getBookingList();
        getEmployeeTechnicianList();
    }, [""]);


    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={[20, 20]} className={styles.summaryRow}>
                <Col xs={24} sm={10} md={12}>
                    <Card className={styles.summaryCard}>
                        <h3>Bookings</h3>
                        <p className="count">{bookings?.length || 0}</p>
                        <p>Total Bookings</p>
                    </Card>
                </Col>
                <Col xs={24} sm={10} md={12}>
                    <Card className={styles.summaryCard}>
                        <h3>Service Providers</h3>
                        <p className="count">{employeeTechnicians?.length || 0}</p>
                        <p>Total Service Providers</p>
                    </Card>
                </Col>
            </Row>

            <Divider orientation="left">Quick Actions</Divider>
            <Row gutter={[16, 16]} className={styles.quickActionsRow}>
                <Col xs={24} sm={12}>
                    <Button
                        type="primary"
                        size="large"
                        block
                        className={styles.quickActionButton}
                        onClick={() => router.push("./bookings")}
                    >
                        View all Bookings
                    </Button>
                </Col>
                <Col xs={24} sm={12}>
                    <Button
                        type="dashed"
                        size="large"
                        block
                        className={styles.quickActionButton}
                        onClick={() => router.push("./employeeTechnician")}
                    >
                        View all Employees
                    </Button>
                </Col>
            </Row>

            <Divider orientation="left">Recent Bookings in Salon</Divider>
            <Card className={styles.bookingCard}>
                <DashboardBookingList bookings={bookings?.slice(0, 3) || []} />
            </Card>

        </div>
    );
};

export default EmployeeTechnicianPage;
