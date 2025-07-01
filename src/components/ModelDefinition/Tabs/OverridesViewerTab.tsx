import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { OverrideEntry, OverridesViewerTabProps } from '@/types/modelDefinitionComponents';

const OverridesViewerTab: React.FC<OverridesViewerTabProps> = ({ model }) => {
  const [viewMode, setViewMode] = useState<'table' | 'json'>('table');
  const [expandedTabs, setExpandedTabs] = useState<Set<string>>(new Set());

  const extractOverrides = (): OverrideEntry[] => {
    const overrides: OverrideEntry[] = [];
    const config = model.config;

    const addOverrideIfDifferent = (
      tab: string,
      section: string,
      field: string,
      baseValue: any,
      overrideValue: any,
      lob: string,
      year: string | number
    ) => {
      if (JSON.stringify(baseValue) !== JSON.stringify(overrideValue)) {
        overrides.push({
          tab,
          section,
          field,
          lob,
          year,
          defaultValue: baseValue,
          overriddenValue: overrideValue
        });
      }
    };

    if (config.projectionAssumptions?.overrides) {
      Object.keys(config.projectionAssumptions.overrides).forEach(fieldPath => {
        const fieldOverrides = config.projectionAssumptions?.overrides?.[fieldPath];
        if (Array.isArray(fieldOverrides)) {
          fieldOverrides.forEach(override => {
            const pathParts = fieldPath.split('.');
            let baseValue = config.projectionAssumptions as any;
            pathParts.forEach(part => {
              baseValue = baseValue?.[part];
            });

            addOverrideIfDifferent(
              'Projection Assumptions',
              pathParts[0],
              pathParts.slice(1).join('.') || pathParts[0],
              baseValue,
              override.value,
              override.lob,
              override.year
            );
          });
        }
      });
    }

    if (config.riskAdjustment?.overrides) {
      Object.keys(config.riskAdjustment.overrides).forEach(fieldPath => {
        const fieldOverrides = config.riskAdjustment?.overrides?.[fieldPath];
        if (Array.isArray(fieldOverrides)) {
          fieldOverrides.forEach(override => {
            const pathParts = fieldPath.split('.');
            let baseValue = config.riskAdjustment as any;
            pathParts.forEach(part => {
              baseValue = baseValue?.[part];
            });

            addOverrideIfDifferent(
              'Risk Adjustment',
              pathParts[0],
              pathParts.slice(1).join('.') || pathParts[0],
              baseValue,
              override.value,
              override.lob,
              override.year
            );
          });
        }
      });
    }

    if (config.discountRates?.overrides) {
      Object.keys(config.discountRates.overrides).forEach(fieldPath => {
        const fieldOverrides = config.discountRates?.overrides?.[fieldPath];
        if (Array.isArray(fieldOverrides)) {
          fieldOverrides.forEach(override => {
            const pathParts = fieldPath.split('.');
            let baseValue = config.discountRates as any;
            pathParts.forEach(part => {
              baseValue = baseValue?.[part];
            });

            addOverrideIfDifferent(
              'Discount Rates',
              pathParts[0],
              pathParts.slice(1).join('.') || pathParts[0],
              baseValue,
              override.value,
              override.lob,
              override.year
            );
          });
        }
      });
    }

    if (config.actuarialRules?.overrides) {
      Object.keys(config.actuarialRules.overrides).forEach(fieldPath => {
        const fieldOverrides = config.actuarialRules?.overrides?.[fieldPath];
        if (Array.isArray(fieldOverrides)) {
          fieldOverrides.forEach(override => {
            const pathParts = fieldPath.split('.');
            let baseValue = config.actuarialRules as any;
            pathParts.forEach(part => {
              baseValue = baseValue?.[part];
            });

            addOverrideIfDifferent(
              'Actuarial Rules',
              pathParts[0],
              pathParts.slice(1).join('.') || pathParts[0],
              baseValue,
              override.value,
              override.lob,
              override.year
            );
          });
        }
      });
    }

    if (config.accountingRules?.overrides) {
      Object.keys(config.accountingRules.overrides).forEach(fieldPath => {
        const fieldOverrides = config.accountingRules?.overrides?.[fieldPath];
        if (Array.isArray(fieldOverrides)) {
          fieldOverrides.forEach(override => {
            const pathParts = fieldPath.split('.');
            let baseValue = config.accountingRules as any;
            pathParts.forEach(part => {
              baseValue = baseValue?.[part];
            });

            addOverrideIfDifferent(
              'Accounting Rules',
              pathParts[0],
              pathParts.slice(1).join('.') || pathParts[0],
              baseValue,
              override.value,
              override.lob,
              override.year
            );
          });
        }
      });
    }

    return overrides;
  };

  const overrideEntries = extractOverrides();
  
  const groupedOverrides = overrideEntries.reduce((acc, entry) => {
    if (!acc[entry.tab]) {
      acc[entry.tab] = [];
    }
    acc[entry.tab].push(entry);
    return acc;
  }, {} as Record<string, OverrideEntry[]>);

  const toggleTabExpansion = (tab: string) => {
    const newExpanded = new Set(expandedTabs);
    if (newExpanded.has(tab)) {
      newExpanded.delete(tab);
    } else {
      newExpanded.add(tab);
    }
    setExpandedTabs(newExpanded);
  };

  const exportOverrides = () => {
    const exportData = {
      modelName: model.name,
      version: model.version,
      exportDate: new Date().toISOString(),
      overrides: overrideEntries
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${model.name}_overrides_${model.version}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Overrides Viewer</h2>
        <p className="text-sm text-gray-600 mb-6">
          Centralized, read-only summary of all fields overridden by Line of Business (LoB) and/or Year 
          across model configuration tabs. Useful for auditing, transparency, and QA during model validation.
        </p>
      </div>

      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">View Mode:</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'table' | 'json')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="table">Table View</option>
              <option value="json">JSON Diff View</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            {overrideEntries.length} override{overrideEntries.length !== 1 ? 's' : ''} found
          </div>
        </div>

        <button
          onClick={exportOverrides}
          className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      {viewMode === 'table' ? (
        <div className="space-y-6">
          {overrideEntries.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600">No overrides configured for this model.</p>
              <p className="text-sm text-gray-500 mt-2">
                Overrides will appear here when you configure Line of Business or Year-specific values in other tabs.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-700 border-b border-gray-200">
                <div className="col-span-2">Tab</div>
                <div className="col-span-2">Section</div>
                <div className="col-span-2">Field Name</div>
                <div className="col-span-1">Line of Business</div>
                <div className="col-span-1">Year</div>
                <div className="col-span-2">Default Value</div>
                <div className="col-span-2">Overridden Value</div>
              </div>
              
              {overrideEntries.map((entry, index) => (
                <div key={index} className={`grid grid-cols-12 gap-4 p-4 text-sm border-b border-gray-100 last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <div className="col-span-2 font-medium text-gray-900">{entry.tab}</div>
                  <div className="col-span-2 text-gray-700">{entry.section}</div>
                  <div className="col-span-2 text-gray-900">{entry.field}</div>
                  <div className="col-span-1 text-blue-600 font-medium">{entry.lob}</div>
                  <div className="col-span-1 text-blue-600">{entry.year}</div>
                  <div className="col-span-2 text-gray-600 font-mono text-xs truncate">
                    {formatValue(entry.defaultValue)}
                  </div>
                  <div className="col-span-2 text-green-700 font-mono text-xs font-medium truncate">
                    {formatValue(entry.overriddenValue)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {Object.keys(groupedOverrides).length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600">No overrides to display in JSON format.</p>
            </div>
          ) : (
            Object.keys(groupedOverrides).map(tab => (
              <div key={tab} className="bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleTabExpansion(tab)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="font-medium text-gray-900">{tab}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {groupedOverrides[tab].length} override{groupedOverrides[tab].length !== 1 ? 's' : ''}
                    </span>
                    {expandedTabs.has(tab) ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {expandedTabs.has(tab) && (
                  <div className="border-t border-gray-200 p-4">
                    <pre className="bg-gray-50 p-4 rounded-md text-xs overflow-auto max-h-96 text-gray-800">
                      {JSON.stringify(groupedOverrides[tab], null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Override System Notes</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Pulls from each tab's config block and its associated overrides (LOB-Year indexed)</li>
          <li>• Automatically collapses identical values (does not show overrides identical to base config)</li>
          <li>• Useful during version review, audit, or troubleshooting misaligned assumptions</li>
          <li>• Color-coding: Default values in gray, overridden values in green</li>
          <li>• Export functionality available for documentation or handoff purposes</li>
        </ul>
      </div>
    </div>
  );
};

export default OverridesViewerTab; 