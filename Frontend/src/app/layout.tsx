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
            colorPrimary: "#00e1e4",
            colorInfo: "#00e1e4",
            colorTextBase: "#ffffff",
            colorBgBase: "#212428",
            fontSize: 14,
            wireframe: false,
          },
          components: {
            Divider: {
              colorSplit: "#00e1e4",
            },
            Menu: {
              colorPrimaryBorder: "#00e1e4",
            },
            Calendar: {
              itemActiveBg: "rgb(104,109,118)",
            },
            Card: {
              colorBorderSecondary: "#00e1e4",
            },
            Collapse: {
              colorBorder: "#00e1e4",
            },
            List: {
              colorBorder: "#00e1e4",
              colorSplit: "#00e1e4",
            },
            Table: {
              colorPrimaryBorder: "#00e1e4",
              colorSplit: "#00e1e4",
            },
          },
          algorithm: darkAlgorithm,
        }}
      >
        <body
        // style={{ display: "inline-flex", width: "100vw", height: "100vh" }}
        >
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
        </body>
      </ConfigProvider>
    </html>
  );
}
