import React, { useState } from 'react';
import { 
  EyeIcon, 
  DocumentDuplicateIcon, 
  TrashIcon, 
  LockClosedIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useModelDefinitionStore } from '@/store/modelDefinitionStore';
import { modelDefinitionHelpers } from '@/services/modelDefinition';
import ConfirmationModal from '@/components/Modal/ConfirmationModal';
import { ModelCardProps } from '@/types/modelDefinitionComponents';

const ModelCard: React.FC<ModelCardProps> = ({ model, onOpen }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCloneDialog, setShowCloneDialog] = useState(false);
  const [cloneName, setCloneName] = useState('');
  
  const { deleteModel, cloneModel, isLoading } = useModelDefinitionStore();

  const generalInfo = model.config?.generalInfo || {};
  const description = generalInfo.description || '';
  const status = generalInfo.status || 'draft';
  const productType = generalInfo.productType || '';
  const measurementModel = generalInfo.measurementModel || '';

  const handleDelete = async () => {
    const success = await deleteModel(model.id);
    if (success) {
      setShowDeleteConfirm(false);
    }
  };

  const handleClone = async () => {
    if (!cloneName.trim()) return;
    
    const clonedModel = await cloneModel(model.id, cloneName);
    if (clonedModel) {
      setShowCloneDialog(false);
      setCloneName('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const canEdit = modelDefinitionHelpers.canEdit(model);

  return (
    <>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {model.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">
                  {modelDefinitionHelpers.formatVersion(model.version)}
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm font-medium text-blue-600">
                  {measurementModel}
                </span>
              </div>
            </div>
            
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${modelDefinitionHelpers.getStatusColor(status)}`}>
              {status}
            </span>
          </div>
          
          {description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="p-4">
          <div className="mb-3">
            <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
              {productType}
            </span>
          </div>

          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center">
              <UserIcon className="h-3 w-3 mr-2" />
              <span>Created by {model.createdByName}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-3 w-3 mr-2" />
              <span>Last modified by {model.lastModifiedByName}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-3 w-3 mr-2" />
              <span>Modified {formatDateTime(model.modifiedOn)}</span>
            </div>
            {model.clonedFromName && (
              <div className="flex items-center">
                <DocumentDuplicateIcon className="h-3 w-3 mr-2" />
                <span>Cloned from {model.clonedFromName}</span>
              </div>
            )}
          </div>

          {model.isLocked && (
            <div className="mt-3 flex items-center text-xs text-red-600">
              <LockClosedIcon className="h-3 w-3 mr-1" />
              <span>
                Locked by {model.lockedByName}
                {model.lockedAt && ` on ${formatDate(model.lockedAt)}`}
              </span>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-gray-50 rounded-b-lg border-t border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={onOpen}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
            >
              <EyeIcon className="h-4 w-4 mr-1" />
              {canEdit ? 'Edit' : 'View'}
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setCloneName(`${model.name} - Copy`);
                  setShowCloneDialog(true);
                }}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
                title="Clone model"
              >
                <DocumentDuplicateIcon className="h-4 w-4" />
              </button>

              {canEdit && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                  title="Delete model"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Model"
        message={`Are you sure you want to delete "${model.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
        isLoading={isLoading}
      />

      {showCloneDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Clone Model
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a copy of "{model.name}" with a new name.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Model Name
              </label>
              <input
                type="text"
                value={cloneName}
                onChange={(e) => setCloneName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name for cloned model..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCloneDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleClone}
                disabled={!cloneName.trim() || isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Cloning...' : 'Clone Model'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelCard; 