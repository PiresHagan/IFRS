import api from "./api";
import {
  DataUploadBatch,
  DataUpload,
  DataUploadTemplate,
  APIUploadLog,
  DataUploadBatchResponse,
  DataUploadResponse,
  DataUploadTemplateResponse,
  APIUploadLogResponse,
  SingleDataUploadBatchResponse,
  SingleDataUploadResponse,
  BulkUploadResponse,
  DataUploadFilters,
  BatchFilters,
  UploadFormData,
  BulkUploadData
} from "@/types/dataUpload";

export const dataUploadBatchApi = {
  getAll: async (filters?: BatchFilters): Promise<DataUploadBatchResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.batchStatus) params.append('batch_status', filters.batchStatus);
    if (filters?.createdBy) params.append('created_by', filters.createdBy.toString());
    if (filters?.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const url = `/model-definitions/data-upload-batches/${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response as unknown as DataUploadBatchResponse;
  },

  getById: async (id: number): Promise<SingleDataUploadBatchResponse> => {
    const response = await api.get(`/model-definitions/data-upload-batches/${id}/`);
    return response;
  },

  create: async (data: Partial<DataUploadBatch>): Promise<SingleDataUploadBatchResponse> => {
    const response = await api.post('/model-definitions/data-upload-batches/', data);
    return response;
  },

  update: async (id: number, data: Partial<DataUploadBatch>): Promise<SingleDataUploadBatchResponse> => {
    const response = await api.put(`/model-definitions/data-upload-batches/${id}/`, data);
    return response;
  },

  delete: async (id: number): Promise<{ detail: string }> => {
    const response = await api.delete(`/model-definitions/data-upload-batches/${id}/`);
    return response;
  },

  saveBatch: async (id: number): Promise<SingleDataUploadBatchResponse> => {
    const response = await api.post(`/model-definitions/data-upload-batches/${id}/save_batch/`);
    return response;
  },

  validateBatch: async (id: number): Promise<SingleDataUploadBatchResponse> => {
    const response = await api.post(`/model-definitions/data-upload-batches/${id}/validate_batch/`);
    return response;
  },
};

export const dataUploadApi = {
  getAll: async (filters?: DataUploadFilters): Promise<DataUploadResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.source) params.append('source', filters.source);
    if (filters?.insuranceType) params.append('insurance_type', filters.insuranceType);
    if (filters?.dataType) params.append('data_type', filters.dataType);
    if (filters?.quarter) params.append('quarter', filters.quarter);
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.validationStatus) params.append('validation_status', filters.validationStatus);
    if (filters?.batchId) params.append('batch__batch_id', filters.batchId);
    if (filters?.uploadId) params.append('upload_id', filters.uploadId);
    if (filters?.uploadedBy) params.append('uploaded_by__username', filters.uploadedBy);
    if (filters?.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const url = `/model-definitions/data-uploads/${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response;
  },

  getById: async (id: number): Promise<SingleDataUploadResponse> => {
    const response = await api.get(`/model-definitions/data-uploads/${id}/`);
    return response;
  },

  create: async (data: Partial<DataUpload>): Promise<SingleDataUploadResponse> => {
    const response = await api.post('/model-definitions/data-uploads/', data);
    return response;
  },

  update: async (id: number, data: Partial<DataUpload>): Promise<SingleDataUploadResponse> => {
    const response = await api.put(`/model-definitions/data-uploads/${id}/`, data);
    return response;
  },

  delete: async (id: number): Promise<{ detail: string }> => {
    const response = await api.delete(`/model-definitions/data-uploads/${id}/`);
    return response;
  },

  uploadFile: async (data: UploadFormData): Promise<SingleDataUploadResponse> => {
    const formData = new FormData();
    formData.append('batch', data.batch?.toString() || '');
    formData.append('source', data.source || 'custom');
    formData.append('insurance_type', data.insuranceType);
    formData.append('data_type', data.dataType);
    formData.append('quarter', data.quarter);
    formData.append('year', data.year.toString());
    
    if (data.file) {
      formData.append('file_upload', data.file);
    }

    const response = await api.post('/model-definitions/data-uploads/upload_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  bulkUpload: async (data: BulkUploadData): Promise<BulkUploadResponse> => {
    const response = await api.post('/model-definitions/data-uploads/bulk_upload/', data);
    return response;
  },

  download: async (id: number): Promise<Blob> => {
    const response = await api.get(`/model-definitions/data-uploads/${id}/download/`, {
      responseType: 'blob',
    });
    return response;
  },

  retryValidation: async (id: number): Promise<SingleDataUploadResponse> => {
    const response = await api.post(`/model-definitions/data-uploads/${id}/retry_validation/`);
    return response;
  },
};

export const dataUploadTemplateApi = {
  getAll: async (filters?: { dataType?: string; isActive?: boolean; isStandardTemplate?: boolean }): Promise<DataUploadTemplateResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.dataType) params.append('data_type', filters.dataType);
    if (filters?.isActive !== undefined) params.append('is_active', filters.isActive.toString());
    if (filters?.isStandardTemplate !== undefined) params.append('is_standard_template', filters.isStandardTemplate.toString());
    
    const queryString = params.toString();
    const url = `/model-definitions/data-upload-templates/${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response;
  },

  getByDataType: async (dataType: string): Promise<DataUploadTemplateResponse> => {
    const response = await api.get(`/model-definitions/data-upload-templates/get_by_data_type/?data_type=${dataType}`);
    return response;
  },

  getById: async (id: number): Promise<{ detail: string; template: DataUploadTemplate }> => {
    const response = await api.get(`/model-definitions/data-upload-templates/${id}/`);
    return response;
  },

  create: async (data: FormData): Promise<{ detail: string; template: DataUploadTemplate }> => {
    const response = await api.post('/model-definitions/data-upload-templates/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  update: async (id: number, data: FormData): Promise<{ detail: string; template: DataUploadTemplate }> => {
    const response = await api.put(`/model-definitions/data-upload-templates/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  delete: async (id: number): Promise<{ detail: string }> => {
    const response = await api.delete(`/model-definitions/data-upload-templates/${id}/`);
    return response;
  },
  
  download: async (id: number): Promise<Blob> => {
    const response = await api.get(`/model-definitions/data-upload-templates/${id}/download/`, {
      responseType: 'blob',
    });
    return response;
  },
};

