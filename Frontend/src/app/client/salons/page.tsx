"use client";

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Modal,
  Typography,
  Flex,
  Spin,
} from "antd/es";
import { AntDesignOutlined, EyeOutlined } from "@ant-design/icons";
import { useStyles } from "./style/styles";
import SalonEmployees from "@/components/salon-components/salonEmployees";
import SalonServices from "@/components/salon-components/salonServices";
import { useSalonActions, useSalonState } from "@/providers/salon-provider";
import { useEmployeeTechnicianActions } from "@/providers/employeeTechnician-provider";
import { useSalonServiceActions } from "@/providers/salonService-provider";
import { ISalon } from "@/providers/salon-provider/context";

const { Title } = Typography;

const SalonPage = () => {
  const { styles } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<ISalon | null>(null);
  const { getSalonList } = useSalonActions();
  const { getEmployeeTechnicianList } = useEmployeeTechnicianActions();
  const { getSalonServiceList } = useSalonServiceActions();
  const { salons } = useSalonState();
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    await getSalonList();
    await getEmployeeTechnicianList();
    await getSalonServiceList();
  };

  useEffect(() => {
    getSalonList();
    getEmployeeTechnicianList();
    getSalonServiceList();
    refresh();
  }, []);

  const handleViewSalon =  (salon: ISalon) => {
    sessionStorage.setItem("salon-name", salon.name);
    refresh();
    setLoading(true);
    setSelectedSalon(salon);
    setLoading(false);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedSalon(null);
  };

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
        <div className={styles.pageContainer}>
          <div className={styles.pageHeader}>
            <Title level={2} className={styles.pageTitle}>
              Available Salons
            </Title>
          </div>
          <Row gutter={[24, 24]} className={styles.salonsGrid}>
            {salons?.map((salon: ISalon) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={salon.id}>
                <Card
                  className={styles.salonCard}
                  hoverable
                  actions={[
                    <Button
                      key="view"
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => handleViewSalon(salon)}
                      className={styles.viewButton}
                    >
                      View Salon
                    </Button>,
                  ]}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.avatarSection}>
                      <Avatar
                        size={80}
                        icon={<AntDesignOutlined />}
                        className={styles.salonAvatar}
                      />
                    </div>

                    <div className={styles.salonInfo}>
                      <Title level={4} className={styles.salonName}>
                        {salon.name}
                      </Title>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          
          <Modal
            title={
              <div className={styles.modalHeader}>
                <Avatar
                  size={48}
                  icon={<AntDesignOutlined />}
                  className={styles.modalAvatar}
                />
                <div>
                  <Title level={3} className={styles.modalTitle}>
                    {selectedSalon?.name}
                  </Title>
                </div>
              </div>
            }
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={[
              <Button key="close" onClick={handleModalClose}>
                Close
              </Button>,
              <Button key="book" type="primary">
                Book Appointment
              </Button>,
            ]}
            width={800}
            className={styles.salonModal}
          >
            {selectedSalon && (
              <div className={styles.modalContent}>
                <h2>Salon Services</h2>
                <SalonServices />
                <h2>Salon Employees</h2>
                <SalonEmployees />
              </div>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default SalonPage;
