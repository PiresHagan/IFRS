import React from 'react';
import { DocumentArrowDownIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useDataUploadStore } from '@/store/dataUploadStore';
import BatchManager from './BatchManager';
import UploadBlock from './UploadBlock';
import UploadTracker from './UploadTracker';

const IQStagingUploadTab: React.FC = () => {
  const {
    uploadBlocks,
    currentBatch,
    uploadsError,
    clearErrors,
    downloadTemplate
  } = useDataUploadStore();

  React.useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const handleDownloadStandardTemplate = async () => {
    try {
      // For staging, we typically use a standardized template
      await downloadTemplate('premiums'); // Use premiums as the standard template
    } catch (error) {
      console.error('Error downloading standard template:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Description */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-purple-900 mb-2">IQ Staging Upload</h3>
        <p className="text-sm text-purple-700">
          Upload Excel files that match the predefined IFRS 17 staging template. Files are parsed in memory and 
          validated immediately using the Python validation engine. Parsed data is stored in normalized staging tables.
        </p>
      </div>

      {/* Standard Template Download */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h4 className="text-lg font-medium text-gray-900">Standard Staging Template</h4>
              <p className="text-sm text-gray-600">
                Download the standardized IFRS 17 template with strict structure and validation rules
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadStandardTemplate}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Download Standard Template
          </button>
        </div>
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
              <h3 className="text-lg font-medium text-gray-900">Staging File Upload</h3>

              <div className="space-y-4">
                {uploadBlocks.slice(0, 1).map((block, index) => (
                  <UploadBlock
                    key={index}
                    index={index}
                    data={block}
                    showRemoveButton={false}
                    source="staging"
                  />
                ))}
              </div>

              {/* Staging Upload Instructions */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-purple-900 mb-2">Staging Upload Instructions</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Use only the standard staging template - custom formats are not supported</li>
                  <li>• Files must match the exact column structure and data types in the template</li>
                  <li>• Data is validated immediately upon upload using Python validation engine</li>
                  <li>• Validation errors will be displayed and must be resolved before proceeding</li>
                  <li>• Successfully validated data is stored in normalized staging tables</li>
                  <li>• Only one file can be uploaded at a time for staging</li>
                </ul>
              </div>

              {/* Validation Features */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Validation Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Real-time Validation</div>
                      <div className="text-xs text-gray-600">Immediate feedback on data quality and structure</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Schema Compliance</div>
                      <div className="text-xs text-gray-600">Ensures data matches IFRS 17 requirements</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Data Type Checking</div>
                      <div className="text-xs text-gray-600">Validates numeric, date, and text formats</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Business Rules</div>
                      <div className="text-xs text-gray-600">Applies insurance-specific validation rules</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-gray-500">
                <h3 className="text-lg font-medium mb-2">No Active Batch</h3>
                <p className="text-sm">Create a new batch to start uploading staging files</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Upload Tracker */}
        <div className="lg:col-span-1">
          <UploadTracker 
            title="Staging Progress" 
            showAllDataTypes={false} // Exclude commissions for staging
          />
        </div>
      </div>
    </div>
  );
};

export default IQStagingUploadTab; 