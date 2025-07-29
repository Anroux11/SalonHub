import { createContext } from "react";
import { Address } from "../booking-provider/context";
export interface IEmployeeTechnician {
    id?: string;
    name: string;
    email: string;
    address?: Address;
    buildingAddress?: Address;
    password: string;
    latitude: string;
    longitude: string;
    salonId?: string //might chnge
    salonName: string;
}

export interface IEmployeeTechnicianStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    employeeTechnician?: IEmployeeTechnician;
    employeeTechnicians?: IEmployeeTechnician[];
}

export interface IEmployeeTechnicianActionContext {
    getEmployeeTechnicianList: () => void;
    getEmployeeTechnician: (id: string) => void;
    createEmployeeTechnician: (employeeTechnician: IEmployeeTechnician) => void;
    updateEmployeeTechnician: (employeeTechnician: IEmployeeTechnician) => void;
    deleteEmployeeTechnician: (id: string) => void;
}

export const INITIAL_STATE: IEmployeeTechnicianStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const EmployeeTechnicianStateContext = createContext<IEmployeeTechnicianStateContext>(INITIAL_STATE);

export const EmployeeTechnicianActionContext = createContext<undefined | IEmployeeTechnicianActionContext>(undefined);