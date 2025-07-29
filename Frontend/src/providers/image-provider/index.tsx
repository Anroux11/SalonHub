"use client";

import { ImageReducer } from "./reducer";
import { useContext, useReducer } from "react";

import { supabase } from "@/utils/supabaseClient";
import { ImageActionContext, ImageStateContext, INITIAL_STATE } from "./context";
import { uploadImageError, uploadImagePending, uploadImageSuccess } from "./actions";

export const ImageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ImageReducer, INITIAL_STATE);

  const uploadImage = async (file: File): Promise<string> => {
    dispatch(uploadImagePending());
    const timeStamp = Date.now();
    const filePath = `/${timeStamp}_${file.name}`;
    const { error } = await supabase.storage
      .from("salonHub-photos")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      dispatch(uploadImageError());
      console.error("Image upload error:", error);
      throw error;
    }

    dispatch(uploadImageSuccess());
    const {
      data: { publicUrl },
    } = supabase.storage.from("salonHub-photos").getPublicUrl(filePath);
    return publicUrl;
  };

//   const resetStateFlags = async () => {
//     dispatch(resetStateFlagsAction());
//   };

  return (
    <ImageStateContext.Provider value={state}>
      <ImageActionContext.Provider
        value={{
          uploadImage
        }}
      >
        {children}
      </ImageActionContext.Provider>
    </ImageStateContext.Provider>
  );
};

export const useImageState = () => {
  const context = useContext(ImageStateContext);

  if (!context) {
    throw new Error(
      "useImageState must be used within a ImageProvider"
    );
  }
  return context;
};

export const useImageActions = () => {
  const context = useContext(ImageActionContext);

  if (!context) {
    throw new Error(
      "useImageState must be used within a ImageProvider"
    );
  }
  return context;
};
// function uploadImageSuccess(): any {
//     throw new Error("Function not implemented.");
// }

