import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useDataUploadStore } from '@/store/dataUploadStore';
import BatchManager from './BatchManager';
import UploadBlock from './UploadBlock';
import UploadTracker from './UploadTracker';

const CustomUploadTab: React.FC = () => {
  const {
    uploadBlocks,
    currentBatch,
    uploadsError,
    addUploadBlock,
    removeUploadBlock,
    clearErrors
  } = useDataUploadStore();

  const handleAddUploadBlock = () => {
    if (uploadBlocks.length < 10) { // Limit to 10 upload blocks
      addUploadBlock();
    }
  };

  const handleRemoveUploadBlock = (index: number) => {
    if (uploadBlocks.length > 1) { // Keep at least one upload block
      removeUploadBlock(index);
    }
  };

  React.useEffect(() => {
    // Clear errors when tab becomes active
    clearErrors();
  }, [clearErrors]);

  return (
    <div className="space-y-6">
      {/* Tab Description */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Custom Upload</h3>
        <p className="text-sm text-blue-700">
          Upload Excel files with custom schemas. Files are stored as-is in the database without parsing at this stage. 
          You can upload multiple files per batch and download custom templates for each data type.
        </p>
      </div>

      {/* Error Display */}
      {uploadsError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{uploadsError}</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Batch Management */}
          <BatchManager />

          {/* Upload Blocks */}
          {currentBatch ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">File Uploads</h3>
                <button
                  onClick={handleAddUploadBlock}
                  disabled={uploadBlocks.length >= 10}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Upload Block
                  {uploadBlocks.length >= 10 && (
                    <span className="ml-2 text-xs">(Max 10)</span>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {uploadBlocks.map((block, index) => (
                  <UploadBlock
                    key={index}
                    index={index}
                    data={block}
                    onRemove={() => handleRemoveUploadBlock(index)}
                    showRemoveButton={uploadBlocks.length > 1}
                    source="custom"
                  />
                ))}
              </div>

              {/* Upload Instructions */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Upload Instructions</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Select the appropriate insurance type, data type, quarter, and year for each file</li>
                  <li>• Download the custom template for each data type to ensure proper formatting</li>
                  <li>• Only Excel files (.xlsx, .xls) are supported, with a maximum size of 50MB</li>
                  <li>• Files are uploaded individually and grouped under the current batch</li>
                  <li>• You can add up to 10 upload blocks per session</li>
                  <li>• Remember to save your batch when all files are uploaded</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-gray-500">
                <h3 className="text-lg font-medium mb-2">No Active Batch</h3>
                <p className="text-sm">Create a new batch to start uploading files</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Upload Tracker */}
        <div className="lg:col-span-1">
          <UploadTracker title="Upload Progress" showAllDataTypes={true} />
        </div>
      </div>
    </div>
  );
};

export default CustomUploadTab; 