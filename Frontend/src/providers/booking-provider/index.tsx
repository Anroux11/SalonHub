'use client';
import { getAxiosInstance } from "../../utils/axiosInstance";
import {
  INITIAL_STATE,
  IBooking,
  BookingActionContext,
  BookingStateContext,
} from "./context";
import { BookingReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getBookingListSuccess,
  getBookingListPending,
  getBookingListError,
  getBookingPending,
  getBookingError,
  createBookingPending,
  createBookingSuccess,
  createBookingError,
  updateBookingError,
  updateBookingSuccess,
  updateBookingPending,
  deleteBookingPending,
  deleteBookingSuccess,
  deleteBookingError,
  getBookingSuccess,
} from "./actions";
import { useCurrentUserActions } from "../auth-provider";

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(BookingReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  const { currentUser } = useCurrentUserActions();

  const getBookingList = async () => {
    dispatch(getBookingListPending());
    const endpoint = `/services/app/Booking/GetAll`;
    await instance
      .get(endpoint)
      .then((response) => {
        currentUser();
        const userId = parseInt(sessionStorage.getItem("userId") || "");
        const salon = (sessionStorage.getItem("salonName") || "").toString();
        const filteredData = response.data.result.items
          .filter((booking: IBooking) =>
            booking.bookingUserId === userId ||
            booking.salonName === salon || booking.employeeTechnicianName === sessionStorage.getItem("employeeTechnicianName")
          )
          // .sort((a: IBooking, b: IBooking) =>
          //   new Date(b.bookingAddress?.creationTime ?? "").getTime() -
          //   new Date(a.bookingAddress?.creationTime ?? "").getTime()
          // )
          .map((booking: IBooking) => ({
            id: booking.id ?? "",
            status: booking.status ?? "",
            imageUrl: booking.imageUrl ?? "",
            salonName: booking.salonName ?? "",
            reportingUserId: booking.bookingUserId ?? 0,
            employeeTechnicianName: booking.employeeTechnicianName ?? "",
            date: booking.date ?? "",
            service: booking.service ?? "",
          }));
        dispatch(getBookingListSuccess(filteredData));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getBookingListError());
      });
  };

  const getBooking = async (id: string) => {
    dispatch(getBookingPending());
    const endpoint = `services/app/Booking/Get?Id=${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getBookingSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getBookingError());
      });
  };

  const createBooking = async (booking: IBooking) => {
    dispatch(createBookingPending());
    const endpoint = `/services/app/Booking/Create`;
    await instance
      .post(endpoint, booking)
      .then((response) => {
        dispatch(createBookingSuccess(response.data.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createBookingError());
      });
  };

  const updateBooking = async (booking: IBooking) => {
    dispatch(updateBookingPending());
    const endpoint = `services/app/Booking/Update`;
    await instance
      .put(endpoint, booking)
      .then((response) => {
        dispatch(updateBookingSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateBookingError());
      });
  };

  const deleteBooking = async (id: string) => {
    dispatch(deleteBookingPending());
    const endpoint = `services/app/Booking/Delete?Id=${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteBookingSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteBookingError());
      });
  };

  return (
    <BookingStateContext.Provider value={state}>
      <BookingActionContext.Provider
        value={{
          getBookingList,
          getBooking,
          createBooking,
          updateBooking,
          deleteBooking,
        }}
      >
        {children}
      </BookingActionContext.Provider>
    </BookingStateContext.Provider>
  );
};

export const useBookingState = () => {
  const context = useContext(BookingStateContext);
  if (!context) {
    throw new Error("useBookingState must be used within a BookingProvider");
  }
  return context;
};

export const useBookingActions = () => {
  const context = useContext(BookingActionContext);
  if (!context) {
    throw new Error(
      "useBookingActions must be used within a BookingProvider"
    );
  }
  return context;
};
