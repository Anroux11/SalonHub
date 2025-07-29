import { handleActions } from "redux-actions";
import { INITIAL_STATE, ISalonStateContext } from "./context";
import { SalonActionEnums } from "./actions";

export const SalonReducer = handleActions<
  ISalonStateContext,
  ISalonStateContext
>(
  {
    [SalonActionEnums.getSalonListPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.getSalonListSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.getSalonListError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.getSalonPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.getSalonSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.getSalonError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.createSalonPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.createSalonSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.createSalonError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.updateSalonPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.updateSalonSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.updateSalonError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.deleteSalonPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.deleteSalonSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [SalonActionEnums.deleteSalonError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
