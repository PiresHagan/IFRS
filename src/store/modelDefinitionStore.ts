import { create } from 'zustand';
import { 
  ModelDefinition, 
  ModelDefinitionConfig, 
  CreateModelDefinitionRequest,
  UpdateModelDefinitionRequest 
} from '@/types/modelDefinition';
import { modelDefinitionApi, modelDefinitionHelpers } from '@/services/modelDefinition';

interface ModelDefinitionStore {
  allModels: ModelDefinition[];
  models: ModelDefinition[];
  currentModel: ModelDefinition | null;
  selectedModelId: number | null;
  isLoading: boolean;
  error: string | null;
  
  searchTerm: string;
  statusFilter: string;
  measurementModelFilter: string;
  productTypeFilter: string;
  
  isEditing: boolean;
  hasUnsavedChanges: boolean;
  currentTab: string;
  autoSaveTimer: NodeJS.Timeout | null;
  
  setAllModels: (models: ModelDefinition[]) => void;
  setModels: (models: ModelDefinition[]) => void;
  setCurrentModel: (model: ModelDefinition | null) => void;
  setSelectedModelId: (id: number | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setMeasurementModelFilter: (model: string) => void;
  setProductTypeFilter: (type: string) => void;
  applyFilters: () => void;
  
  setIsEditing: (editing: boolean) => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
  setCurrentTab: (tab: string) => void;
  startAutoSave: () => void;
  stopAutoSave: () => void;
  
  fetchModels: () => Promise<void>;
  fetchModel: (id: number) => Promise<void>;
  createModel: (data: CreateModelDefinitionRequest) => Promise<ModelDefinition | null>;
  updateModel: (id: number, data: Partial<UpdateModelDefinitionRequest>) => Promise<ModelDefinition | null>;
  deleteModel: (id: number) => Promise<boolean>;
  cloneModel: (id: number, name: string, description?: string) => Promise<ModelDefinition | null>;
  lockModel: (id: number) => Promise<boolean>;
  unlockModel: (id: number) => Promise<boolean>;
  
  updateConfig: (config: Partial<ModelDefinitionConfig>) => void;
  updateTabConfig: (tabKey: string, tabConfig: any) => void;
  autoSaveConfig: () => Promise<void>;
  
  clearStore: () => void;
  resetFilters: () => void;
}

export const useModelDefinitionStore = create<ModelDefinitionStore>((set, get) => ({
  allModels: [],
  models: [],
  currentModel: null,
  selectedModelId: null,
  isLoading: false,
  error: null,
  
  searchTerm: '',
  statusFilter: '',
  measurementModelFilter: '',
  productTypeFilter: '',
  
  isEditing: false,
  hasUnsavedChanges: false,
  currentTab: 'general-info',
  autoSaveTimer: null,
  
  setAllModels: (models) => set({ allModels: models }),
  setModels: (models) => set({ models }),
  setCurrentModel: (model) => set({ currentModel: model }),
  setSelectedModelId: (id) => set({ selectedModelId: id }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().applyFilters();
  },
  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().applyFilters();
  },
  setMeasurementModelFilter: (model) => {
    set({ measurementModelFilter: model });
    get().applyFilters();
  },
  setProductTypeFilter: (type) => {
    set({ productTypeFilter: type });
    get().applyFilters();
  },
  
  setIsEditing: (editing) => set({ isEditing: editing }),
  setHasUnsavedChanges: (hasChanges) => set({ hasUnsavedChanges: hasChanges }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  startAutoSave: () => {
    const { autoSaveTimer, stopAutoSave } = get();
    
    if (autoSaveTimer) {
      stopAutoSave();
    }
    
    const timer = setTimeout(() => {
      get().autoSaveConfig();
    }, 900000);
    
    set({ autoSaveTimer: timer });
  },
  
  stopAutoSave: () => {
    const { autoSaveTimer } = get();
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
      set({ autoSaveTimer: null });
    }
  },
  
  fetchModels: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await modelDefinitionApi.list({
        ordering: '-modified_on'
      });
      
      const rawModels = response.results?.results || response.results || [];
      const models = Array.isArray(rawModels) ? rawModels.map(modelDefinitionHelpers.parseFromConfig) : [];
      set({ allModels: models, models: models, isLoading: false });
      
      get().applyFilters();
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch models', isLoading: false });
    }
  },
  
  fetchModel: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await modelDefinitionApi.get(id);
      const parsedModel = modelDefinitionHelpers.parseFromConfig(response.modelDefinition);
      set({ 
        currentModel: parsedModel, 
        selectedModelId: id,
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch model', isLoading: false });
    }
  },
  
