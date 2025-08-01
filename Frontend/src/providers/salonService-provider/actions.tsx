import { createAction } from "redux-actions";
import { ISalonService, ISalonServiceStateContext } from "./context";

export enum SalonServiceActionEnums {
    getSalonServiceListPending = "GET_SALON_SERVICE_LIST_PENDING",
    getSalonServiceListSuccess = "GET_SALON_SERVICE_LIST_SUCCESS",
    getSalonServiceListError = "GET_SALON_SERVICE_LIST_ERROR",

    getSalonServicePending = "GET_SALON_SERVICE_PENDING",
    getSalonServiceSuccess = "GET_SALON_SERVICE_SUCCESS",
    getSalonServiceError = "GET_SALON_SERVICE_ERROR",

    createSalonServicePending = "CREATE_SALON_SERVICE_PENDING",
    createSalonServiceSuccess = "CREATE_SALON_SERVICE_SUCCESS",
    createSalonServiceError = "CREATE_SALON_SERVICE_ERROR",

    updateSalonServicePending = "UPDATE_SALON_SERVICE_PENDING",
    updateSalonServiceSuccess = "UPDATE_SALON_SERVICE_SUCCESS",
    updateSalonServiceError = "UPDATE_SALON_SERVICE_ERROR",

    deleteSalonServicePending = "DELETE_SALON_SERVICE_PENDING",
    deleteSalonServiceSuccess = "DELETE_SALON_SERVICE_SUCCESS",
    deleteSalonServiceError = "DELETE_SALON_SERVICE_ERROR",
}

export const getSalonServiceListPending = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.getSalonServiceListPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const getSalonServiceListSuccess = createAction<ISalonServiceStateContext, ISalonService[]>(
    SalonServiceActionEnums.getSalonServiceListSuccess, (salonServices: ISalonService[]) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            salonServices,
        }
    )
);

export const getSalonServiceListError = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.getSalonServiceListError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);

export const getSalonServicePending = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.getSalonServicePending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false
        }
    )
);

export const getSalonServiceSuccess = createAction<ISalonServiceStateContext, ISalonService>(
    SalonServiceActionEnums.getSalonServiceSuccess, (salonService?: ISalonService) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            salonService,
        }
    )
);

export const getSalonServiceError = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.getSalonServiceError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError:true,
        }
    )
);

export const createSalonServicePending = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.createSalonServicePending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const createSalonServiceSuccess = createAction<ISalonServiceStateContext, ISalonService>(
    SalonServiceActionEnums.createSalonServiceSuccess, (salonService?: ISalonService) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            salonService,
        }
    )
);

export const createSalonServiceError = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.createSalonServiceError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);

export const updateSalonServicePending = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.updateSalonServicePending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const updateSalonServiceSuccess = createAction<ISalonServiceStateContext, ISalonService>(
    SalonServiceActionEnums.updateSalonServiceSuccess, (salonService?: ISalonService) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            salonService,
        }
    )
);

export const updateSalonServiceError = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.updateSalonServiceError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);

export const deleteSalonServicePending = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.deleteSalonServicePending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const deleteSalonServiceSuccess = createAction<ISalonServiceStateContext, ISalonService>(
    SalonServiceActionEnums.deleteSalonServiceSuccess, (salonService?: ISalonService) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            salonService,
        }
    )
);

export const deleteSalonServiceError = createAction<ISalonServiceStateContext>(
    SalonServiceActionEnums.deleteSalonServiceError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);