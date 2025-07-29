import { createAction } from "redux-actions";
import {  IImageStateContext } from "./context";

export enum ImageActionEnums {
  getImagePending = "GET_IMAGE_PENDING",
  getImageSuccess = "GET_IMAGE_SUCCESS",
  getImageError = "GET_IMAGE_ERROR",

  getImagesPending = "GET_IMAGES_PENDING",
  getImagesSuccess = "GET_IMAGES_SUCCESS",
  getImagesError = "GET_IMAGES_ERROR",

  uploadImagePending = "UPLOAD_IMAGE_PENDING",
  uploadImageSuccess = "UPLOAD_IMAGE_SUCCESS",
  uploadImageError = "UPLOAD_IMAGE_ERROR",
}

// export const getImagePending = createAction<IImageStateContext>(
//   ImageActionEnums.getImagePending,
//   () => ({ isPending: true, isSuccess: false, isError: false })
// );

// export const getImageSuccess = createAction<
//   IImageStateContext, 
//   IImage[] 
// >(
//   ImageActionEnums.getImageSuccess,
//   (images: IImage[]) => ({
//     isPending: false,
//     isSuccess: true,
//     isError: false,
//     images, 
//   })
// );

// export const getImageError = createAction<IImageStateContext>(
//   ImageActionEnums.getImageListError,
//   () => ({ isPending: false, isSuccess: false, isError: true })
// );

// export const getImagesPending = createAction<IImageStateContext>(
//   ImageActionEnums.getImagesPending,
//   () => ({ isPending: true, isSuccess: false, isError: false })
// );

// export const getImagesSuccess = createAction<
//   IImageStateContext,
//   IImage
// >(ImageActionEnums.getImagesSuccess, (image: IImage) => ({
//   isPending: false,
//   isSuccess: true,
//   isError: false,
//   image,
// }));

// export const getImagesError = createAction<IImageStateContext>(
//   ImageActionEnums.getImagesError,
//   () => ({ isPending: false, isSuccess: false, isError: true })
// );

export const uploadImagePending = createAction<IImageStateContext>(
  ImageActionEnums.uploadImagePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const uploadImageSuccess = createAction<
  IImageStateContext
>(ImageActionEnums.uploadImageSuccess, () => ({
  isPending: false,
  isSuccess: true,
  isError: false,
}));

export const uploadImageError = createAction<IImageStateContext>(
  ImageActionEnums.uploadImageError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);