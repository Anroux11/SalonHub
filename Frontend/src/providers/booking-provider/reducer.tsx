import { handleActions } from "redux-actions";
import { INITIAL_STATE, IBookingStateContext } from "./context";
import { BookingActionEnums } from "./actions";

export const BookingReducer = handleActions<
  IBookingStateContext,
  IBookingStateContext
>(
  {
    [BookingActionEnums.getBookingListPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.getBookingListSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.getBookingListError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.getBookingPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.getBookingSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.getBookingError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.createBookingPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.createBookingSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.createBookingError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.updateBookingPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.updateBookingSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.updateBookingError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.deleteBookingPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.deleteBookingSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [BookingActionEnums.deleteBookingError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
