"use client";

import { getAxiosInstance } from "../../utils/axiosInstance";
import {
  INITIAL_STATE,
  IEmployeeTechnician,
  EmployeeTechnicianStateContext,
  EmployeeTechnicianActionContext,
} from "./context";
import { EmployeeTechnicianReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getEmployeeTechnicianListPending,
  getEmployeeTechnicianListSuccess,
  getEmployeeTechnicianListError,
  getEmployeeTechnicianPending,
  getEmployeeTechnicianSuccess,
  getEmployeeTechnicianError,
  createEmployeeTechnicianPending,
  createEmployeeTechnicianSuccess,
  createEmployeeTechnicianError,
  updateEmployeeTechnicianPending,
  updateEmployeeTechnicianSuccess,
  updateEmployeeTechnicianError,
  deleteEmployeeTechnicianPending,
  deleteEmployeeTechnicianSuccess,
  deleteEmployeeTechnicianError,
} from "./actions";
import { useCurrentUserActions } from "../auth-provider";

export const EmployeeTechnicianProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(EmployeeTechnicianReducer, INITIAL_STATE);
  const instance = getAxiosInstance();
  const { currentUser } = useCurrentUserActions();

  const getEmployeeTechnicianList = async () => {
    dispatch(getEmployeeTechnicianListPending());
    const endpoint = `/services/app/EmployeeTechnician/GetAll`;
    await instance
      .get(endpoint)
      .then((response) => {
        currentUser();
        const salon = (sessionStorage.getItem("salonName") || "").toString();
        const filteredData = response.data.result.items
          .filter((employeeTechnician: IEmployeeTechnician) => employeeTechnician.salonName === salon)
          .map(
          (employeeTechnician: IEmployeeTechnician) => ({
            id: employeeTechnician.id,
            name: employeeTechnician.name ?? "",
            email: employeeTechnician.email ?? "",
            password: employeeTechnician.password ?? "",
            jobTitle: employeeTechnician.jobTitle ?? "",
            contactNumber: employeeTechnician.contactNumber ?? 0,
            salonId: employeeTechnician.salonId ?? "",
            salonName: employeeTechnician.salonName ?? "",
          })
        );
        console.log("Filtered Service Providers:", filteredData);
        dispatch(getEmployeeTechnicianListSuccess(filteredData));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getEmployeeTechnicianListError());
      });
  };

  const getEmployeeTechnician = async (id: string) => {
    dispatch(getEmployeeTechnicianPending());
    const endpoint = `/employeeTechnician/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getEmployeeTechnicianSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getEmployeeTechnicianError());
      });
  };

  const createEmployeeTechnician = async (employeeTechnician: IEmployeeTechnician) => {
    dispatch(createEmployeeTechnicianPending());
    const endpoint = `/services/app/EmployeeTechnician/Create`;
    await instance
      .post(endpoint, employeeTechnician)
      .then((response) => {
        dispatch(createEmployeeTechnicianSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createEmployeeTechnicianError());
      });
  };

  const updateEmployeeTechnician = async (employeeTechnician: IEmployeeTechnician) => {
    dispatch(updateEmployeeTechnicianPending());
    const endpoint = `/employeeTechnician/${employeeTechnician.id}`;
    await instance
      .put(endpoint, employeeTechnician)
      .then((response) => {
        dispatch(updateEmployeeTechnicianSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateEmployeeTechnicianError());
      });
  };

  const deleteEmployeeTechnician = async (id: string) => {
    dispatch(deleteEmployeeTechnicianPending());
    const endpoint = `/response.data.result.accesstoken/${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteEmployeeTechnicianSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteEmployeeTechnicianError());
      });
  };

  return (
    <EmployeeTechnicianStateContext.Provider value={state}>
      <EmployeeTechnicianActionContext.Provider
        value={{
          getEmployeeTechnicianList,
          getEmployeeTechnician,
          createEmployeeTechnician,
          updateEmployeeTechnician,
          deleteEmployeeTechnician,
        }}
      >
        {children}
      </EmployeeTechnicianActionContext.Provider>
    </EmployeeTechnicianStateContext.Provider>
  );
};

export const useEmployeeTechnicianState = () => {
  const context = useContext(EmployeeTechnicianStateContext);
  if (!context) {
    throw new Error(
      "useEmployeeTechnicianState must be used with a EmployeeTechnicianProvider"
    );
  }
  return context;
};

export const useEmployeeTechnicianActions = () => {
  const context = useContext(EmployeeTechnicianActionContext);
  if (!context) {
    throw new Error(
      "useEmployeeTechnicianActions must be used with a EmployeeTechnicianProvider"
    );
  }
  return context;
};
