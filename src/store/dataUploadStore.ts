import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
  DataUploadBatch,
  DataUpload,
  DataUploadTemplate,
  APIUploadLog,
  DataUploadFilters,
  BatchFilters,
  UploadFormData
} from '@/types/dataUpload';
import {
  dataUploadBatchApi,
  dataUploadApi,
  dataUploadTemplateApi,
  apiUploadLogApi
} from '@/services/dataUpload';

interface DataUploadState {
  batches: DataUploadBatch[];
  currentBatch: DataUploadBatch | null;
  batchFilters: BatchFilters;
  batchesLoading: boolean;
  batchesError: string | null;

  uploads: DataUpload[];
  currentUpload: DataUpload | null;
  uploadFilters: DataUploadFilters;
  uploadsLoading: boolean;
  uploadsError: string | null;

  templates: DataUploadTemplate[];
  templatesLoading: boolean;
  templatesError: string | null;

  apiLogs: APIUploadLog[];
  apiLogsLoading: boolean;
  apiLogsError: string | null;

  activeTab: 'custom' | 'staging' | 'api' | 'historical';
  uploadBlocks: UploadFormData[];
  uploadTrackerData: { [key: string]: boolean };

  fetchBatches: () => Promise<void>;
  setBatchFilters: (filters: BatchFilters) => void;
  createBatch: (data?: Partial<DataUploadBatch>) => Promise<DataUploadBatch | null>;
  setCurrentBatch: (batch: DataUploadBatch | null) => void;
  saveBatch: (id: number) => Promise<void>;
  validateBatch: (id: number) => Promise<void>;

  fetchUploads: (batchId?: number) => Promise<void>;
  setUploadFilters: (filters: DataUploadFilters) => void;
  uploadFile: (data: UploadFormData) => Promise<DataUpload | null>;
  retryValidation: (id: number) => Promise<void>;
  deleteUpload: (id: number) => Promise<void>;

  fetchTemplates: (dataType?: string) => Promise<void>;
  downloadTemplate: (dataType: string) => Promise<void>;

  fetchApiLogs: () => Promise<void>;
  retryApiUpload: (id: number) => Promise<void>;

  setActiveTab: (tab: 'custom' | 'staging' | 'api' | 'historical') => void;
  addUploadBlock: () => void;
  removeUploadBlock: (index: number) => void;
  updateUploadBlock: (index: number, data: Partial<UploadFormData>) => void;
  updateUploadTracker: (dataType: string, uploaded: boolean) => void;
  resetUploadBlocks: () => void;

  clearErrors: () => void;
  reset: () => void;
}

const initialUploadBlock: UploadFormData = {
  insuranceType: 'direct_insurance',
  dataType: 'expense',
  quarter: 'Q1',
  year: new Date().getFullYear(),
};

