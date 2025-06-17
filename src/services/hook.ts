import api from "./api";

export const postTTS = async (values: any): Promise<any> => {
  const response = await api.post("/voice/11labs/tts", values);
  return response;
};
