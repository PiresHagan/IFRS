import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  CheckIcon, 
  LockClosedIcon, 
  LockOpenIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { useModelDefinitionStore } from '@store/modelDefinitionStore';
import { Tab } from '@headlessui/react';

import GeneralInfoTab from '@/components/ModelDefinition/Tabs/GeneralInfoTab';
import FormulaMappingTab from '@/components/ModelDefinition/Tabs/FormulaMappingTab';
import ProjectionAssumptionsTab from '@/components/ModelDefinition/Tabs/ProjectionAssumptionsTab';
import RiskAdjustmentTab from '@/components/ModelDefinition/Tabs/RiskAdjustmentTab';
import DiscountRatesTab from '@/components/ModelDefinition/Tabs/DiscountRatesTab';
import AccountingRulesTab from '@/components/ModelDefinition/Tabs/AccountingRulesTab';
import ActuarialRulesTab from '@/components/ModelDefinition/Tabs/ActuarialRulesTab';
import OverridesViewerTab from '@/components/ModelDefinition/Tabs/OverridesViewerTab';

const ModelDefinitionEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  
  const {
    currentModel,
    isLoading,
    error,
    hasUnsavedChanges,
    fetchModel,
    updateModel,
    lockModel,
    unlockModel,
    setIsEditing,
    setCurrentTab,
    startAutoSave,
    stopAutoSave,
    updateConfig,
    setCurrentModel,
    setHasUnsavedChanges,
  } = useModelDefinitionStore();

  useEffect(() => {
    if (id) {
      fetchModel(parseInt(id));
    }
    
    return () => {
      stopAutoSave();
      setIsEditing(false);
    };
  }, [id]);

  useEffect(() => {
    if (currentModel && currentModel.canEdit) {
      setIsEditing(true);
      startAutoSave();
    }
  }, [currentModel]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = async () => {
    if (!currentModel) return;
    
    const result = await updateModel(currentModel.id, {
      config: currentModel.config
    });
    
    if (result) {
      console.log('Model saved successfully');
    }
  };

  const handleLockToggle = async () => {
    if (!currentModel) return;
    
    if (currentModel.isLocked) {
      await unlockModel(currentModel.id);
    } else {
      await lockModel(currentModel.id);
    }
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedWarning(true);
    } else {
      navigate('/');
    }
  };

  const handleDiscardChanges = () => {
    setShowUnsavedWarning(false);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      </div>
    );
  }

  if (!currentModel) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Model not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The model you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Models
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'general-info', name: 'General Info', icon: '📦' },
    { key: 'formula-mapping', name: 'Formula Mapping', icon: '⚡' },
    { key: 'projection-assumptions', name: 'Projection Assumptions', icon: '📈' },
    { key: 'risk-adjustment', name: 'Risk Adjustment', icon: '💰' },
    { key: 'discount-rates', name: 'Discount Rates', icon: '📊' },
    { key: 'accounting-rules', name: 'Accounting Rules', icon: '📘' },
    { key: 'actuarial-rules', name: 'Actuarial Rules', icon: '🧠' },
    { key: 'overrides-viewer', name: 'Overrides Viewer', icon: '🧾' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 lg:ml-64 bg-white shadow-sm border-b z-40">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-500 hover:text-gray-700 flex-shrink-0"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Back</span>
              </button>
              
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {currentModel.name}
                </h1>
                <div className="flex items-center space-x-2 mt-1 overflow-hidden">
                  <span className="text-sm text-gray-500 flex-shrink-0">
                    v{currentModel.version}
                  </span>
                  <span className="text-sm text-gray-400 flex-shrink-0">•</span>
                  <span className="text-sm text-blue-600 truncate">
                    {currentModel.config?.generalInfo?.measurementModel || ''}
                  </span>
                  <span className="text-sm text-gray-400 flex-shrink-0 hidden sm:inline">•</span>
                  <span className="text-sm text-gray-600 truncate hidden sm:inline">
                    {currentModel.config?.generalInfo?.productType || ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {hasUnsavedChanges && (
                <span className="flex items-center text-sm text-amber-600">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Unsaved changes</span>
                </span>
              )}

              {currentModel.canEdit && (
                <button
                  onClick={handleLockToggle}
                  className={`flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-md ${
                    currentModel.isLocked
                      ? 'text-red-700 bg-red-100 hover:bg-red-200'
                      : 'text-green-700 bg-green-100 hover:bg-green-200'
                  }`}
                >
                  {currentModel.isLocked ? (
                    <>
                      <LockClosedIcon className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Unlock</span>
                    </>
                  ) : (
                    <>
                      <LockOpenIcon className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Lock</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges || isLoading || !currentModel.canEdit}
                className="flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckIcon className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">{isLoading ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

        <Tab.Group onChange={(index) => setCurrentTab(tabs[index].key)}>
        <div className="fixed top-20 left-0 right-0 lg:ml-64 bg-white border-b border-gray-200 z-30">
          <Tab.List className="flex items-center overflow-x-auto w-full px-4 sm:px-6 scrollbar-hide hover:scrollbar-show">
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                className={({ selected }) =>
                  `relative flex-1 px-3 sm:px-6 py-4 text-sm font-medium whitespace-nowrap focus:outline-none transition-colors duration-200 text-center ${
                    selected
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
                  }`
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <div className="px-2" style={{paddingTop: '9rem'}}>
          <Tab.Panels>
              <Tab.Panel className="bg-white">
                <div className="px-6 py-6">
              <GeneralInfoTab
                model={currentModel}
                onUpdate={(updates) => {
                  if (updates.config) {
                    updateConfig(updates.config);
                  } else {
                    const updatedModel = { ...currentModel, ...updates };
                    setCurrentModel(updatedModel);
                    setHasUnsavedChanges(true);
                  }
                }}
                canEdit={currentModel.canEdit}
              />
                </div>
            </Tab.Panel>

              <Tab.Panel className="bg-white">
                <div className="px-6 py-6">
              <FormulaMappingTab
                model={currentModel}
                onUpdate={(updates) => {
                  if (updates.config) {
                    updateConfig(updates.config);
                  }
                }}
                canEdit={currentModel.canEdit}
              />
                </div>
            </Tab.Panel>
            
              <Tab.Panel className="bg-white">
                <div className="px-6 py-6">
              <ProjectionAssumptionsTab
                model={currentModel}
                onUpdate={(updates) => {
                  if (updates.config) {
                    updateConfig(updates.config);
                  }
                }}
                canEdit={currentModel.canEdit}
              />
                </div>
            </Tab.Panel>

              <Tab.Panel className="bg-white">
                <div className="px-6 py-6">
              <RiskAdjustmentTab
                model={currentModel}
                onUpdate={(updates) => {
                  if (updates.config) {
                    updateConfig(updates.config);
                  }
                }}
                canEdit={currentModel.canEdit}
              />
                </div>
            </Tab.Panel>

              <Tab.Panel className="bg-white">
                <div className="px-6 py-6">
              <DiscountRatesTab
                model={currentModel}
                onUpdate={(updates) => {
                  if (updates.config) {
                    updateConfig(updates.config);
                  }
                }}
                canEdit={currentModel.canEdit}
              />
                </div>
            </Tab.Panel>

              <Tab.Panel className="bg-white">
                <div className="px-6 py-6">
              <AccountingRulesTab
                model={currentModel}
                onUpdate={(updates) => {
                  if (updates.config) {
                    updateConfig(updates.config);
                  }
                }}
                canEdit={currentModel.canEdit}
              />
                </div>
            </Tab.Panel>

              <Tab.Panel className="bg-white">
                <div className="px-6 py-6">
              <ActuarialRulesTab
                model={currentModel}
                onUpdate={(updates) => {
                  if (updates.config) {
                    updateConfig(updates.config);
                  }
                }}
                canEdit={currentModel.canEdit}
              />
                </div>
            </Tab.Panel>

              <Tab.Panel className="bg-white">
                <div className="px-6 py-6">
              <OverridesViewerTab
                model={currentModel}
                onUpdate={(updates) => {
                  if (updates.config) {
                    updateConfig(updates.config);
                  }
                }}
                canEdit={currentModel.canEdit}
              />
                </div>
            </Tab.Panel>
          </Tab.Panels>
          </div>
        </Tab.Group>

      {showUnsavedWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Discard Changes?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You have unsaved changes that will be lost if you continue. Are you sure you want to discard your changes?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUnsavedWarning(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={handleDiscardChanges}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelDefinitionEditor; 