export const useDataUploadStore = create<DataUploadState>()(
  subscribeWithSelector((set, get) => ({
    batches: [],
    currentBatch: null,
    batchFilters: {},
    batchesLoading: false,
    batchesError: null,

    uploads: [],
    currentUpload: null,
    uploadFilters: {},
    uploadsLoading: false,
    uploadsError: null,

    templates: [],
    templatesLoading: false,
    templatesError: null,

    apiLogs: [],
    apiLogsLoading: false,
    apiLogsError: null,

    activeTab: 'custom',
    uploadBlocks: [{ ...initialUploadBlock }],
    uploadTrackerData: {},

    fetchBatches: async () => {
      set({ batchesLoading: true, batchesError: null });
      try {
        const response = await dataUploadBatchApi.getAll(get().batchFilters);
        set({ 
          batches: response.results?.results || [],
          batchesLoading: false 
        });
      } catch (error) {
        set({ 
          batches: [],
          batchesError: error instanceof Error ? error.message : 'Failed to fetch batches',
          batchesLoading: false 
        });
      }
    },

    setBatchFilters: (filters: BatchFilters) => {
      set({ batchFilters: filters });
      get().fetchBatches();
    },

    createBatch: async (data = {}) => {
      set({ batchesLoading: true, batchesError: null });
      try {
        const response = await dataUploadBatchApi.create(data);
        const newBatch = response.batch;
        
        set(state => ({ 
          batches: [newBatch, ...state.batches],
          currentBatch: newBatch,
          batchesLoading: false 
        }));
        
        return newBatch;
      } catch (error) {
        set({ 
          batchesError: error instanceof Error ? error.message : 'Failed to create batch',
          batchesLoading: false 
        });
        return null;
      }
    },

    setCurrentBatch: (batch: DataUploadBatch | null) => {
      set({ currentBatch: batch });
      if (batch) {
        get().fetchUploads(batch.id);
      }
    },

    saveBatch: async (id: number) => {
      try {
        const response = await dataUploadBatchApi.saveBatch(id);
        const updatedBatch = response.batch;
        
        set(state => ({
          batches: state.batches.map(b => b.id === id ? updatedBatch : b),
          currentBatch: state.currentBatch?.id === id ? updatedBatch : state.currentBatch
        }));
      } catch (error) {
        set({ 
          batchesError: error instanceof Error ? error.message : 'Failed to save batch'
        });
      }
    },

    validateBatch: async (id: number) => {
      try {
        const response = await dataUploadBatchApi.validateBatch(id);
        const updatedBatch = response.batch;
        
        set(state => ({
          batches: state.batches.map(b => b.id === id ? updatedBatch : b),
          currentBatch: state.currentBatch?.id === id ? updatedBatch : state.currentBatch
        }));
      } catch (error) {
        set({ 
          batchesError: error instanceof Error ? error.message : 'Failed to validate batch'
        });
      }
    },

    fetchUploads: async (batchId?: number) => {
      set({ uploadsLoading: true, uploadsError: null });
      try {
        const filters = batchId 
          ? { ...get().uploadFilters, batchId: batchId.toString() }
          : get().uploadFilters;
        
        const response = await dataUploadApi.getAll(filters);
        set({ 
          uploads: response.results?.results || [],
          uploadsLoading: false 
        });
      } catch (error) {
        set({ 
          uploads: [],
          uploadsError: error instanceof Error ? error.message : 'Failed to fetch uploads',
          uploadsLoading: false 
        });
      }
    },

    setUploadFilters: (filters: DataUploadFilters) => {
      set({ uploadFilters: filters });
      get().fetchUploads();
    },

    uploadFile: async (data: UploadFormData) => {
      set({ uploadsLoading: true, uploadsError: null });
      try {
        const currentBatch = get().currentBatch;
        if (!currentBatch) {
          throw new Error('No active batch. Please create a batch first.');
        }

        const uploadData = {
          ...data,
          batch: currentBatch.id,
          source: data.source || 'custom'
        };

        const response = await dataUploadApi.uploadFile(uploadData);
        const newUpload = response.upload;
        
        set(state => ({ 
          uploads: [newUpload, ...state.uploads],
          uploadsLoading: false 
        }));

        get().updateUploadTracker(data.dataType, true);

        await get().fetchBatches();
        
        return newUpload;
      } catch (error) {
        set({ 
          uploadsError: error instanceof Error ? error.message : 'Failed to upload file',
          uploadsLoading: false 
        });
        return null;
      }
    },

    retryValidation: async (id: number) => {
      try {
        const response = await dataUploadApi.retryValidation(id);
        const updatedUpload = response.upload;
        
        set(state => ({
          uploads: state.uploads.map(u => u.id === id ? updatedUpload : u)
        }));
      } catch (error) {
        set({ 
          uploadsError: error instanceof Error ? error.message : 'Failed to retry validation'
        });
      }
    },

    deleteUpload: async (id: number) => {
      try {
        await dataUploadApi.delete(id);
        
        set(state => ({
          uploads: state.uploads.filter(u => u.id !== id)
        }));

        await get().fetchBatches();
      } catch (error) {
        set({ 
          uploadsError: error instanceof Error ? error.message : 'Failed to delete upload'
        });
      }
    },

    fetchTemplates: async (dataType?: string) => {
      set({ templatesLoading: true, templatesError: null });
      try {
        const filters = dataType ? { dataType, isActive: true } : { isActive: true };
        const response = await dataUploadTemplateApi.getAll(filters);
        set({ 
          templates: response.results?.results || [],
          templatesLoading: false 
        });
      } catch (error) {
        set({ 
          templates: [],
          templatesError: error instanceof Error ? error.message : 'Failed to fetch templates',
          templatesLoading: false 
        });
      }
    },

    downloadTemplate: async (dataType: string) => {
      try {
        const { downloadHelpers } = await import('@/services/dataUpload');
        await downloadHelpers.downloadTemplate(dataType);
      } catch (error) {
        set({ 
          templatesError: error instanceof Error ? error.message : 'Failed to download template'
        });
      }
    },

    fetchApiLogs: async () => {
      set({ apiLogsLoading: true, apiLogsError: null });
      try {
        const response = await apiUploadLogApi.getAll();
        set({ 
          apiLogs: response.results?.results || [],
          apiLogsLoading: false 
        });
      } catch (error) {
        set({ 
          apiLogs: [],
          apiLogsError: error instanceof Error ? error.message : 'Failed to fetch API logs',
          apiLogsLoading: false 
        });
      }
    },

    retryApiUpload: async (id: number) => {
      try {
        const response = await apiUploadLogApi.retryUpload(id);
        const updatedLog = response.log;
        
        set(state => ({
          apiLogs: state.apiLogs.map(log => log.id === id ? updatedLog : log)
        }));
      } catch (error) {
        set({ 
          apiLogsError: error instanceof Error ? error.message : 'Failed to retry API upload'
        });
      }
    },

    setActiveTab: (tab: 'custom' | 'staging' | 'api' | 'historical') => {
      set({ activeTab: tab });
    },

    addUploadBlock: () => {
      set(state => ({
        uploadBlocks: [...state.uploadBlocks, { ...initialUploadBlock }]
      }));
    },

    removeUploadBlock: (index: number) => {
      set(state => ({
        uploadBlocks: state.uploadBlocks.filter((_, i) => i !== index)
      }));
    },

    updateUploadBlock: (index: number, data: Partial<UploadFormData>) => {
      set(state => ({
        uploadBlocks: state.uploadBlocks.map((block, i) => 
          i === index ? { ...block, ...data } : block
        )
      }));
    },

    updateUploadTracker: (dataType: string, uploaded: boolean) => {
      set(state => ({
        uploadTrackerData: {
          ...state.uploadTrackerData,
          [dataType]: uploaded
        }
      }));
    },

    resetUploadBlocks: () => {
      set({ 
        uploadBlocks: [{ ...initialUploadBlock }],
        uploadTrackerData: {}
      });
    },

    clearErrors: () => {
      set({
        batchesError: null,
        uploadsError: null,
        templatesError: null,
        apiLogsError: null
      });
    },

    reset: () => {
      set({
        batches: [],
        currentBatch: null,
        batchFilters: {},
        batchesLoading: false,
        batchesError: null,
        uploads: [],
        currentUpload: null,
        uploadFilters: {},
        uploadsLoading: false,
        uploadsError: null,
        templates: [],
        templatesLoading: false,
        templatesError: null,
        apiLogs: [],
        apiLogsLoading: false,
        apiLogsError: null,
        activeTab: 'custom',
        uploadBlocks: [{ ...initialUploadBlock }],
        uploadTrackerData: {},
      });
    },
  }))
); 