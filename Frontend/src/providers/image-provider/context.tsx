import { createContext } from "react";
export interface IImage {
 path: string;
 fileBody: string;
 fileOptions: string;
}

export interface IImageStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  image?: IImage;
  images?: IImage[];
}
export interface IImageActionContext {
//   getImages: () => void;
//   getImage: (id: string) => void;
  uploadImage: (file: File) => Promise<string>;
}

export const INITIAL_STATE: IImageStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const ImageStateContext =
  createContext<IImageStateContext>(INITIAL_STATE);

export const ImageActionContext = createContext<
  undefined | IImageActionContext
>(undefined);
