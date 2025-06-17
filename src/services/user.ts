import api from "./api";

export const createUser = async (values: any): Promise<any> => {
  const response = await api.post("/users/", values);
  return response;
};

export const updateUser = async (id: string, values: any): Promise<any> => {
  const response = await api.put(`/users/${id}/`, values);
  return response;
};

export const toggleUserActive = async (id: string, values: any): Promise<any> => {
  const response = await api.patch(`/users/${id}/toggle_active/`, values);
  return response;
};

export const deleteUser = async (id: string): Promise<any> => {
  const response = await api.delete(`/users/${id}/`);
  return response;
};

export const fetchAllUsers = async (): Promise<any> => {
  const response = await api.get("/users/");
  return response;
};
