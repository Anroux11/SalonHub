import { createAction } from "redux-actions";
import { IBooking, IBookingStateContext } from "./context";

export enum BookingActionEnums {
  getBookingListPending = "GET_BOOKING_LIST_PENDING",
  getBookingListSuccess = "GET_BOOKINGS_LIST_SUCCESS",
  getBookingListError = "GET_BOOKINGS_LIST_ERROR",

  getBookingPending = "GET_BOOKING_PENDING",
  getBookingSuccess = "GET_BOOKING_SUCCESS",
  getBookingError = "GET_BOOKING_ERROR",

  createBookingPending = "CREATE_BOOKING_PENDING",
  createBookingSuccess = "CREATE_BOOKING_SUCCESS",
  createBookingError = "CREATE_BOOKING_ERROR",

  updateBookingPending = "UPDATE_BOOKING_PENDING",
  updateBookingSuccess = "UPDATE_BOOKING_SUCCESS",
  updateBookingError = "UPDATE_BOOKING_ERROR",

  deleteBookingPending = "DELETE_BOOKING_PENDING",
  deleteBookingSuccess = "DELETE_BOOKING_SUCCESS",
  deleteBookingError = "DELETE_BOOKING_ERROR",
}

export const getBookingListPending = createAction<IBookingStateContext>(
  BookingActionEnums.getBookingListPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getBookingListSuccess = createAction<
  IBookingStateContext, 
  IBooking[] 
>(
  BookingActionEnums.getBookingListSuccess,
  (bookings: IBooking[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    bookings, 
  })
);

export const getBookingListError = createAction<IBookingStateContext>(
  BookingActionEnums.getBookingListError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getBookingPending = createAction<IBookingStateContext>(
  BookingActionEnums.getBookingPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getBookingSuccess = createAction<
  IBookingStateContext,
  IBooking
>(BookingActionEnums.getBookingSuccess, (booking: IBooking) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  booking,
}));

export const getBookingError = createAction<IBookingStateContext>(
  BookingActionEnums.getBookingError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createBookingPending = createAction<IBookingStateContext>(
  BookingActionEnums.createBookingPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createBookingSuccess = createAction<
  IBookingStateContext,
  IBooking
>(BookingActionEnums.createBookingSuccess, (booking: IBooking) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  booking,
}));

export const createBookingError = createAction<IBookingStateContext>(
  BookingActionEnums.createBookingError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateBookingPending = createAction<IBookingStateContext>(
  BookingActionEnums.updateBookingPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateBookingSuccess = createAction<
  IBookingStateContext,
  IBooking
>(BookingActionEnums.updateBookingSuccess, (booking: IBooking) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  booking,
}));

export const updateBookingError = createAction<IBookingStateContext>(
  BookingActionEnums.updateBookingError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteBookingPending = createAction<IBookingStateContext>(
  BookingActionEnums.deleteBookingPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteBookingSuccess = createAction<
  IBookingStateContext,
  IBooking
>(BookingActionEnums.deleteBookingSuccess, (booking: IBooking) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  booking,
}));

export const deleteBookingError = createAction<IBookingStateContext>(
  BookingActionEnums.deleteBookingError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

