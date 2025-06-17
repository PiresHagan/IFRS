import api from "./api";
import PublicAxios from "./publicApi";
import { BotPlaygroundHistory } from "@/types/playground";
import { PublicChat } from "@/types/chat";
import { BotResponse } from "@/types/bot";

export const getChatsHistory = async (): Promise<BotPlaygroundHistory[]> => {
  const response = await api.get(`/gpt-integration/chats/`);
  return response as unknown as BotPlaygroundHistory[];
};

export const createChat = async (): Promise<PublicChat> => {
  const response = await api.post(`/gpt-integration/chats/create/`);
  return response as unknown as PublicChat;
};

export const updateChat = async (id: string, values: any): Promise<any> => {
  const response = await api.put(`/gpt-integration/chats/${id}/update/`, values);
  return response;
};

export const deleteChat = async (id: string): Promise<any> => {
  const response = await api.delete(`/gpt-integration/chats/${id}/delete/`);
  return response;
};

export const getChatDetail = async (id: string): Promise<PublicChat> => {
  const response = await api.get(`/gpt-integration/chats/${id}/detail/`);
  return response as unknown as PublicChat;
};

export const widgetChatsHistory = async (): Promise<BotPlaygroundHistory[]> => {
  const response = await PublicAxios.get(`/widgets/chats/`);
  return response as unknown as BotPlaygroundHistory[];
};

export const widgetDeleteChat = async (id: string): Promise<any> => {
  const response = await PublicAxios.delete(`/widgets/chats/${id}/delete/`);
  return response;
};

export const widgetUpdateChat = async (id: string, values: any): Promise<any> => {
  const response = await PublicAxios.put(`/widgets/chats/${id}/update/`, values);
  return response;
};

export const widgetCreateChat = async (): Promise<PublicChat> => {
  const response = await PublicAxios.post(`/widgets/chats/create/`);
  return response as unknown as PublicChat;
};

export const widgetGetChat = async (id: string): Promise<PublicChat> => {
  const response = await PublicAxios.get(`/widgets/chats/${id}/detail/`);
  return response as unknown as PublicChat;
};

export const createMessage = async (id: string, values: any): Promise<any> => {
  const response = await PublicAxios.post(`/widgets/chats/${id}/create-message/`, values);
  return response;
};

export const createIntegrationMessage = async (id: string, values: any): Promise<BotResponse> => {
  const response = await api.post(`/gpt-integration/chats/${id}/create-message/`, values);
  return response as unknown as BotResponse;
};

export const getManagementChats = async (values: any): Promise<any> => {
  const response = await api.get(`/management/chats/`, { params: values });
  return response as unknown as PublicChat[];
};
