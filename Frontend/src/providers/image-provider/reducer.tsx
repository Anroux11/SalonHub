import { handleActions } from "redux-actions";
import { INITIAL_STATE, IImageStateContext } from "./context";
import { ImageActionEnums } from "./actions";

export const ImageReducer = handleActions<
  IImageStateContext,
  IImageStateContext
>(
  {
    [ImageActionEnums.uploadImagePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ImageActionEnums.uploadImageSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ImageActionEnums.uploadImageError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    // [BookingActionEnums.getBookingPending]: (state, action) => ({
    //   ...state,
    //   ...action.payload,
    // }),
    // [BookingActionEnums.getBookingSuccess]: (state, action) => ({
    //   ...state,
    //   ...action.payload,
    // }),
    // [BookingActionEnums.getBookingError]: (state, action) => ({
    //   ...state,
    //   ...action.payload,
    // }),
    // [BookingActionEnums.updateBookingPending]: (state, action) => ({
    //   ...state,
    //   ...action.payload,
    // }),
    // [BookingActionEnums.updateBookingSuccess]: (state, action) => ({
    //   ...state,
    //   ...action.payload,
    // }),
    // [BookingActionEnums.updateBookingError]: (state, action) => ({
    //   ...state,
    //   ...action.payload,
    // }),
  },
  INITIAL_STATE
);