  createModel: async (data: CreateModelDefinitionRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await modelDefinitionApi.create(data);
      const newModel = response.modelDefinition;
      
      set((state) => ({
        allModels: [newModel, ...state.allModels],
        models: [newModel, ...state.models],
        currentModel: newModel,
        selectedModelId: newModel.id,
        isLoading: false
      }));
      
      return newModel;
    } catch (error: any) {
      set({ error: error.message || 'Failed to create model', isLoading: false });
      return null;
    }
  },
  
  updateModel: async (id: number, data: Partial<UpdateModelDefinitionRequest>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await modelDefinitionApi.partialUpdate(id, data);
      const updatedModel = response.modelDefinition;
      
      set((state) => ({
        allModels: state.allModels.map(m => m.id === id ? updatedModel : m),
        models: state.models.map(m => m.id === id ? updatedModel : m),
        currentModel: state.currentModel?.id === id ? updatedModel : state.currentModel,
        hasUnsavedChanges: false,
        isLoading: false
      }));
      
      return updatedModel;
    } catch (error: any) {
      set({ error: error.message || 'Failed to update model', isLoading: false });
      return null;
    }
  },
  
  deleteModel: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await modelDefinitionApi.delete(id);
      
      set((state) => ({
        allModels: state.allModels.filter(m => m.id !== id),
        models: state.models.filter(m => m.id !== id),
        currentModel: state.currentModel?.id === id ? null : state.currentModel,
        selectedModelId: state.selectedModelId === id ? null : state.selectedModelId,
        isLoading: false
      }));
      
      return true;
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete model', isLoading: false });
      return false;
    }
  },
  
  cloneModel: async (id: number, name: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await modelDefinitionApi.clone(id, { name, description });
      const clonedModel = response.modelDefinition;
      
      set((state) => ({
        allModels: [clonedModel, ...state.allModels],
        models: [clonedModel, ...state.models],
        isLoading: false
      }));
      
      return clonedModel;
    } catch (error: any) {
      set({ error: error.message || 'Failed to clone model', isLoading: false });
      return null;
    }
  },
  
  lockModel: async (id: number) => {
    try {
      await modelDefinitionApi.lock(id);
      
      set((state) => ({
        allModels: state.allModels.map(m => 
          m.id === id ? { ...m, isLocked: true, canEdit: false } : m
        ),
        models: state.models.map(m => 
          m.id === id ? { ...m, isLocked: true, canEdit: false } : m
        ),
        currentModel: state.currentModel?.id === id 
          ? { ...state.currentModel, isLocked: true, canEdit: false }
          : state.currentModel
      }));
      
      return true;
    } catch (error: any) {
      set({ error: error.message || 'Failed to lock model' });
      return false;
    }
  },
  
  unlockModel: async (id: number) => {
    try {
      await modelDefinitionApi.unlock(id);
      
      set((state) => ({
        allModels: state.allModels.map(m => 
          m.id === id ? { ...m, isLocked: false, canEdit: true } : m
        ),
        models: state.models.map(m => 
          m.id === id ? { ...m, isLocked: false, canEdit: true } : m
        ),
        currentModel: state.currentModel?.id === id 
          ? { ...state.currentModel, isLocked: false, canEdit: true }
          : state.currentModel
      }));
      
      return true;
    } catch (error: any) {
      set({ error: error.message || 'Failed to unlock model' });
      return false;
    }
  },
  
  updateConfig: (config: Partial<ModelDefinitionConfig>) => {
    set((state) => {
      if (!state.currentModel) return state;
      
      const updatedConfig = { ...state.currentModel.config, ...config };
      const updatedModel = { ...state.currentModel, config: updatedConfig };
      
      return {
        currentModel: updatedModel,
        hasUnsavedChanges: true
      };
    });
    
    get().startAutoSave();
  },
  
  updateTabConfig: (tabKey: string, tabConfig: any) => {
    get().updateConfig({ [tabKey]: tabConfig });
  },
  
  autoSaveConfig: async () => {
    const { currentModel, hasUnsavedChanges, updateModel } = get();
    
    if (!currentModel || !hasUnsavedChanges) return;
    
    try {
      await updateModel(currentModel.id, {
        config: currentModel.config
      });
      
      console.log('Auto-saved model configuration');
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  },
  
  clearStore: () => set({
    allModels: [],
    models: [],
    currentModel: null,
    selectedModelId: null,
    isLoading: false,
    error: null,
    searchTerm: '',
    statusFilter: '',
    measurementModelFilter: '',
    productTypeFilter: '',
    isEditing: false,
    hasUnsavedChanges: false,
    currentTab: 'general-info'
  }),
  
  resetFilters: () => {
    set({
      searchTerm: '',
      statusFilter: '',
      measurementModelFilter: '',
      productTypeFilter: ''
    });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { allModels, searchTerm, statusFilter, measurementModelFilter, productTypeFilter } = get();
    
    const filteredModels = allModels.filter(model => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm ? (
        model.name.toLowerCase().includes(searchLower) ||
        model.description.toLowerCase().includes(searchLower) ||
        model.productType.toLowerCase().includes(searchLower)
      ) : true;
      
      const matchesStatus = statusFilter ? model.status === statusFilter : true;
      const matchesMeasurementModel = measurementModelFilter ? model.measurementModel === measurementModelFilter : true;
      const matchesProductType = productTypeFilter ? model.productType === productTypeFilter : true;
      
      return matchesSearch && matchesStatus && matchesMeasurementModel && matchesProductType;
    });
    
    set({ models: filteredModels });
  }
})); 