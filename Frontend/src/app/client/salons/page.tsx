"use client";

import React, { useState } from "react";
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Avatar, 
  Modal, 
  Typography,
} from "antd/es";
import { 
  AntDesignOutlined, 
  EyeOutlined,

} from "@ant-design/icons";
import { useStyles } from "./style/styles";
import SalonEmployees from "@/components/salon-components/salonEmployees";
import SalonServices from "@/components/salon-components/salonServices";

const { Title } = Typography;

// Sample salon data - replace with your actual data
const salonsData = [
  {
    id: 1,
    name: "Glamour Studio",
    description: "Premium beauty salon offering cutting-edge styling and treatments",
    location: "123 Beauty Street, Downtown",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    totalReviews: 124,
    openHours: "9:00 AM - 8:00 PM",
    services: ["Hair Styling", "Manicure", "Facial", "Massage"],
    bookingsCount: 45,
    avatar: null, // Will use default icon
  },
  {
    id: 2,
    name: "Elite Hair Lounge",
    description: "Modern hair salon specializing in contemporary cuts and color treatments",
    location: "456 Style Avenue, Midtown",
    phone: "+1 (555) 234-5678",
    rating: 4.6,
    totalReviews: 89,
    openHours: "10:00 AM - 7:00 PM",
    services: ["Hair Cut", "Hair Color", "Styling", "Treatment"],
    bookingsCount: 32,
    avatar: null,
  },
  {
    id: 3,
    name: "Luxury Spa & Salon",
    description: "Full-service spa and salon offering relaxation and beauty treatments",
    location: "789 Wellness Blvd, Uptown",
    phone: "+1 (555) 345-6789",
    rating: 4.9,
    totalReviews: 156,
    openHours: "8:00 AM - 9:00 PM",
    services: ["Spa Services", "Hair Care", "Skin Care", "Nail Care"],
    bookingsCount: 67,
    avatar: null,
  },
  {
    id: 4,
    name: "Trendy Cuts",
    description: "Affordable and stylish hair salon for the modern individual",
    location: "321 Fashion Lane, Suburbs",
    phone: "+1 (555) 456-7890",
    rating: 4.4,
    totalReviews: 78,
    openHours: "9:00 AM - 6:00 PM",
    services: ["Hair Cut", "Beard Trim", "Styling"],
    bookingsCount: 28,
    avatar: null,
  }
];

interface Salon {
  id: number;
  name: string;
  description: string;
  location: string;
  phone: string;
  rating: number;
  totalReviews: number;
  openHours: string;
  services: string[];
  bookingsCount: number;
  avatar: string | null;
}

const SalonPage = () => {
  const { styles } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  const handleViewSalon = (salon: Salon) => {
    setSelectedSalon(salon);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedSalon(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <Title level={2} className={styles.pageTitle}>
          Available Salons
        </Title>
      </div>

      <Row gutter={[24, 24]} className={styles.salonsGrid}>
        {salonsData.map((salon) => (
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
                </Button>
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

      {/* Salon Details Modal */}
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
          </Button>
        ]}
        width={800}
        className={styles.salonModal}
      >
        {selectedSalon && (
          <div className={styles.modalContent}>
            <h2>Salon Services</h2>
            <SalonEmployees/>
            <h2>Salon Employees</h2>
            <SalonServices/>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SalonPage;