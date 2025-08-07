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
  Input,
} from "antd/es";
import { AntDesignOutlined, EyeOutlined } from "@ant-design/icons";
import { useStyles } from "./style/styles";
import SalonEmployees from "@/components/salon-components/salonEmployees";
import SalonServices from "@/components/salon-components/salonServices";
import { useSalonActions, useSalonState } from "@/providers/salon-provider";
import { useEmployeeTechnicianActions } from "@/providers/employeeTechnician-provider";
import {
  useSalonServiceActions,
  useSalonServiceState,
} from "@/providers/salonService-provider";
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
  const { salonServices } = useSalonServiceState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSalons, setFilteredSalons] = useState<ISalon[]>([]);

  const loadSalonData = async () => {
    await getEmployeeTechnicianList();
    await getSalonServiceList();
  };

  useEffect(() => {
    getSalonList();
  }, [""]);

  useEffect(() => {
    const salonList = salons ?? [];

    if (!searchQuery) {
      setFilteredSalons(salonList);
    } else {
      const filtered = salonList.filter((salon) =>
        salon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSalons(filtered);
    }
  }, [searchQuery, salons]);

  const handleViewSalon = (salon: ISalon) => {
    sessionStorage.setItem("salon-name", salon.name);
    loadSalonData();
    setSelectedSalon(salon);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedSalon(null);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <Title level={2} className={styles.pageTitle}>
            Available Salons
          </Title>
        </div>
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
        <Row gutter={[24, 24]} className={styles.salonsGrid}>
          {filteredSalons?.map((salon: ISalon) => (
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
          ]}
          width={800}
          className={styles.salonModal}
        >
          {selectedSalon && (
            <div className={styles.modalContent}>
              <h2>Salon Services</h2>
              {salonServices && <SalonServices />}
              <h2>Salon Employees</h2>
              <SalonEmployees />
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default SalonPage;
