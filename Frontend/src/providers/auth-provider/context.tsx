import { createContext } from "react";

export interface ISalonRegister {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
  roleName: string;
  contactNumber?: number;
  address?: string;
}
export interface ISalonRegisterStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  salon?: ISalonRegister;
}
export interface ISalonRegisterActionContext {
  registerSalon: (payload: ISalonRegister) => void; 
}

export const INITIAL_STATE_SALON: ISalonRegisterStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false, 
};

export const SalonRegisterStateContext =
  createContext<ISalonRegisterStateContext>(INITIAL_STATE_SALON);

export const SalonRegisterActionContext = createContext<
  undefined | ISalonRegisterActionContext
>(undefined);

export interface IClientRegister {
  emailAddress: string;
  password: string;
  roleName: string;
  userName: string;
  name: string;
  surname: string;
}
export interface IClientRegisterStateContext {
  isPending: boolean; 
  isSuccess: boolean; 
  isError: boolean; 
  client?: IClientRegister; 
}
export interface IClientRegsiterActionContext {
  registerClient: (payload: IClientRegister) => void; 
}

export const INITIAL_STATE_CLIENT: IClientRegisterStateContext = {
  isPending: false, 
  isSuccess: false,
  isError: false,
};

export const ClientRegisterStateContext =
createContext<IClientRegisterStateContext>(INITIAL_STATE_CLIENT);

export const ClientRegisterActionContext = createContext<
  undefined | IClientRegsiterActionContext
>(undefined);

export interface IUserLogin {
  userNameOrEmailAddress: string;
  password: string;
}
export interface IUserLoginStateContext {
  isPending: boolean; 
  isSuccess: boolean; 
  isError: boolean; 
  user?: IUserLogin; 
}
export interface IUserLoginActionContext {
  userLogin: (payload: IUserLogin) => void;
}

export const INITIAL_STATE_USER: IUserLoginStateContext = {
  isPending: false, 
  isSuccess: false, 
  isError: false, 
};

export const UserLoginStateContext =
  createContext<IUserLoginStateContext>(INITIAL_STATE_USER);

export const UserLoginActionContext = createContext<
  undefined | IUserLoginActionContext
>(undefined);

export interface ICurrentUser {
  id: string;
  name: string;
  userName?: string;
  surname?: string
  emailAddress: string;
  role: string;
  activeState: boolean;
  date: string;
}
export interface ICurrentUserStateContext {
  isPending: boolean;
  isSuccess: boolean; 
  isError: boolean; 
  user?: ICurrentUser; 
}
export interface ICurrentUserActionContext {
  currentUser: () => void;
}

export const INITIAL_STATE_CURRENT: ICurrentUserStateContext = {
  isPending: false, 
  isSuccess: false, 
  isError: false,
};

export const CurrentUserStateContext = createContext<ICurrentUserStateContext>(
  INITIAL_STATE_CURRENT
);

export const CurrentUserActionContext = createContext<
  undefined | ICurrentUserActionContext
>(undefined);
