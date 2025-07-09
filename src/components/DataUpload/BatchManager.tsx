import React, { useEffect } from 'react';
import { PlusIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useDataUploadStore } from '@/store/dataUploadStore';
import { getBatchStatusLabel, getStatusColor } from '@/types/dataUpload';

const BatchManager: React.FC = () => {
  const {
    batches,
    currentBatch,
    batchesLoading,
    batchesError,
    fetchBatches,
    createBatch,
    setCurrentBatch,
    saveBatch,
    validateBatch,
  } = useDataUploadStore();

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const handleCreateBatch = async () => {
    const newBatch = await createBatch();
    if (newBatch) {
      setCurrentBatch(newBatch);
    }
  };

  const handleSaveBatch = async () => {
    if (currentBatch) {
      await saveBatch(currentBatch.id);
    }
  };

  const handleValidateBatch = async () => {
    if (currentBatch) {
      await validateBatch(currentBatch.id);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
      case 'saved':
        return <ExclamationTriangleIcon className="h-4 w-4 text-blue-500" />;
      case 'validated':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Batch Management</h3>
        <button
          onClick={handleCreateBatch}
          disabled={batchesLoading}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create New Batch
        </button>
      </div>

      {batchesError && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{batchesError}</div>
        </div>
      )}

      {/* Current Batch Info */}
      {currentBatch && (
        <div className="mb-6 border border-blue-200 rounded-lg p-4 bg-blue-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {getStatusIcon(currentBatch.batchStatus)}
              <span className="ml-2 text-sm font-medium text-gray-900">
                Current Batch: {currentBatch.batchId}
              </span>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(currentBatch.batchStatus)}`}>
              {getBatchStatusLabel(currentBatch.batchStatus)}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Created By:</span>
              <br />
              <span className="font-medium">{currentBatch.createdByName}</span>
            </div>
            <div>
              <span className="text-gray-500">Upload Count:</span>
              <br />
              <span className="font-medium">{currentBatch.uploadCount}</span>
            </div>
            <div>
              <span className="text-gray-500">Created:</span>
              <br />
              <span className="font-medium">
                {new Date(currentBatch.createdOn).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Batch Actions */}
          <div className="mt-4 flex space-x-3">
            {currentBatch.batchStatus === 'draft' && currentBatch.uploadCount > 0 && (
              <button
                onClick={handleSaveBatch}
                disabled={batchesLoading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                Save Batch
              </button>
            )}
            
            {currentBatch.batchStatus === 'saved' && (
              <button
                onClick={handleValidateBatch}
                disabled={batchesLoading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                Validate Batch
              </button>
            )}
          </div>
        </div>
      )}

      {/* Recent Batches */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Batches</h4>
        
        {batchesLoading ? (
          <div className="animate-pulse space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {(batches || []).slice(0, 5).map((batch) => (
              <div
                key={batch.id}
                onClick={() => setCurrentBatch(batch)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  currentBatch?.id === batch.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(batch.batchStatus)}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {batch.batchId}
                      </div>
                      <div className="text-xs text-gray-500">
                        {batch.uploadCount} uploads • {batch.createdByName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(batch.batchStatus)}`}>
                      {getBatchStatusLabel(batch.batchStatus)}
                    </span>
                    <div className="text-xs text-gray-400">
                      {new Date(batch.createdOn).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {(!batches || batches.length === 0) && !batchesLoading && (
              <div className="text-center py-6 text-gray-500">
                <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm">No batches found</p>
                <p className="text-xs">Create a new batch to get started</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchManager; 