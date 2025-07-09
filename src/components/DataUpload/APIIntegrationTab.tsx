import React, { useEffect } from 'react';
import { 
  CloudIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowPathIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useDataUploadStore } from '@/store/dataUploadStore';
import { formatFileSize } from '@/types/dataUpload';

const APIIntegrationTab: React.FC = () => {
  const {
    apiLogs,
    apiLogsLoading,
    apiLogsError,
    fetchApiLogs,
    retryApiUpload,
    clearErrors
  } = useDataUploadStore();

  useEffect(() => {
    clearErrors();
    fetchApiLogs();
  }, [clearErrors, fetchApiLogs]);

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <CloudIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRetryUpload = async (id: number) => {
    await retryApiUpload(id);
  };

  return (
    <div className="space-y-6">
      {/* Tab Description */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-green-900 mb-2">API Integration</h3>
        <p className="text-sm text-green-700">
          Monitor API upload logs showing data received from external systems. This section displays 
          aggregated financial data including premiums, claims, and commissions with their processing status.
        </p>
      </div>

      {/* Error Display */}
      {apiLogsError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{apiLogsError}</div>
        </div>
      )}

      {/* API Upload Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CloudIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(apiLogs || []).length}
              </div>
              <div className="text-sm text-gray-500">Total API Calls</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(apiLogs || []).filter(log => log.status === 'success').length}
              </div>
              <div className="text-sm text-gray-500">Successful</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(apiLogs || []).filter(log => log.status === 'failed').length}
              </div>
              <div className="text-sm text-gray-500">Failed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  (apiLogs || [])
                    .filter(log => log.status === 'success')
                    .reduce((sum, log) => sum + (log.sumOfPremiums || 0), 0)
                )}
              </div>
              <div className="text-sm text-gray-500">Total Premiums</div>
            </div>
          </div>
        </div>
      </div>

      {/* API Upload Log Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">API Upload Log</h3>
          <p className="mt-1 text-sm text-gray-600">
            Recent API uploads and their processing status
          </p>
        </div>

        {apiLogsLoading ? (
          <div className="px-6 py-12">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : (!apiLogs || apiLogs.length === 0) ? (
          <div className="px-6 py-12 text-center">
            <CloudIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No API uploads</h3>
            <p className="mt-1 text-sm text-gray-500">
              API uploads will appear here when data is received from external systems.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reporting Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Premiums
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claims
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(apiLogs || []).map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {new Date(log.reportingDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.uploadDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(log.sumOfPremiums)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(log.sumOfPaidClaims)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(log.sumOfCommissions)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(log.status)}
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        {log.status === 'failed' && (
                          <button
                            onClick={() => handleRetryUpload(log.id)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <ArrowPathIcon className="h-3 w-3 mr-1" />
                            Retry
                          </button>
                        )}
                        {log.dataUploadId && (
                          <span className="text-xs text-gray-400">
                            Upload: {log.dataUploadId}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* API Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">API Integration Information</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• API uploads are automatically processed when data is received from external systems</p>
          <p>• Financial amounts are aggregated and validated before storage</p>
          <p>• Failed uploads can be retried using the retry button</p>
          <p>• Each API upload can be linked to a specific data upload record for traceability</p>
          <p>• API payloads are stored for audit purposes and debugging</p>
        </div>
      </div>
    </div>
  );
};

export default APIIntegrationTab; 