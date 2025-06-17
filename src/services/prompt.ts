import { Prompt } from "@/types/prompt";
import api from "./api";

export const createPrompt = async (values: any): Promise<any> => {
  const response = await api.post(`/management/system-prompts/`, values);
  return response;
};

export const updatePrompt = async (id: string, values: any): Promise<any> => {
  const response = await api.put(`/management/system-prompts/${id}/`, values);
  return response;
};

export const deletePrompt = async (id: string): Promise<any> => {
  const response = await api.delete(`/management/system-prompts/${id}/`);
  return response;
};

export const getPrompts = async (): Promise<Prompt[]> => {
  const response = await api.get(`/management/system-prompts/`);
  return response as unknown as Prompt[];
};
