'use client';

import "@ant-design/v5-patch-for-react-19";
import Button from "antd/es/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/styles";
import { ArrowRightOutlined } from "@ant-design/icons";

const Home: React.FC = () => {
  const router = useRouter();
  const { styles } = useStyles();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.logo}>
          <Image src="/AppLogo-Big.png" alt="SalonHub Logo" width={500} height={500} />
        </div>
        <h1 className={styles.heading}>Welcome to SalonHub</h1>
        <h2 className={styles.sinceText}>New Here?</h2>

        <Button
          type="primary"
          className={styles.orangeButton}
          size="large"
          onClick={() => router.push("/register")}
        >
          Get Started <ArrowRightOutlined />
        </Button>
        <div className={styles.smallText}>Already have an account?</div>
        <Button
          type="default"
          className={styles.button}
          size="large"
          onClick={() => router.push("/login")}
        >
          Login <ArrowRightOutlined />
        </Button>
      </div>
    </>
  )
}

export default Home;