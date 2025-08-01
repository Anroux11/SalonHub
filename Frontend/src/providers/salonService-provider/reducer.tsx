import { handleActions } from "redux-actions";
import { INITIAL_STATE, ISalonServiceStateContext } from "./context";
import { SalonServiceActionEnums } from "./actions";

export const SalonServiceReducer = handleActions<ISalonServiceStateContext, ISalonServiceStateContext>(
    {
        [SalonServiceActionEnums.getSalonServiceListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.getSalonServiceListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.getSalonServiceListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.getSalonServicePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.getSalonServiceSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.getSalonServiceError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.createSalonServicePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.createSalonServiceSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.createSalonServiceError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.updateSalonServicePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.updateSalonServiceSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.updateSalonServiceError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.deleteSalonServicePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.deleteSalonServiceSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SalonServiceActionEnums.deleteSalonServiceError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
)