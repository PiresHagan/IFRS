import api from "./api";
import { AppearanceType } from "@/types/config";

export const getConfig = async (values: string = ""): Promise<AppearanceType> => {
  if (values !== "") {
    const response = await api.get("/management/site-configuration/", {
      headers: {
        Authorization: `JWT ${values}`,
      },
    });
    return response as unknown as AppearanceType;
  } else {
    const response = await api.get("/management/site-configuration/");
    return response as unknown as AppearanceType;
  }
};

export const updateConfig = async (values: any): Promise<any> => {
  const response = await api.put("/management/site-configuration/", values);
  return response;
};