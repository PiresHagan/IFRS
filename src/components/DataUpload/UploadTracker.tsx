import React from 'react';
import { CheckCircleIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { useDataUploadStore } from '@/store/dataUploadStore';
import { DATA_TYPES, getDataTypeLabel } from '@/types/dataUpload';

interface UploadTrackerProps {
  title?: string;
  showAllDataTypes?: boolean;
}

const UploadTracker: React.FC<UploadTrackerProps> = ({ 
  title = "Upload Progress", 
  showAllDataTypes = true 
}) => {
  const { uploadTrackerData, uploads, currentBatch } = useDataUploadStore();

  // Get uploaded data types from current batch uploads
  const getUploadedDataTypes = () => {
    if (!currentBatch || !uploads) return new Set();
    
    const batchUploads = uploads.filter(upload => upload.batch === currentBatch.id);
    return new Set(batchUploads.map(upload => upload.dataType));
  };

  const uploadedDataTypes = getUploadedDataTypes();

  // Combine tracker data with actual uploads
  const isUploaded = (dataType: string) => {
    return uploadTrackerData[dataType] || uploadedDataTypes.has(dataType);
  };

  const dataTypesToShow = showAllDataTypes 
    ? DATA_TYPES 
    : DATA_TYPES.filter(type => type.value !== 'commissions_paid'); // Exclude commissions for staging

  const completedCount = dataTypesToShow.filter(type => isUploaded(type.value)).length;
  const totalCount = dataTypesToShow.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
      <div className="flex items-center mb-4">
        <CircleStackIcon className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Data Types Uploaded</span>
          <span>{completedCount} of {totalCount}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {progressPercentage.toFixed(0)}% Complete
        </div>
      </div>

      {/* Data Types Checklist */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Data Types</h4>
        
        {dataTypesToShow.map((dataType) => {
          const uploaded = isUploaded(dataType.value);
          
          return (
            <div
              key={dataType.value}
              className={`flex items-center p-3 rounded-lg border transition-colors duration-200 ${
                uploaded 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 mr-3">
                {uploaded ? (
                  <CheckCircleIconSolid className="h-5 w-5 text-green-600" />
                ) : (
                  <CheckCircleIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${
                  uploaded ? 'text-green-900' : 'text-gray-900'
                }`}>
                  {getDataTypeLabel(dataType.value)}
                </div>
                
                {uploaded && (
                  <div className="text-xs text-green-600 mt-1">
                    ✓ Uploaded
                  </div>
                )}
              </div>
              
              {uploaded && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Done
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      {currentBatch && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentBatch.uploadCount}
              </div>
              <div className="text-gray-500">Total Files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {completedCount}
              </div>
              <div className="text-gray-500">Data Types</div>
            </div>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-xs text-blue-600">
          <strong>Tip:</strong> Upload files for each data type to complete your batch. 
          Some data types may be optional depending on your requirements.
        </div>
      </div>
    </div>
  );
};

export default UploadTracker; 