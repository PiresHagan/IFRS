import React, { useEffect, useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ArrowPathIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useDataUploadStore } from '@/store/dataUploadStore';
import { 
  DataUploadFilters,
  UPLOAD_SOURCES,
  INSURANCE_TYPES,
  DATA_TYPES,
  QUARTERS,
  VALIDATION_STATUSES,
  getYearOptions,
  getDataTypeLabel,
  getInsuranceTypeLabel,
  getValidationStatusLabel,
  getStatusColor,
  getSourceColor,
  formatFileSize
} from '@/types/dataUpload';
import { downloadHelpers } from '@/services/dataUpload';

const HistoricalUploadsTab: React.FC = () => {
  const {
    uploads,
    uploadsLoading,
    uploadsError,
    fetchUploads,
    setUploadFilters,
    retryValidation,
    deleteUpload,
    clearErrors
  } = useDataUploadStore();

  const [filters, setFilters] = useState<DataUploadFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const yearOptions = getYearOptions();

  useEffect(() => {
    clearErrors();
    fetchUploads();
  }, [clearErrors, fetchUploads]);

  const handleFilterChange = (key: keyof DataUploadFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    setUploadFilters(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    handleFilterChange('search', value);
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchTerm('');
    setUploadFilters({});
  };

  const handleDownloadFile = async (upload: any) => {
    try {
      await downloadHelpers.downloadUploadedFile(upload.id, upload.originalFilename);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleRetryValidation = async (id: number) => {
    await retryValidation(id);
  };

  const handleDeleteUpload = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this upload?')) {
      await deleteUpload(id);
    }
  };

  const getActionButtons = (upload: any) => {
    const buttons = [];

    // View/Download button
    if (upload.fileUpload) {
      buttons.push(
        <button
          key="download"
          onClick={() => handleDownloadFile(upload)}
          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          title="Download file"
        >
          <ArrowDownTrayIcon className="h-3 w-3 mr-1" />
          Download
        </button>
      );
    }

    // Retry button for failed validations
    if (upload.validationStatus === 'failed') {
      buttons.push(
        <button
          key="retry"
          onClick={() => handleRetryValidation(upload.id)}
          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          title="Retry validation"
        >
          <ArrowPathIcon className="h-3 w-3 mr-1" />
          Retry
        </button>
      );
    }

    // Delete button (admin only or own uploads)
    buttons.push(
      <button
        key="delete"
        onClick={() => handleDeleteUpload(upload.id)}
        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        title="Delete upload"
      >
        <TrashIcon className="h-3 w-3 mr-1" />
        Delete
      </button>
    );

    return buttons;
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== '').length;

  return (
    <div className="space-y-6">
      {/* Tab Description */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-yellow-900 mb-2">Historical Uploads</h3>
        <p className="text-sm text-yellow-700">
          A centralized log of all uploads across Custom Upload, Staging Upload, and API Integration. 
          Supports tracking, validation auditing, and file management with comprehensive filtering options.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Search & Filter</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Batch ID, Upload ID, User, or filename..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                value={filters.source || ''}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sources</option>
                {UPLOAD_SOURCES.map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Type</label>
              <select
                value={filters.insuranceType || ''}
                onChange={(e) => handleFilterChange('insuranceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {INSURANCE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
              <select
                value={filters.dataType || ''}
                onChange={(e) => handleFilterChange('dataType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Data Types</option>
                {DATA_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quarter</label>
              <select
                value={filters.quarter || ''}
                onChange={(e) => handleFilterChange('quarter', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Quarters</option>
                {QUARTERS.map((quarter) => (
                  <option key={quarter.value} value={quarter.value}>
                    {quarter.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={filters.year || ''}
                onChange={(e) => handleFilterChange('year', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {yearOptions.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.validationStatus || ''}
                onChange={(e) => handleFilterChange('validationStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {VALIDATION_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3 lg:col-span-6 flex justify-end">
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {uploadsError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{uploadsError}</div>
        </div>
      )}

      {/* Uploads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Upload History</h3>
          <p className="mt-1 text-sm text-gray-600">
            {(uploads || []).length} upload{(uploads || []).length !== 1 ? 's' : ''} found
          </p>
        </div>

        {uploadsLoading ? (
          <div className="px-6 py-12">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : (!uploads || uploads.length === 0) ? (
          <div className="px-6 py-12 text-center">
            <EyeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No uploads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or upload some files to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source & Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Validation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(uploads || []).map((upload) => (
                  <tr key={upload.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {upload.uploadId}
                        </div>
                        <div className="text-sm text-gray-500">
                          Batch: {upload.batchId}
                        </div>
                        <div className="text-xs text-gray-400">
                          By: {upload.uploadedByName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getSourceColor(upload.source)}`}>
                          {upload.source.charAt(0).toUpperCase() + upload.source.slice(1)}
                        </span>
                        <div className="text-xs text-gray-600">
                          {getDataTypeLabel(upload.dataType)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getInsuranceTypeLabel(upload.insuranceType)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>{upload.quarter} {upload.year}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {upload.originalFilename || 'N/A'}
                      </div>
                      {upload.fileSize && (
                        <div className="text-xs text-gray-500">
                          {formatFileSize(upload.fileSize)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(upload.validationStatus)}`}>
                          {getValidationStatusLabel(upload.validationStatus)}
                        </span>
                        <div className="text-xs text-gray-600">
                          {upload.rowsProcessed} rows
                        </div>
                        {upload.errorCount > 0 && (
                          <div className="text-xs text-red-600">
                            {upload.errorCount} errors
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(upload.createdOn).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {getActionButtons(upload)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalUploadsTab; 