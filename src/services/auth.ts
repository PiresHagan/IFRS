import api from "./api";
import { LoginResponse, UserCredentials, ResetPasswordResponse } from "@/types/auth";

export const login = async (values: UserCredentials): Promise<LoginResponse> => {
  const response = await api.post("/auth/login/", values);
  return response as unknown as LoginResponse;
};

export const register = async (values: any): Promise<LoginResponse> => {
  const response = await api.post("/auth/signup/", values);
  return response as unknown as LoginResponse;
};

export const resetPassword = async (values: any): Promise<ResetPasswordResponse> => {
  const response = await api.post("/auth/password/reset/", values);
  return response as unknown as ResetPasswordResponse;
};

export const updateProfile = async (values: any): Promise<any> => {
  const response = await api.put("/auth/user/", values);
  return response;
};

export const updatePassword = async (values: any): Promise<any> => {
  const response = await api.post("/auth/password/change/", values);
  return response;
};

export const fetchMe = async (): Promise<any> => {
  const response = await api.get("/auth/user/");
  return response;
};

export const logout = async (values: any): Promise<any> => {
  const response = await api.post("/auth/logout/", values);
  return response;
};
