import { getAxiosInstance } from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useClientActions } from "../client-provider";
import {
  SalonRegisterStateContext,
  SalonRegisterActionContext,
  ClientRegisterStateContext,
  ClientRegisterActionContext,
  UserLoginStateContext,
  UserLoginActionContext,
  CurrentUserStateContext,
  CurrentUserActionContext,
  INITIAL_STATE_SALON,
  INITIAL_STATE_CLIENT,
  INITIAL_STATE_USER,
  INITIAL_STATE_CURRENT,
  ISalonRegister,
  IClientRegister,
  IUserLogin,
} from "./context";
import {
  CurrentUserReducer,
  RegisterClientReducer,
  RegisterSalonReducer,
  UserLoginReducer,
} from "./reducer";
import { useContext, useReducer } from "react";
import {
  getRegisterSalonPending,
  getRegisterSalonSuccess,
  getRegisterSalonError,
  getRegisterClientSuccess,
  getRegisterClientPending,
  getRegisterClientError,
  getUserLoginPending,
  getUserLoginSuccess,
  getUserLoginError,
  getCurrentUserPending,
  getCurrentUserSuccess,
  getCurrentUserError,
} from "./actions";
import { AbpTokenProperies, decodeToken } from "@/utils/jwt";

export const SalonRegisterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    RegisterSalonReducer,
    INITIAL_STATE_SALON
  );
  const instance = getAxiosInstance();

  const registerSalon = async (payload: ISalonRegister) => {
    dispatch(getRegisterSalonPending());
    const endpoint = `/services/app/Register/Register`;
    await instance
      .post(endpoint, payload)
      .then((response) => {
        const token = response.data.result.accessToken;
        const decoded = jwtDecode(token);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", JSON.stringify(decoded));
        dispatch(getRegisterSalonSuccess(token));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getRegisterSalonError());
      });
  };

  return (
    <SalonRegisterStateContext.Provider value={state}>
      <SalonRegisterActionContext.Provider
        value={{
          registerSalon,
        }}
      >
        {children}
      </SalonRegisterActionContext.Provider>
    </SalonRegisterStateContext.Provider>
  );
};

export const useRegisterSalonState = () => {
  const context = useContext(SalonRegisterStateContext);
  if (!context) {
    throw new Error(
      "useRegisterSalonState must be used within a RegisterSalonProvider"
    );
  }
  return context;
};

export const useRegisterSalonActions = () => {
  const context = useContext(SalonRegisterActionContext);
  if (!context) {
    throw new Error(
      "useRegisterSalonActions must be used within a RegisterSalonProvider"
    );
  }
  return context;
};

export const ClientRegisterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    RegisterClientReducer,
    INITIAL_STATE_CLIENT
  );
  const instance = getAxiosInstance();
  const { getClientList } = useClientActions();

  const registerClient = async (payload: IClientRegister) => {
    dispatch(getRegisterClientPending());
    const endpoint = `/services/app/Client/Register`;
    await instance
      .post(endpoint, payload)
      .then((response) => {
        dispatch(getRegisterClientSuccess(response.data));
        getClientList();
      })
      .catch((error) => {
        console.error(error);
        dispatch(getRegisterClientError());
      });
  };

  return (
    <ClientRegisterStateContext.Provider value={state}>
      <ClientRegisterActionContext.Provider
        value={{
          registerClient,
        }}
      >
        {children}
      </ClientRegisterActionContext.Provider>
    </ClientRegisterStateContext.Provider>
  );
};

export const useRegisterClientState = () => {
  const context = useContext(ClientRegisterStateContext);
  if (!context) {
    throw new Error(
      "useRegisterClientState must be used within a RegisterClientProvider"
    );
  }
  return context;
};

export const useRegisterClientActions = () => {
  const context = useContext(ClientRegisterActionContext);
  if (!context) {
    throw new Error(
      "useRegisterClientActions must be used within a RegisterClientProvider"
    );
  }
  return context;
};

export const UserLoginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(UserLoginReducer, INITIAL_STATE_USER);
  const instance = getAxiosInstance();
  const { currentUser } = useCurrentUserActions();

  const userLogin = async (payload: IUserLogin) => {
    dispatch(getUserLoginPending());
    const endpoint = `/TokenAuth/Authenticate`;
    await instance
      .post(endpoint, payload)
      .then((response) => {
        const token = response.data.result.accessToken;
        const decoded = decodeToken(token);
        const userRole = decoded[AbpTokenProperies.role];
        const userId = decoded[AbpTokenProperies.nameidentifier];

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", userRole);
        sessionStorage.setItem("userId", userId);

        currentUser();

        dispatch(getUserLoginSuccess(token));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getUserLoginError());
      });
  };

  return (
    <UserLoginStateContext.Provider value={state}>
      <UserLoginActionContext.Provider
        value={{
          userLogin,
        }}
      >
        {children}
      </UserLoginActionContext.Provider>
    </UserLoginStateContext.Provider>
  );
};

export const useUserLoginState = () => {
  const context = useContext(UserLoginStateContext);
  if (!context) {
    throw new Error(
      "useUserLoginState must be used within a UserLoginProvider"
    );
  }
  return context;
};

export const useUserLoginActions = () => {
  const context = useContext(UserLoginActionContext);
  if (!context) {
    throw new Error(
      "useUserLoginActions must be used within a UserLoginProvider"
    );
  }
  return context;
};

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    CurrentUserReducer,
    INITIAL_STATE_CURRENT
  );
  const instance = getAxiosInstance();

  const currentUser = async () => {
    // const token = sessionStorage.getItem("token")?.trim();
    dispatch(getCurrentUserPending());
    const endpoint = `services/app/Session/GetCurrentLoginInformations`;
    await instance
      .get(endpoint)
    await instance
      .get(endpoint)
      .then((response) => {
        const result = response.data.result.user.name;
        const salonName = result || "";
        sessionStorage.setItem("salonName", salonName);

        const result2 = response.data.result.user.name;

        const employeeTechnicianName = result2 || "";

        sessionStorage.setItem("employeeTechnicianName", employeeTechnicianName);

        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(response.data.result.user.id)
        );
        dispatch(getCurrentUserSuccess(response.data.result.user));

        // dispatch(getCurrentUserSuccess(result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getCurrentUserError());
      });

  };

  return (
    <CurrentUserStateContext.Provider value={state}>
      <CurrentUserActionContext.Provider
        value={{
          currentUser,
        }}
      >
        {children}
      </CurrentUserActionContext.Provider>
    </CurrentUserStateContext.Provider>
  );
};

export const useCurrentUserState = () => {
  const context = useContext(CurrentUserStateContext);
  if (!context) {
    throw new Error(
      "useCurrentUserState must be used within a CurrentUserProvider"
    );
  }
  return context;
};

export const useCurrentUserActions = () => {
  const context = useContext(CurrentUserActionContext);
  if (!context) {
    throw new Error(
      "useCurrentUserActions must be used within a CurrentUserProvider"
    );
  }
  return context;
};