export const apiUploadLogApi = {
  getAll: async (filters?: { status?: string; reportingDate?: string }): Promise<APIUploadLogResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.reportingDate) params.append('reporting_date', filters.reportingDate);
    
    const queryString = params.toString();
    const url = `/model-definitions/api-upload-logs/${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response;
  },

  getById: async (id: number): Promise<{ detail: string; log: APIUploadLog }> => {
    const response = await api.get(`/model-definitions/api-upload-logs/${id}/`);
    return response;
  },

  retryUpload: async (id: number): Promise<{ detail: string; log: APIUploadLog }> => {
    const response = await api.post(`/model-definitions/api-upload-logs/${id}/retry_upload/`);
    return response;
  },
};

export const createFormDataFromUpload = (upload: UploadFormData): FormData => {
  const formData = new FormData();
  
  if (upload.batch) formData.append('batch', upload.batch.toString());
  formData.append('source', upload.source || 'custom');
  formData.append('insurance_type', upload.insuranceType);
  formData.append('data_type', upload.dataType);
  formData.append('quarter', upload.quarter);
  formData.append('year', upload.year.toString());
  
  if (upload.file) {
    formData.append('file_upload', upload.file);
  }
  
  return formData;
};

export const createTemplateFormData = (template: {
  name: string;
  data_type: string;
  is_standard_template: boolean;
  template_file?: File;
}): FormData => {
  const formData = new FormData();
  
  formData.append('name', template.name);
  formData.append('data_type', template.data_type);
  formData.append('is_standard_template', template.is_standard_template.toString());
  
  if (template.template_file) {
    formData.append('template_file', template.template_file);
  }
  
  return formData;
};

export const downloadFile = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const validationHelpers = {
  validateFile: (file: File): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (file.size > 50 * 1024 * 1024) {
      errors.push('File size cannot exceed 50MB');
    }
    
    const validExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!validExtensions.includes(fileExtension)) {
      errors.push('Only Excel files (.xlsx, .xls) are allowed');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  getValidationStatusColor: (status: string): string => {
    switch (status) {
      case 'validated':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  },
};

export const downloadHelpers = {
  downloadBlob: (blob: Blob, filename: string): void => {
    downloadFile(blob, filename);
  },

  downloadTemplate: async (dataType: string): Promise<void> => {
    try {
      const templatesResponse = await dataUploadTemplateApi.getByDataType(dataType);
      const templates = templatesResponse.results?.results || [];
      
      if (templates.length === 0) {
        throw new Error(`No template found for data type: ${dataType}`);
      }
      
      const template = templates.find(t => t.isActive) || templates[0];
      const blob = await dataUploadTemplateApi.download(template.id);
      
      downloadFile(blob, `${template.name}.xlsx`);
    } catch (error) {
      console.error('Error downloading template:', error);
      throw error;
    }
  },

  downloadUploadedFile: async (uploadId: number, filename: string): Promise<void> => {
    try {
      const blob = await dataUploadApi.download(uploadId);
      downloadFile(blob, filename);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  },
};

export default {
  dataUploadBatchApi,
  dataUploadApi,
  dataUploadTemplateApi,
  apiUploadLogApi,
  createFormDataFromUpload,
  createTemplateFormData,
  downloadFile,
  validationHelpers,
  downloadHelpers,
}; 