import { createAction } from "redux-actions";
import { ISalon, ISalonStateContext } from "./context";

export enum SalonActionEnums {
  getSalonListPending = "GET_SALON_LIST_PENDING",
  getSalonListSuccess = "GET_SALON_LIST_SUCCESS",
  getSalonListError = "GET_SALON_LIST_ERROR",

  getSalonPending = "GET_SALON_PENDING",
  getSalonSuccess = "GET_SALON_SUCCESS",
  getSalonError = "GET_SALON_ERROR",

  createSalonPending = "CREATE_SALON_PENDING",
  createSalonSuccess = "CREATE_SALON_SUCCESS",
  createSalonError = "CREATE_SALON_ERROR",

  updateSalonPending = "UPDATE_SALON_PENDING",
  updateSalonSuccess = "UPDATE_SALON_SUCCESS",
  updateSalonError = "UPDATE_SALON_ERROR",

  deleteSalonPending = "DELETE_SALON_PENDING",
  deleteSalonSuccess = "DELETE_SALON_SUCCESS",
  deleteSalonError = "DELETE_SALON_ERROR",
}

export const getSalonListPending = createAction<ISalonStateContext>(
  SalonActionEnums.getSalonListPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getSalonListSuccess = createAction<ISalonStateContext, ISalon[]>(
  SalonActionEnums.getSalonListSuccess,
  (salons: ISalon[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    salons,
  })
);

export const getSalonListError = createAction<ISalonStateContext>(
  SalonActionEnums.getSalonListError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getSalonPending = createAction<ISalonStateContext>(
  SalonActionEnums.getSalonPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getSalonSuccess = createAction<ISalonStateContext, ISalon>(
  SalonActionEnums.getSalonSuccess,
  (salon: ISalon) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    salon,
  })
);

export const getSalonError = createAction<ISalonStateContext>(
  SalonActionEnums.getSalonError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createSalonPending = createAction<ISalonStateContext>(
  SalonActionEnums.createSalonPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createSalonSuccess = createAction<
  ISalonStateContext,
  ISalon
>(SalonActionEnums.createSalonSuccess, (salon: ISalon) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  salon,
}));

export const createSalonError = createAction<ISalonStateContext>(
  SalonActionEnums.createSalonError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateSalonPending = createAction<ISalonStateContext>(
  SalonActionEnums.updateSalonPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateSalonSuccess = createAction<
  ISalonStateContext,
  ISalon
>(SalonActionEnums.updateSalonSuccess, (salon: ISalon) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  salon,
}));

export const updateSalonError = createAction<ISalonStateContext>(
  SalonActionEnums.updateSalonError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteSalonPending = createAction<ISalonStateContext>(
  SalonActionEnums.deleteSalonPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteSalonSuccess = createAction<
  ISalonStateContext,
  ISalon
>(SalonActionEnums.deleteSalonSuccess, (salon: ISalon) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  salon,
}));

export const deleteSalonError = createAction<ISalonStateContext>(
  SalonActionEnums.deleteSalonError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
