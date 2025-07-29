import { handleActions } from "redux-actions";
import { INITIAL_STATE, IEmployeeTechnicianStateContext } from "./context";
import { EmployeeTechnicianActionEnums } from "./actions";

export const EmployeeTechnicianReducer = handleActions<IEmployeeTechnicianStateContext, IEmployeeTechnicianStateContext>(
    {
        [EmployeeTechnicianActionEnums.getEmployeeTechnicianListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.getEmployeeTechnicianListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.getEmployeeTechnicianListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.getEmployeeTechnicianPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.getEmployeeTechnicianSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.getEmployeeTechnicianError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.createEmployeeTechnicianPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.createEmployeeTechnicianSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.createEmployeeTechnicianError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.updateEmployeeTechnicianPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.updateEmployeeTechnicianSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.updateEmployeeTechnicianError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.deleteEmployeeTechnicianPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.deleteEmployeeTechnicianSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeTechnicianActionEnums.deleteEmployeeTechnicianError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
)