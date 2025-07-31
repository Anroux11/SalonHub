"use client";

import { getAxiosInstance } from "../../utils/axiosInstance";
import {
  INITIAL_STATE,
  IClient,
  ClientActionContext,
  ClientStateContext,
} from "./context";
import { ClientReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getClientListSuccess,
  getClientListPending,
  getClientListError,
  getClientPending,
  getClientError,
  createClientPending,
  createClientSuccess,
  createClientError,
  updateClientError,
  updateClientSuccess,
  updateClientPending,
  deleteClientPending,
  deleteClientSuccess,
  deleteClientError,
} from "./actions";

export const ClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const getClientList = async () => {
    dispatch(getClientListPending());
    const endpoint = `/services/app/User/GetAll`;
    await instance
      .get(endpoint)
      .then((response) => {
        const filteredData = response.data.result.items
          .filter((client: IClient) =>
            client.roleNames?.includes("SALON")
          )
          .map((client: IClient) => ({
            name: client.name || "",
            userName: client.userName || "",
            surname: client.surname || "",
            emailAddress: client.emailAddress || "",
            roleName: client.roleNames?.[0] || "",
            activeState: client.isActive ?? true,
          }));
        dispatch(getClientListSuccess(filteredData));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getClientListError());
      });
  };

  const getClient = async (id: string) => {
    dispatch(getClientPending());
    const endpoint = `services/app/User/Get?Id=${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getClientListSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getClientError());
      });
  };

  const createClient = async (client: IClient) => {
    const token = sessionStorage.getItem("token")?.trim();
    dispatch(createClientPending());
    const endpoint = `/client`;
    await instance
      .post(endpoint, client, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        dispatch(createClientSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createClientError());
      });
  };

  const updateClient = async (client: IClient) => {
    dispatch(updateClientPending());
    const endpoint = `services/app/User/Update`;
    await instance
      .put(endpoint, client)
      .then((response) => {
        dispatch(updateClientSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateClientError());
      });
  };

  const deleteClient = async (id: string) => {
    dispatch(deleteClientPending());
    const endpoint = `services/app/User/Delete?Id=${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteClientSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteClientError());
      });
  };

  return (
    <ClientStateContext.Provider value={state}>
      <ClientActionContext.Provider
        value={{
          getClientList,
          getClient,
          createClient,
          updateClient,
          deleteClient,
        }}
      >
        {children}
      </ClientActionContext.Provider>
    </ClientStateContext.Provider>
  );
};

export const useClientState = () => {
  const context = useContext(ClientStateContext);
  if (!context) {
    throw new Error("useClientState must be used within a ClientProvider");
  }
  return context;
};

export const useClientActions = () => {
  const context = useContext(ClientActionContext);
  if (!context) {
    throw new Error("useClientActions must be used within a ClientProvider");
  }
  return context;
};
