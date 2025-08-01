"use client";

import { getAxiosInstance } from "../../utils/axiosInstance";
import {
  INITIAL_STATE,
  ISalonService,
  SalonServiceStateContext,
  SalonServiceActionContext,
} from "./context";
import { SalonServiceReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getSalonServiceListPending,
  getSalonServiceListSuccess,
  getSalonServiceListError,
  getSalonServicePending,
  getSalonServiceSuccess,
  getSalonServiceError,
  createSalonServicePending,
  createSalonServiceSuccess,
  createSalonServiceError,
  updateSalonServicePending,
  updateSalonServiceSuccess,
  updateSalonServiceError,
  deleteSalonServicePending,
  deleteSalonServiceSuccess,
  deleteSalonServiceError,
} from "./actions";
// import { useCurrentUserActions } from "../auth-provider";

export const SalonServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(SalonServiceReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  // const { currentUser } = useCurrentUserActions();

  const getSalonServiceList = async () => {
    dispatch(getSalonServiceListPending());
    const endpoint = `/services/app/SalonService/GetAll`;
    await instance
      .get(endpoint)
      .then((response) => {
        // currentUser();
        const salon = (sessionStorage.getItem("salonName") || "").toString();
        const filteredData = response.data.result.items
          .filter((salonService: ISalonService) => salonService.salonName === salon)
          .map(
          (salonService: ISalonService) => ({
            id: salonService.id,
            name: salonService.name ?? "",
            description: salonService.description ?? "",
            price: salonService.price ?? "",
            salonId: salonService.salonId ?? "",
            salonName: salonService.salonName ?? "",
          })
        );
        console.log("Filtered Salon Service Providers:", filteredData);
        dispatch(getSalonServiceListSuccess(filteredData));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getSalonServiceListError());
      });
  };

  const getSalonService = async (id: string) => {
    dispatch(getSalonServicePending());
    const endpoint = `/salonService/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getSalonServiceSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getSalonServiceError());
      });
  };

  const createSalonService = async (salonService: ISalonService) => {
    dispatch(createSalonServicePending());
    const endpoint = `/services/app/SalonService/Create`;
    await instance
      .post(endpoint, salonService)
      .then((response) => {
        dispatch(createSalonServiceSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createSalonServiceError());
      });
  };

  const updateSalonService = async (salonService: ISalonService) => {
    dispatch(updateSalonServicePending());
    const endpoint = `/salonService/${salonService.id}`;
    await instance
      .put(endpoint, salonService)
      .then((response) => {
        dispatch(updateSalonServiceSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateSalonServiceError());
      });
  };

  const deleteSalonService = async (id: string) => {
    dispatch(deleteSalonServicePending());
    const endpoint = `/response.data.result.accesstoken/${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteSalonServiceSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteSalonServiceError());
      });
  };

  return (
    <SalonServiceStateContext.Provider value={state}>
      <SalonServiceActionContext.Provider
        value={{
          getSalonServiceList,
          getSalonService,
          createSalonService,
          updateSalonService,
          deleteSalonService,
        }}
      >
        {children}
      </SalonServiceActionContext.Provider>
    </SalonServiceStateContext.Provider>
  );
};

export const useSalonServiceState = () => {
  const context = useContext(SalonServiceStateContext);
  if (!context) {
    throw new Error(
      "useSalonServiceState must be used with a SalonServiceProvider"
    );
  }
  return context;
};

export const useSalonServiceActions = () => {
  const context = useContext(SalonServiceActionContext);
  if (!context) {
    throw new Error(
      "useSalonServiceActions must be used with a SalonServiceProvider"
    );
  }
  return context;
};
