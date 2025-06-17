import api from "./api";

export const updateApplication = async (values: any): Promise<any> => {
  const response = await api.post(`/admin/dialoqbase-settings`, values);
  return response;
};
