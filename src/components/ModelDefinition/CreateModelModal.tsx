import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useModelDefinitionStore } from '@/store/modelDefinitionStore';
import { CreateModelDefinitionRequest } from '@/types/modelDefinition';
import { CreateModelModalProps } from '@/types/modelDefinitionComponents';

const CreateModelModal: React.FC<CreateModelModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productType: '',
    measurementModel: 'GMM' as 'GMM' | 'PAA' | 'VFA',
    clonedFrom: undefined as number | undefined,
  });
  

  const [showCloneOptions, setShowCloneOptions] = useState(false);
  
  const { createModel, models, isLoading, error } = useModelDefinitionStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.productType.trim()) {
      return;
    }

    const createRequest: CreateModelDefinitionRequest = {
      name: formData.name,
      description: formData.description,
      config: {
        generalInfo: {
          modelName: formData.name,
          version: 'v1.0',
          description: formData.description,
          productType: formData.productType,
          measurementModel: formData.measurementModel,
          status: 'draft' as const,
        },
      },
      clonedFrom: formData.clonedFrom,
    };

    const result = await createModel(createRequest);
    if (result) {
      onSuccess(result);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      productType: '',
      measurementModel: 'GMM',
      clonedFrom: undefined,
    });
    setShowCloneOptions(false);
    onClose();
  };

  const handleCloneFromSelect = (modelId: number) => {
    const sourceModel = models.find(m => m.id === modelId);
    if (sourceModel) {
      setFormData(prev => ({
        ...prev,
        productType: sourceModel.productType,
        measurementModel: sourceModel.measurementModel,
        clonedFrom: modelId,
      }));
    }
  };

  const productTypes = [
    'Term Life',
    'Whole Life',
    'Par Life',
    'Universal Life',
    'Annuity',
    'Auto Insurance',
    'Property Insurance',
    'Health Insurance',
    'Other'
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
          
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Create New Model
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <input
                id="clone-option"
                type="checkbox"
                checked={showCloneOptions}
                onChange={(e) => setShowCloneOptions(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="clone-option" className="text-sm font-medium text-gray-700">
                Clone from existing model
              </label>
            </div>

            {showCloneOptions && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Template
                </label>
                <select
                  value={formData.clonedFrom || ''}
                  onChange={(e) => {
                    const modelId = parseInt(e.target.value);
                    handleCloneFromSelect(modelId);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a model to clone from...</option>
                  {models?.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} (v{model.version}) - {model.measurementModel}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Model Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Term Life GMM Base Model"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Optional notes about this model configuration..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type *
                </label>
                <select
                  id="productType"
                  required
                  value={formData.productType}
                  onChange={(e) => setFormData(prev => ({ ...prev, productType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select product type...</option>
                  {productTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="measurementModel" className="block text-sm font-medium text-gray-700 mb-2">
                  Measurement Model *
                </label>
                <select
                  id="measurementModel"
                  required
                  value={formData.measurementModel}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    measurementModel: e.target.value as 'GMM' | 'PAA' | 'VFA' 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GMM">GMM - General Measurement Model</option>
                  <option value="PAA">PAA - Premium Allocation Approach</option>
                  <option value="VFA">VFA - Variable Fee Approach</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.name.trim() || !formData.productType.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Model'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateModelModal; 