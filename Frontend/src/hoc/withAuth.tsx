'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

interface WithAuthProps {
    allowedRoles?: string[];
}

const withAuth = <P extends object> (
    WrappedComponent: React.ComponentType<P>,
    {allowedRoles = [] } : WithAuthProps = {}
) : React.FC<P> => {
    const ComponentWithAuth: React.FC<P> = (props) => {
        const router = useRouter();
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            const token = sessionStorage.getItem("token");
            const userRole = sessionStorage.getItem("role");

            if (!token) {
                router.push("/login");
                return;
            }

            if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || "")) {
                if (userRole === "Admin") {
                    sessionStorage.clear();
                    router.push("/admin/dashboard");
                } else if (userRole === "Salon") {
                    sessionStorage.clear();
                    router.push("/salon/dashboard");
                } else if (userRole === "Client") {
                    sessionStorage.clear();
                    router.push("/client/dashboard");
                } else if (userRole === "EmployeeTechnician") {
                    sessionStorage.clear();
                    router.push("/employeeTechnician/dashboard");
                } else {
                    message.error("Login failed. Please check your credentials.");
                }
                return;
            }

            setIsAuthorized(true);
        }, [router]);

        return isAuthorized ? <WrappedComponent {...props} /> : null;
    };

    ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return ComponentWithAuth;
};

export default withAuth;
