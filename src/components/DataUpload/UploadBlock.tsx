import React, { useRef, useState } from 'react';
import { 
  DocumentArrowUpIcon, 
  TrashIcon, 
  DocumentIcon,
  CloudArrowUpIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { useDataUploadStore } from '@/store/dataUploadStore';
import { 
  INSURANCE_TYPES, 
  DATA_TYPES, 
  QUARTERS, 
  getYearOptions,
  UploadFormData,
  formatFileSize 
} from '@/types/dataUpload';
import { validationHelpers } from '@/services/dataUpload';

interface UploadBlockProps {
  index: number;
  data: UploadFormData;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  source?: 'custom' | 'staging';
}

const UploadBlock: React.FC<UploadBlockProps> = ({
  index,
  data,
  onRemove,
  showRemoveButton = true,
  source = 'custom'
}) => {
  const { updateUploadBlock, uploadFile, uploadsLoading, downloadTemplate } = useDataUploadStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const yearOptions = getYearOptions();

  const handleFieldChange = (field: keyof UploadFormData, value: any) => {
    updateUploadBlock(index, { [field]: value });
    setFileError(null);
  };

  const handleFileSelect = (file: File) => {
    // Validate file
    const validation = validationHelpers.validateFile(file);
    if (!validation.isValid) {
      setFileError(validation.errors.join(', '));
      return;
    }

    setFileError(null);
    handleFieldChange('file', file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!data.file) {
      setFileError('Please select a file to upload');
      return;
    }

    setUploading(true);
    try {
      const uploadData: UploadFormData = {
        ...data,
        source: source
      };
      
      const result = await uploadFile(uploadData);
      if (result) {
        setUploaded(true);
      }
    } catch (error) {
      setFileError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      await downloadTemplate(data.dataType);
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  const isFormValid = data.insuranceType && data.dataType && data.quarter && data.year;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">
          Upload Block #{index + 1}
        </h4>
        {showRemoveButton && onRemove && (
          <button
            onClick={onRemove}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
            title="Remove upload block"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Metadata Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Type <span className="text-red-500">*</span>
          </label>
          <select
            value={data.insuranceType}
            onChange={(e) => handleFieldChange('insuranceType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {INSURANCE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Type <span className="text-red-500">*</span>
          </label>
          <select
            value={data.dataType}
            onChange={(e) => handleFieldChange('dataType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {DATA_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quarter <span className="text-red-500">*</span>
          </label>
          <select
            value={data.quarter}
            onChange={(e) => handleFieldChange('quarter', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {QUARTERS.map((quarter) => (
              <option key={quarter.value} value={quarter.value}>
                {quarter.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year <span className="text-red-500">*</span>
          </label>
          <select
            value={data.year}
            onChange={(e) => handleFieldChange('year', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {yearOptions.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Template Download */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <DocumentIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">Download template for {data.dataType}</span>
        </div>
        <button
          onClick={handleDownloadTemplate}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Download Template
        </button>
      </div>

      {/* File Upload Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Excel File <span className="text-red-500">*</span>
        </label>
        
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 cursor-pointer ${
            dragOver
              ? 'border-blue-400 bg-blue-50'
              : data.file
              ? 'border-green-300 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${uploaded ? 'border-green-500 bg-green-100' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          {uploaded ? (
            <div className="flex flex-col items-center">
              <CheckCircleIcon className="h-12 w-12 text-green-500 mb-2" />
              <p className="text-sm font-medium text-green-700">File uploaded successfully!</p>
              <p className="text-xs text-green-600 mt-1">{data.file?.name}</p>
            </div>
          ) : data.file ? (
            <div className="flex flex-col items-center">
              <DocumentIcon className="h-12 w-12 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-700">{data.file.name}</p>
              <p className="text-xs text-gray-500 mt-1">{formatFileSize(data.file.size)}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">
                Drag and drop your Excel file here
              </p>
              <p className="text-xs text-gray-500 mt-1">
                or click to browse (.xlsx, .xls files only)
              </p>
            </div>
          )}
        </div>

        {fileError && (
          <div className="mt-2 text-sm text-red-600">
            {fileError}
          </div>
        )}
      </div>

      {/* Upload Button */}
      {!uploaded && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={!isFormValid || !data.file || uploading || uploadsLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <CloudArrowUpIcon className="animate-spin h-4 w-4 mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                Upload File
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadBlock; 