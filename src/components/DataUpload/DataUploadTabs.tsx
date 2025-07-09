import React, { useEffect } from 'react';
import { useDataUploadStore } from '@/store/dataUploadStore';
import CustomUploadTab from './CustomUploadTab';
import IQStagingUploadTab from './IQStagingUploadTab';
import APIIntegrationTab from './APIIntegrationTab';
import HistoricalUploadsTab from './HistoricalUploadsTab';

const DataUploadTabs: React.FC = () => {
  const { activeTab, setActiveTab, clearErrors } = useDataUploadStore();

  useEffect(() => {
    // Clear any existing errors when component mounts
    clearErrors();
  }, [clearErrors]);

  const tabs = [
    { id: 'custom', label: 'Custom Upload', component: CustomUploadTab },
    { id: 'staging', label: 'IQ Staging Upload', component: IQStagingUploadTab },
    { id: 'api', label: 'API Integration', component: APIIntegrationTab },
    { id: 'historical', label: 'Historical Uploads', component: HistoricalUploadsTab },
  ] as const;

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component || CustomUploadTab;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900">Data Module</h1>
        <p className="mt-2 text-gray-600">
          Upload and manage IFRS 17 compliance data through multiple channels
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <nav className="-mb-px flex space-x-8 px-6 py-3" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6 px-4">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default DataUploadTabs; 