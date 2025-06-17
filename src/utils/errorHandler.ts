import { notification } from 'antd';
import axios, { AxiosError } from 'axios';

export const showErrorNotification = (
  error: unknown, 
  title: string = 'Error', 
  defaultMessage: string = 'Something went wrong'
) => {
  let description = defaultMessage;
  
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      const errorData = axiosError.response.data as any;
      description = getErrorMessage(errorData);
    } else if (axiosError.message) {
      description = axiosError.message;
    }
  } else if (error instanceof Error) {
    description = error.message;
  }
  
  notification.error({
    message: title,
    description,
    placement: 'top',
  });
};

export const getErrorMessage = (errorData: any): string => {
  if (typeof errorData === 'string') {
    return errorData;
  }

  for (const key in errorData) {
    if (
      errorData.hasOwnProperty(key) && 
      Array.isArray(errorData[key]) && 
      errorData[key].length > 0
    ) {
      return errorData[key][0];
    }
  }

  if (errorData.detail) {
    return errorData.detail;
  }

  if (errorData.message) {
    return errorData.message;
  }

  return 'An error occurred';
}; 