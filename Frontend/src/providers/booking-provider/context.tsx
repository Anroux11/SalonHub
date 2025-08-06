import { createContext } from "react";
export interface IBooking {
  id?: string;
  date: string;
  service: string;
  status: string;
  imageUrl?: string;
  salonName: string;
  salonId?: string;
  bookingUserId?: number;
  employeeTechnicianId: string;
  employeeTechnicianName?: string;
  salonServiceId?: string;
  salonServiceName?: string;
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
  bookings: []
};

export const BookingStateContext =
  createContext<IBookingStateContext>(INITIAL_STATE);

export const BookingActionContext = createContext<
  undefined | IBookingActionContext
>(undefined);
