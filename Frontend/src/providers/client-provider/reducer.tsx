import { handleActions } from "redux-actions";
import { INITIAL_STATE, IClientStateContext } from "./context";
import { ClientActionEnums } from "./actions";

export const ClientReducer = handleActions<
  IClientStateContext,
  IClientStateContext
>(
  {
    [ClientActionEnums.getClientListPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientListSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientListError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.getClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.createClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.createClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.createClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.updateClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.updateClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.updateClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.deleteClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.deleteClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ClientActionEnums.deleteClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
