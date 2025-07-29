import { handleActions } from "redux-actions";
import {
  IClientRegisterStateContext,
  ICurrentUserStateContext,
  INITIAL_STATE_CLIENT,
  INITIAL_STATE_CURRENT,
  INITIAL_STATE_SALON,
  INITIAL_STATE_USER,
  ISalonRegisterStateContext,
  IUserLoginStateContext,
} from "./context";
import {
  SalonRegisterActionEnums,
  ClientRegisterActionEnum,
  UserLoginActionEnum,
  CurrentUserActionEnum,
} from "./actions";

export const RegisterSalonReducer =
  handleActions<ISalonRegisterStateContext>(
    {
      [SalonRegisterActionEnums.getRegisterSalonPending]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [SalonRegisterActionEnums.getRegisterSalonSuccess]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [SalonRegisterActionEnums.getRegisterSalonError]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
    },
    INITIAL_STATE_SALON
  );

export const RegisterClientReducer = handleActions<IClientRegisterStateContext>(
  {
    [ClientRegisterActionEnum.getRegisterClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientRegisterActionEnum.getRegisterClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientRegisterActionEnum.getRegisterClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE_CLIENT
);

export const UserLoginReducer = handleActions<IUserLoginStateContext>(
  {
    [UserLoginActionEnum.getUserLoginPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [UserLoginActionEnum.getUserLoginSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [UserLoginActionEnum.getUserLoginError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE_USER
);

export const CurrentUserReducer = handleActions<ICurrentUserStateContext>(
  {
    [CurrentUserActionEnum.getCurrentUserPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [CurrentUserActionEnum.getCurrentUserSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [CurrentUserActionEnum.getCurrentUserError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE_CURRENT
);

