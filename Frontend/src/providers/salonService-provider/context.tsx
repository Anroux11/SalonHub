import { createContext } from "react";
export interface ISalonService {
    id?: string;
    name: string;
    description: string;
    price: string;
    salonId?: string //might chnge
    salonName: string;
}

export interface ISalonServiceStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    salonService?: ISalonService;
    salonServices?: ISalonService[];
}

export interface ISalonServiceActionContext {
    getSalonServiceList: () => void;
    getSalonService: (id: string) => void;
    createSalonService: (salonService: ISalonService) => void;
    updateSalonService: (salonService: ISalonService) => void;
    deleteSalonService: (id: string) => void;
}

export const INITIAL_STATE: ISalonServiceStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const SalonServiceStateContext = createContext<ISalonServiceStateContext>(INITIAL_STATE);

export const SalonServiceActionContext = createContext<undefined | ISalonServiceActionContext>(undefined);