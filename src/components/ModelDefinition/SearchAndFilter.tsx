import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useModelDefinitionStore } from '@/store/modelDefinitionStore';

const SearchAndFilter: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    searchTerm,
    statusFilter,
    measurementModelFilter,
    productTypeFilter,
    setSearchTerm,
    setStatusFilter,
    setMeasurementModelFilter,
    setProductTypeFilter,
    resetFilters,
  } = useModelDefinitionStore();

  const hasActiveFilters = statusFilter || measurementModelFilter || productTypeFilter;

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'locked', label: 'Locked' },
  ];

  const measurementModelOptions = [
    { value: '', label: 'All Models' },
    { value: 'GMM', label: 'GMM - General Measurement Model' },
    { value: 'PAA', label: 'PAA - Premium Allocation Approach' },
    { value: 'VFA', label: 'VFA - Variable Fee Approach' },
  ];

  const productTypeOptions = [
    { value: '', label: 'All Product Types' },
    { value: 'Term Life', label: 'Term Life' },
    { value: 'Whole Life', label: 'Whole Life' },
    { value: 'Par Life', label: 'Par Life' },
    { value: 'Universal Life', label: 'Universal Life' },
    { value: 'Annuity', label: 'Annuity' },
    { value: 'Auto Insurance', label: 'Auto Insurance' },
    { value: 'Property Insurance', label: 'Property Insurance' },
    { value: 'Health Insurance', label: 'Health Insurance' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="model-search"
            type="text"
            placeholder="Search models by name, description, or product type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center px-4 py-2 border rounded-md transition-colors ${
            showFilters
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <FunnelIcon className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
              {[statusFilter, measurementModelFilter, productTypeFilter].filter(Boolean).length}
            </span>
          )}
        </button>
        
        {(searchTerm || hasActiveFilters) && (
          <button
            onClick={() => {
              setSearchTerm('');
              resetFilters();
            }}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Clear
          </button>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Measurement Model
              </label>
              <select
                value={measurementModelFilter}
                onChange={(e) => setMeasurementModelFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {measurementModelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>
              <select
                value={productTypeFilter}
                onChange={(e) => setProductTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {productTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {statusFilter && (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Status: {statusOptions.find(o => o.value === statusFilter)?.label}
                    <button
                      onClick={() => setStatusFilter('')}
                      className="ml-1 h-3 w-3 text-blue-600 hover:text-blue-800"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {measurementModelFilter && (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Model: {measurementModelFilter}
                    <button
                      onClick={() => setMeasurementModelFilter('')}
                      className="ml-1 h-3 w-3 text-green-600 hover:text-green-800"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {productTypeFilter && (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                    Type: {productTypeFilter}
                    <button
                      onClick={() => setProductTypeFilter('')}
                      className="ml-1 h-3 w-3 text-purple-600 hover:text-purple-800"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter; 