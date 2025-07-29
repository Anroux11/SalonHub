import { createContext } from "react";
export interface IBooking {
  id?: string;
  description?: string;
  status: string;
  imageUrl?: string;
  bookingAddress?: Address;
  latitude: number;
  longitude: number;
  salonName?: string;
  reportingUserId?: number;
  employeeTechnicianName?: string; 
}
export interface Address {
  province: string;
  city: string;
  creationTime?: string;
  isDeleted?: boolean;
}

export interface IBookingStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  booking?: IBooking;
  bookings?: IBooking[];
}
export interface IBookingActionContext {
  getBookingList: () => void;
  getBooking: (id: string) => void;
  createBooking: (booking: IBooking) => void;
  updateBooking: (booking: IBooking) => void;
  deleteBooking: (id: string) => void;
}

export const INITIAL_STATE: IBookingStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const BookingStateContext =
  createContext<IBookingStateContext>(INITIAL_STATE);

export const BookingActionContext = createContext<
  undefined | IBookingActionContext
>(undefined);
