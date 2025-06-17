import api, { AxiosFormData } from "./api";

export const sourceUpload = async (values: FormData): Promise<any> => {
  const response = await AxiosFormData.post("/bot/source/upload/", values);
  return response;
};

export const getSource = async (id: string, values: any): Promise<any> => {
  const response = await api.get(`/bot/${id}/source/`, values);
  return response;
};

export const botIntegration = async (id: string, values: any): Promise<any> => {
  const response = await api.post(`/bot/${id}/integration/`, values);
  return response;
};

export const playgroundVoice = async (id: string, values: any): Promise<any> => {
  const response = await api.post(`/bot/playground/${id}/voice/`, values);
  return response;
};

export const updateBot = async (id: string, values: any): Promise<any> => {
  const response = await api.put(`/bot/${id}/`, values);
  return response;
};

export const deleteBot = async (id: string): Promise<any> => {
  const response = await api.delete(`/bot/${id}`);
  return response;
};

export const botUpload = async (values: any, formData: FormData): Promise<any> => {
  const response = await AxiosFormData.post(`/bot/upload/?embedding=${values.embedding}&model=${values.model}`, formData);
  return response;
};

export const postBot = async (values: any): Promise<any> => {
  const response = await api.post("/bot", values);
  return response;
};

export const deleteDS = async (id: string, dsId: string): Promise<any> => {
  const response = await api.delete(`/bot/${id}/source/${dsId}`);
  return response;
};

export const refreshDS = async (id: string, dsId: string): Promise<any> => {
  const response = await api.post(`/bot/${id}/source/${dsId}/refresh`);
  return response;
};
