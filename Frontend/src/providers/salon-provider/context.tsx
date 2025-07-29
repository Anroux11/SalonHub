import { createContext } from "react";
import { Address } from "../booking-provider/context";
export interface ISalon {
  id: string;
  name: string;
  buildingAddress: Address[];
  latitude: string;
  longitude: string;
}
export interface ISalonStateContext {
  isPending: boolean; 
  isSuccess: boolean; 
  isError: boolean;
  salon?: ISalon;
  salons? : ISalon[];
}
export interface ISalonActionContext {
  getSalonList: () => void;
  getSalon: (id: string) => void; 
  createSalon: (salon: ISalon) => void; 
  updateSalon: (salon: ISalon) => void; 
  deleteSalon: (id: string) => void; 
}

export const INITIAL_STATE: ISalonStateContext = {
  isPending: false, 
  isSuccess: false, 
  isError: false, 
};

export const SalonStateContext =
  createContext<ISalonStateContext>(INITIAL_STATE);

export const SalonActionContext = createContext<
  undefined | ISalonActionContext
>(undefined);
