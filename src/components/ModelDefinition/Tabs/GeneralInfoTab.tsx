import React, { useState, useEffect } from 'react';
import { GeneralInfoTabProps } from '@/types/modelDefinitionComponents';
import { ModelDefinitionHistory } from '@/types/modelDefinition';
import { modelDefinitionApi } from '@/services/modelDefinition';

const GeneralInfoTab: React.FC<GeneralInfoTabProps> = ({ model, onUpdate, canEdit }) => {
  const [versions, setVersions] = useState<ModelDefinitionHistory[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>(model.version);
  const [isLoadingVersions, setIsLoadingVersions] = useState(false);

  useEffect(() => {
    fetchVersionHistory();
  }, [model.id]);

  useEffect(() => {
    setSelectedVersion(model.version);
  }, [model.version]);

  const fetchVersionHistory = async () => {
    try {
      setIsLoadingVersions(true);
      const response = await modelDefinitionApi.getHistory(model.id);
      setVersions(response.history || []);
    } catch (error) {
      console.error('Error fetching version history:', error);
    } finally {
      setIsLoadingVersions(false);
    }
  };

  const handleVersionChange = async (version: string) => {
    if (version === model.version) {
      setSelectedVersion(version);
      return;
    }

    const selectedVersionData = versions.find(v => v.version === version);
    if (selectedVersionData) {
      onUpdate({ 
        config: selectedVersionData.config,
        version: selectedVersionData.version
      });
      setSelectedVersion(version);
    }
  };

  const handleConfigUpdate = (field: string, value: any) => {
    const updatedConfig = {
      ...model.config,
      generalInfo: {
        ...model.config.generalInfo,
        [field]: value
      }
    };
    
    onUpdate({ config: updatedConfig });
  };

  const generalInfo = model.config.generalInfo || {} as any;

  const sortedVersions = [...versions].sort((a, b) => {
    const versionA = parseFloat(a.version.replace('v', ''));
    const versionB = parseFloat(b.version.replace('v', ''));
    return versionB - versionA;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">General Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={generalInfo.modelName || model.name || ''}
              onChange={(e) => handleConfigUpdate('modelName', e.target.value)}
              disabled
              placeholder="e.g., Term Life GMM Base Model"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Version
            </label>
            <select
              value={selectedVersion}
              onChange={(e) => handleVersionChange(e.target.value)}
              disabled={!canEdit || isLoadingVersions}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              {isLoadingVersions ? (
                <option>Loading versions...</option>
              ) : (
                sortedVersions.map((version) => (
                  <option key={version.id} value={version.version}>
                    {version.version} {version.version === model.version ? '(Current)' : ''}
                  </option>
                ))
              )}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {selectedVersion !== model.version 
                ? "Selected older version - Save will create new version with this data" 
                : "Auto-incremented upon save"
              }
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={generalInfo.description || ''}
            onChange={(e) => handleConfigUpdate('description', e.target.value)}
            disabled={!canEdit}
            rows={3}
            placeholder="Notes about assumptions, changes, or version intent"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type <span className="text-red-500">*</span>
            </label>
            <select
              value={generalInfo.productType || ''}
              onChange={(e) => handleConfigUpdate('productType', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">Select Product Type</option>
              <option value="Term Life">Term Life</option>
              <option value="Whole Life">Whole Life</option>
              <option value="Annuity">Annuity</option>
              <option value="Auto Insurance">Auto Insurance</option>
              <option value="Property Insurance">Property Insurance</option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Critical Illness">Critical Illness</option>
              <option value="Disability">Disability</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Measurement Model <span className="text-red-500">*</span>
            </label>
            <select
              value={generalInfo.measurementModel || ''}
              onChange={(e) => handleConfigUpdate('measurementModel', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">Select Measurement Model</option>
              <option value="GMM">GMM - General Measurement Model</option>
              <option value="PAA">PAA - Premium Allocation Approach</option>
              <option value="VFA">VFA - Variable Fee Approach</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created By
            </label>
            <input
              type="text"
              value={model.createdByName || 'Unknown'}
              disabled={true}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created Date
            </label>
            <input
              type="text"
              value={model.createdOn ? new Date(model.createdOn).toLocaleDateString() : 'Unknown'}
              disabled={true}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Modified
            </label>
            <input
              type="text"
              value={model.modifiedOn ? new Date(model.modifiedOn).toLocaleString() : 'Unknown'}
              disabled={true}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Modified By
            </label>
            <input
              type="text"
              value={model.lastModifiedByName || 'Unknown'}
              disabled={true}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={generalInfo.status || 'draft'}
              onChange={(e) => handleConfigUpdate('status', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
            </select>
          </div>
          
          <div>
            
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Template
          </label>
          <input
            type="text"
            value={model.clonedFrom || '-'}
            disabled={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">Shows source model if cloned</p>
        </div>

        {selectedVersion !== model.version && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">Version Selected</h3>
            <p className="text-xs text-amber-800">
              You have selected version <strong>{selectedVersion}</strong>. When you save, a new version will be created with this configuration as the base.
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">System Behavior</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <strong>Versioning:</strong> First save = v1.0. Subsequent changes increment to v1.1, v1.2, etc.</li>
          <li>• <strong>Draft:</strong> Editable and not applied in reporting</li>
          <li>• <strong>Active:</strong> Cannot be edited, but used in reporting calculations</li>
          <li>• <strong>Locked:</strong> Archived and not used in any system processes</li>
          <li>• <strong>Version History:</strong> Select older versions to base new configurations on existing data</li>
        </ul>
      </div>
    </div>
  );
};

export default GeneralInfoTab; 