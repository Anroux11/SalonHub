import { createAction } from "redux-actions";
import { IEmployeeTechnician, IEmployeeTechnicianStateContext } from "./context";

export enum EmployeeTechnicianActionEnums {
    getEmployeeTechnicianListPending = "GET_EMPLOYEETECHNICIAN_LIST_PENDING",
    getEmployeeTechnicianListSuccess = "GET_EMPLOYEETECHNICIAN_LIST_SUCCESS",
    getEmployeeTechnicianListError = "GET_EMPLOYEETECHNICIAN_LIST_ERROR",

    getEmployeeTechnicianPending = "GET_EMPLOYEETECHNICIAN_PENDING",
    getEmployeeTechnicianSuccess = "GET_EMPLOYEETECHNICIAN_SUCCESS",
    getEmployeeTechnicianError = "GET_EMPLOYEETECHNICIAN_ERROR",

    createEmployeeTechnicianPending = "CREATE_EMPLOYEETECHNICIAN_PENDING",
    createEmployeeTechnicianSuccess = "CREATE_EMPLOYEETECHNICIAN_SUCCESS",
    createEmployeeTechnicianError = "CREATE_EMPLOYEETECHNICIAN_ERROR",

    updateEmployeeTechnicianPending = "UPDATE_EMPLOYEETECHNICIAN_PENDING",
    updateEmployeeTechnicianSuccess = "UPDATE_EMPLOYEETECHNICIAN_SUCCESS",
    updateEmployeeTechnicianError = "UPDATE_EMPLOYEETECHNICIAN_ERROR",

    deleteEmployeeTechnicianPending = "DELETE_EMPLOYEETECHNICIAN_PENDING",
    deleteEmployeeTechnicianSuccess = "DELETE_EMPLOYEETECHNICIAN_SUCCESS",
    deleteEmployeeTechnicianError = "DELETE_EMPLOYEETECHNICIAN_ERROR",
}

export const getEmployeeTechnicianListPending = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.getEmployeeTechnicianListPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const getEmployeeTechnicianListSuccess = createAction<IEmployeeTechnicianStateContext, IEmployeeTechnician[]>(
    EmployeeTechnicianActionEnums.getEmployeeTechnicianListSuccess, (employeeTechnicians: IEmployeeTechnician[]) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            employeeTechnicians,
        }
    )
);

export const getEmployeeTechnicianListError = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.getEmployeeTechnicianListError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);

export const getEmployeeTechnicianPending = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.getEmployeeTechnicianPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
);

export const getEmployeeTechnicianSuccess = createAction<IEmployeeTechnicianStateContext, IEmployeeTechnician>(
    EmployeeTechnicianActionEnums.getEmployeeTechnicianSuccess, (employeeTechnician?: IEmployeeTechnician) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            employeeTechnician,
        }
    )
);

export const getEmployeeTechnicianError = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.getEmployeeTechnicianError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError:true,
        }
    )
);

export const createEmployeeTechnicianPending = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.createEmployeeTechnicianPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const createEmployeeTechnicianSuccess = createAction<IEmployeeTechnicianStateContext, IEmployeeTechnician>(
    EmployeeTechnicianActionEnums.createEmployeeTechnicianSuccess, (employeeTechnician?: IEmployeeTechnician) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            employeeTechnician,
        }
    )
);

export const createEmployeeTechnicianError = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.createEmployeeTechnicianError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);

export const updateEmployeeTechnicianPending = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.updateEmployeeTechnicianPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const updateEmployeeTechnicianSuccess = createAction<IEmployeeTechnicianStateContext, IEmployeeTechnician>(
    EmployeeTechnicianActionEnums.updateEmployeeTechnicianSuccess, (employeeTechnician?: IEmployeeTechnician) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            employeeTechnician,
        }
    )
);

export const updateEmployeeTechnicianError = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.updateEmployeeTechnicianError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);

export const deleteEmployeeTechnicianPending = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.deleteEmployeeTechnicianPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const deleteEmployeeTechnicianSuccess = createAction<IEmployeeTechnicianStateContext, IEmployeeTechnician>(
    EmployeeTechnicianActionEnums.deleteEmployeeTechnicianSuccess, (employeeTechnician?: IEmployeeTechnician) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            employeeTechnician,
        }
    )
);

export const deleteEmployeeTechnicianError = createAction<IEmployeeTechnicianStateContext>(
    EmployeeTechnicianActionEnums.deleteEmployeeTechnicianError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);