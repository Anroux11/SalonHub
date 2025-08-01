"use client";

import { getAxiosInstance } from "../../utils/axiosInstance";
import {
  INITIAL_STATE,
  ISalon,
  SalonActionContext,
  SalonStateContext,
} from "./context";
import { SalonReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getSalonListPending,
  getSalonListSuccess,
  getSalonListError,
  getSalonPending,
  getSalonError,
  createSalonPending,
  createSalonSuccess,
  createSalonError,
  updateSalonError,
  updateSalonSuccess,
  updateSalonPending,
  deleteSalonPending,
  deleteSalonSuccess,
  deleteSalonError,
  getSalonSuccess,
} from "./actions";

export const SalonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(SalonReducer, INITIAL_STATE);
  const instance = getAxiosInstance();

  const getSalonList = async () => {
      dispatch(getSalonListPending());
      const endpoint = `/services/app/Salon/GetAll`;
      await instance
        .get(endpoint)
        .then((response) => {
          const filteredData = response.data.result.items.map((salon: ISalon) => ({
            name: salon.name ?? "",
          }));
          dispatch(getSalonListSuccess(filteredData));
        })
        .catch((error) => {
          console.error(error);
          dispatch(getSalonListError());
        });
    };

  const getSalon = async (id: string) => {
    dispatch(getSalonPending());
    const endpoint = `/salon/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getSalonSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getSalonError());
      });
  };

  const createSalon = async (trainer: ISalon) => {
    dispatch(createSalonPending());
    const endpoint = `/salon`;
    await instance
      .post(endpoint, trainer)
      .then((response) => {
        dispatch(createSalonSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createSalonError());
      });
  };

  const updateSalon = async (salon: ISalon) => {
    dispatch(updateSalonPending());
    const endpoint = `/salon/${salon.id}`;
    await instance
      .put(endpoint, salon)
      .then((response) => {
        dispatch(updateSalonSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateSalonError());
      });
  };

  const deleteSalon = async (id: string) => {
    dispatch(deleteSalonPending());
    const endpoint = `https:/salon/${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteSalonSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteSalonError());
      });
  };

  return (
    <SalonStateContext.Provider value={state}>
      <SalonActionContext.Provider
        value={{
          getSalonList,
          getSalon,
          createSalon,
          updateSalon,
          deleteSalon,
        }}
      >
        {children}
      </SalonActionContext.Provider>
    </SalonStateContext.Provider>
  );
};

export const useSalonState = () => {
  const context = useContext(SalonStateContext);
  if (!context) {
    throw new Error("useSalonState must be used within a SalonProvider");
  }
  return context;
};

export const useSalonActions = () => {
  const context = useContext(SalonActionContext);
  if (!context) {
    throw new Error("useSalonActions must be used within a SalonProvider");
  }
  return context;
};
