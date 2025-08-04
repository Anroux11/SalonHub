"use client";

import "./globals.css";
import AntdApp from "antd/es/app";
import { theme } from "antd/es";
import ConfigProvider from "antd/es/config-provider";
import {
  ClientRegisterProvider,
  CurrentUserProvider,
  UserLoginProvider,
} from "@/providers/auth-provider";
import { SalonRegisterProvider } from "@/providers/auth-provider";
import { EmployeeTechnicianProvider } from "@/providers/employeeTechnician-provider";
import { BookingProvider } from "@/providers/booking-provider";
import { ClientProvider } from "@/providers/client-provider";
import { ImageProvider } from "@/providers/image-provider";
import { SalonProvider } from "../providers/salon-provider/index";
import { SalonServiceProvider } from "@/providers/salonService-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkAlgorithm } = theme;
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FF9323",
            colorInfo: "#FF9323",
            colorTextBase: "#ffffff",
            colorBgBase: "#2a2a2cff",
            fontSize: 14,
            wireframe: false,
          },
          components: {
            Divider: {
              colorSplit: "#FF9323",
            },
            Menu: {
              colorPrimaryBorder: "#FF9323",
            },
            Calendar: {
              itemActiveBg: "rgb(104,109,118)",
            },
            Card: {
              colorBorderSecondary: "#FF9323",
            },
            Collapse: {
              colorBorder: "#FF9323",
            },
            List: {
              colorBorder: "#FF9323",
              colorSplit: "#FF9323",
            },
            Table: {
              colorPrimaryBorder: "#FF9323",
              colorSplit: "#FF9323",
            },
          },
          algorithm: darkAlgorithm,
        }}
      >
        <body
        // style={{ display: "inline-flex", width: "100vw", height: "100vh" }}
        >
          <SalonServiceProvider>
          <SalonProvider>
            <CurrentUserProvider>
              <ImageProvider>
                <ClientProvider>
                  <BookingProvider>
                    <EmployeeTechnicianProvider>
                      <SalonRegisterProvider>
                        <ClientRegisterProvider>
                          <UserLoginProvider>
                            <AntdApp>{children}</AntdApp>
                          </UserLoginProvider>
                        </ClientRegisterProvider>
                      </SalonRegisterProvider>
                    </EmployeeTechnicianProvider>
                  </BookingProvider>
                </ClientProvider>
              </ImageProvider>
              </CurrentUserProvider>
          </SalonProvider>
          </SalonServiceProvider>
        </body>
      </ConfigProvider>
    </html>
  );
}
