import { createAction } from "redux-actions";
import { IClient, IClientStateContext } from "./context";

export enum ClientActionEnums {
  getClientListPending = "GET_CLIENT_LIST_PENDING",
  getClientListSuccess = "GET_CLIENTS_LIST_SUCCESS",
  getClientListError = "GET_CLIENTS_LIST_ERROR",

  getClientPending = "GET_CLIENT_PENDING",
  getClientSuccess = "GET_CLIENT_SUCCESS",
  getClientError = "GET_CLIENT_ERROR",

  createClientPending = "CREATE_CLIENT_PENDING",
  createClientSuccess = "CREATE_CLIENT_SUCCESS",
  createClientError = "CREATE_CLIENT_ERROR",

  updateClientPending = "UPDATE_CLIENT_PENDING",
  updateClientSuccess = "UPDATE_CLIENT_SUCCESS",
  updateClientError = "UPDATE_CLIENT_ERROR",

  deleteClientPending = "DELETE_CLIENT_PENDING",
  deleteClientSuccess = "DELETE_CLIENT_SUCCESS",
  deleteClientError = "DELETE_CLIENT_ERROR",
}

export const getClientListPending = createAction<IClientStateContext>(
  ClientActionEnums.getClientListPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getClientListSuccess = createAction<IClientStateContext, IClient[]>(
  ClientActionEnums.getClientListSuccess,
  (clients: IClient[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    clients,
  })
);

export const getClientListError = createAction<IClientStateContext>(
  ClientActionEnums.getClientListError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getClientPending = createAction<IClientStateContext>(
  ClientActionEnums.getClientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getClientSuccess = createAction<IClientStateContext, IClient>(
  ClientActionEnums.getClientSuccess,
  (client: IClient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
  })
);

export const getClientError = createAction<IClientStateContext>(
  ClientActionEnums.getClientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createClientPending = createAction<IClientStateContext>(
  ClientActionEnums.createClientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createClientSuccess = createAction<IClientStateContext, IClient>(
  ClientActionEnums.createClientSuccess,
  (client: IClient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
  })
);

export const createClientError = createAction<IClientStateContext>(
  ClientActionEnums.createClientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateClientPending = createAction<IClientStateContext>(
  ClientActionEnums.updateClientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateClientSuccess = createAction<IClientStateContext, IClient>(
  ClientActionEnums.updateClientSuccess,
  (client: IClient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
  })
);

export const updateClientError = createAction<IClientStateContext>(
  ClientActionEnums.updateClientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteClientPending = createAction<IClientStateContext>(
  ClientActionEnums.deleteClientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteClientSuccess = createAction<IClientStateContext, IClient>(
  ClientActionEnums.deleteClientSuccess,
  (client: IClient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    client,
  })
);

export const deleteClientError = createAction<IClientStateContext>(
  ClientActionEnums.deleteClientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
