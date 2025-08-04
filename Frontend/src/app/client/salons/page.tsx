"use client";

// import bookings from "@/components/salon-components/bookings";
import { Row, Col, Card, Button, Avatar } from "antd/es";
import { useStyles } from "./style/styles";
import { AntDesignOutlined } from "@ant-design/icons";

const SalonPage = () => {
  const { styles } = useStyles();

  return (
    <div>
      <Row gutter={[15, 15]} className={styles.summaryRow}>
        <Col xs={24} sm={30} md={12}>
          <Card className={styles.summaryCard}>
            <h3>Salon Name</h3>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<AntDesignOutlined />}
              
            />
            {/* <p className="count">{bookings?.length || 0}</p> */}
            <Button
              color="primary"
              variant="filled"
              // onClick={handleSalon}
            >
              View Salon
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalonPage;
