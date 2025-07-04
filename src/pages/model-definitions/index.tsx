import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { useModelDefinitionStore } from '@/store/modelDefinitionStore';
import { modelDefinitionHelpers } from '@/services/modelDefinition';
import { ModelDefinition } from '@/types/modelDefinition';
import CreateModelModal from '@components/ModelDefinition/CreateModelModal';
import ModelCard from '@components/ModelDefinition/ModelCard';
import SearchAndFilter from '@components/ModelDefinition/SearchAndFilter';

const ModelDefinitions = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [recentModels, setRecentModels] = useState<ModelDefinition[]>([]);
  
  const {
    models,
    allModels,
    isLoading,
    error,
    fetchModels,
    setSelectedModelId,
    searchTerm,
    statusFilter,
    measurementModelFilter,
    productTypeFilter,
  } = useModelDefinitionStore();

  useEffect(() => {
    fetchModels();
    
    loadRecentModels();
  }, []);

  useEffect(() => {
    if (allModels.length > 0) {
      loadRecentModels();
    }
  }, [allModels]);

  const loadRecentModels = async () => {
    try {
      const recent = await modelDefinitionHelpers.getRecentModels(allModels);
      setRecentModels(recent);
    } catch (error) {
      console.error('Failed to load recent models:', error);
    }
  };

  const handleOpenModel = (model: ModelDefinition) => {
    setSelectedModelId(model.id);
    navigate(`/model-definitions/${model.id}`);
  };

  const handleCreateNew = () => {
    setShowCreateModal(true);
  };

  const handleCreateSuccess = (newModel: ModelDefinition) => {
    setShowCreateModal(false);
    navigate(`/model-definitions/${newModel.id}`);
  };

  if (isLoading && (!models || models.length === 0)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Model Configurations</h1>
        <p className="mt-2 text-gray-600">
          Create and manage IFRS 17 model definitions for actuarial calculations
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleCreateNew}
                className="flex items-center justify-center px-6 py-4 border-2 border-blue-500 rounded-lg text-blue-500 hover:border-blue-400 hover:bg-blue-50 transition-colors group"
              >
                <PlusIcon className="h-8 w-8 mr-3 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-lg">Create New Model</div>
                  <div className="text-sm">Start with a blank configuration</div>
                </div>
              </button>

              <button
                onClick={() => {
                  if (models && models.length > 0) {
                    document.getElementById('model-search')?.focus();
                  }
                }}
                className="flex items-center justify-center px-6 py-4 border-2 border-blue-500 rounded-lg text-blue-500 hover:border-blue-400 hover:bg-blue-50 transition-colors group"
              >
                <FolderOpenIcon className="h-8 w-8 mr-3 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-lg">Open Existing Model</div>
                  <div className="text-sm">Browse and open saved models</div>
                </div>
              </button>
            </div>
          </div>

          <SearchAndFilter />

          {models?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {models.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onOpen={() => handleOpenModel(model)}
                />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="text-center py-12">
              <FolderOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No models found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter || measurementModelFilter || productTypeFilter
                  ? 'Try adjusting your search criteria'
                  : 'Get started by creating your first model configuration'}
              </p>
              {!searchTerm && !statusFilter && !measurementModelFilter && !productTypeFilter && (
                <div className="mt-6">
                  <button
                    onClick={handleCreateNew}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create New Model
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Models</h3>
            
            {recentModels.length > 0 ? (
              <div className="space-y-3">
                {recentModels.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => handleOpenModel(model)}
                    className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                          {model.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {modelDefinitionHelpers.formatVersion(model.version)} • {model.measurementModel}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(model.modifiedOn).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${modelDefinitionHelpers.getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">No recent models</p>
              </div>
            )}

            {recentModels.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => {
                    useModelDefinitionStore.getState().resetFilters();
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all models →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateModelModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default ModelDefinitions; 