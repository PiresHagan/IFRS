import Axios from "./api";
import {
  ModelDefinition,
  CreateModelDefinitionRequest,
  UpdateModelDefinitionRequest,
  CloneModelDefinitionRequest,
  ModelDefinitionListResponse,
  ModelDefinitionDetailResponse,
  ModelDefinitionHistoryResponse,
} from "@/types/modelDefinition";

const BASE_URL = "/model-definitions";

export const modelDefinitionApi = {
  list: async (params?: {
    status?: string;
    measurementModel?: string;
    productType?: string;
    search?: string;
    ordering?: string;
    page?: number;
  }): Promise<ModelDefinitionListResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params?.status) searchParams.append('status', params.status);
    if (params?.measurementModel) searchParams.append('measurement_model', params.measurementModel);
    if (params?.productType) searchParams.append('product_type', params.productType);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.ordering) searchParams.append('ordering', params.ordering);
    if (params?.page) searchParams.append('page', params.page.toString());

    const queryString = searchParams.toString();
    const url = queryString ? `${BASE_URL}/?${queryString}` : `${BASE_URL}/`;
    
    return await Axios.get(url);
  },

  get: async (id: number): Promise<ModelDefinitionDetailResponse> => {
    return await Axios.get(`${BASE_URL}/${id}/`);
  },

  create: async (data: CreateModelDefinitionRequest): Promise<ModelDefinitionDetailResponse> => {
    return await Axios.post(`${BASE_URL}/`, data);
  },

  update: async (id: number, data: UpdateModelDefinitionRequest): Promise<ModelDefinitionDetailResponse> => {
    return await Axios.put(`${BASE_URL}/${id}/`, data);
  },

  partialUpdate: async (id: number, data: Partial<UpdateModelDefinitionRequest>): Promise<ModelDefinitionDetailResponse> => {
    return await Axios.patch(`${BASE_URL}/${id}/`, data);
  },

  delete: async (id: number): Promise<{ detail: string }> => {
    return await Axios.delete(`${BASE_URL}/${id}/`);
  },

  lock: async (id: number): Promise<{ detail: string; lockedBy: string; lockedAt: string }> => {
    return await Axios.post(`${BASE_URL}/${id}/lock/`);
  },

  unlock: async (id: number): Promise<{ detail: string }> => {
    return await Axios.post(`${BASE_URL}/${id}/unlock/`);
  },

  clone: async (id: number, data: CloneModelDefinitionRequest): Promise<ModelDefinitionDetailResponse> => {
    return await Axios.post(`${BASE_URL}/${id}/clone/`, data);
  },

  getHistory: async (id: number): Promise<ModelDefinitionHistoryResponse> => {
    return await Axios.get(`${BASE_URL}/${id}/history/`);
  },

  listHistory: async (params?: {
    model?: number;
    measurementModel?: string;
    productType?: string;
    search?: string;
    page?: number;
  }): Promise<{ detail: string; results: any }> => {
    const searchParams = new URLSearchParams();
    
    if (params?.model) searchParams.append('model', params.model.toString());
    if (params?.measurementModel) searchParams.append('measurement_model', params.measurementModel);
    if (params?.productType) searchParams.append('product_type', params.productType);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', params.page.toString());

    const queryString = searchParams.toString();
    const url = queryString ? `/model-definitions/history/?${queryString}` : `/model-definitions/history/`;
    
    return await Axios.get(url);
  }
};

export const modelDefinitionHelpers = {
  parseFromConfig: (model: ModelDefinition): ModelDefinition => {
    const generalInfo = model.config?.generalInfo || {};
    
    return {
      ...model,
      name: generalInfo.modelName || model.name,
      description: generalInfo.description !== undefined ? generalInfo.description : model.description,
      productType: generalInfo.productType || '',
      measurementModel: generalInfo.measurementModel || 'GMM',
      status: generalInfo.status || model.status,
    };
  },

  canEdit: (model: ModelDefinition): boolean => {
    return model.canEdit && model.status !== 'locked' && model.status !== 'deleted';
  },

  getMeasurementModelDisplayName: (model: 'GMM' | 'PAA' | 'VFA'): string => {
    const displayNames = {
      GMM: 'General Measurement Model',
      PAA: 'Premium Allocation Approach',
      VFA: 'Variable Fee Approach'
    };
    return displayNames[model];
  },

  getStatusColor: (status: string): string => {
    const colors = {
      draft: 'text-yellow-600 bg-yellow-100',
      active: 'text-green-600 bg-green-100',
      locked: 'text-red-600 bg-red-100',
      deleted: 'text-gray-600 bg-gray-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  },

  formatVersion: (version: string): string => {
    return version.startsWith('v') ? version : `v${version}`;
  },

  getRecentModels: async (useStoreData?: ModelDefinition[]): Promise<ModelDefinition[]> => {
    try {
      if (useStoreData && Array.isArray(useStoreData)) {
        return useStoreData
          .sort((a, b) => new Date(b.modifiedOn).getTime() - new Date(a.modifiedOn).getTime())
          .slice(0, 5);
      }
      
      const response = await modelDefinitionApi.list({
        ordering: '-modified_on'
      });
      
      const models = response.results?.results || response.results || [];
      return Array.isArray(models) ? models.slice(0, 5) : [];
    } catch (error) {
      console.error('Error fetching recent models:', error);
      return [];
    }
  },

  getModelsByProductType: async (productType: string): Promise<ModelDefinition[]> => {
    try {
      const response = await modelDefinitionApi.list({ productType });
      const models = response.results?.results || response.results || [];
      return Array.isArray(models) ? models : [];
    } catch (error) {
      console.error('Error fetching models by product type:', error);
      return [];
    }
  },

  getActiveModels: async (): Promise<ModelDefinition[]> => {
    try {
      const response = await modelDefinitionApi.list({ status: 'active' });
      const models = response.results?.results || response.results || [];
      return Array.isArray(models) ? models : [];
    } catch (error) {
      console.error('Error fetching active models:', error);
      return [];
    }
  }
};

export default modelDefinitionApi; 