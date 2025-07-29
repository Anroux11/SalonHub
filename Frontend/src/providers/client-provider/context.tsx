import { createContext } from "react";
export interface IClient {
  id?: number;
  // username: string;
  // firstName?: string;
  // lastName?: string;
  // email?: string;
  // activeState?: boolean;
  key?: string;
  userName?: string;
  name?: string;
  surname?: string;
  emailAddress?: string;
  isActive?: boolean;
  fullName?: string;
  lastLoginTime?: Date;
  creationTime?: Date;
  roleNames?: [string];
  roleName: string;
  password?: string
}
export interface IClientStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  client?: IClient;
  clients?: IClient[];
}
export interface IClientActionContext {
  getClientList: () => void;
  // getClientList: () => Promise<void>;
  // getClientList: () => void;
  getClient: (id: string) => void;
  createClient: (client: IClient) => void;
  updateClient: (client: IClient) => void;
  deleteClient: (id: string) => void;
}

export const INITIAL_STATE: IClientStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const ClientStateContext =
  createContext<IClientStateContext>(INITIAL_STATE);

export const ClientActionContext = createContext<
  undefined | IClientActionContext
>(undefined);
