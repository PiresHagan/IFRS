import React from 'react';
import { FieldOverride } from '@/types/modelDefinition';
import OverrideField from '@/components/ModelDefinition/OverrideField';
import { ProjectionAssumptionsTabProps } from '@/types/modelDefinitionComponents';

const ProjectionAssumptionsTab: React.FC<ProjectionAssumptionsTabProps> = ({ model, onUpdate, canEdit }) => {
  const handleConfigUpdate = (section: string, field: string, value: any) => {
    const currentProjectionAssumptions = model.config.projectionAssumptions || {};
    const currentSection = (currentProjectionAssumptions as any)[section] || {};
    
    const updatedConfig = {
      ...model.config,
      projectionAssumptions: {
        ...currentProjectionAssumptions,
        [section]: {
          ...currentSection,
          [field]: value
        }
      }
    };
    onUpdate({ config: updatedConfig });
  };

  const handleOverrideUpdate = (fieldPath: string, overrides: FieldOverride[]) => {
    const updatedConfig = {
      ...model.config,
      projectionAssumptions: {
        ...model.config.projectionAssumptions,
        overrides: {
          ...model.config.projectionAssumptions?.overrides,
          [fieldPath]: overrides
        }
      }
    };
    onUpdate({ config: updatedConfig });
  };

  const getFieldOverrides = (fieldPath: string): FieldOverride[] => {
    return model.config.projectionAssumptions?.overrides?.[fieldPath] || [];
  };

  const projectionAssumptions = model.config.projectionAssumptions || {};

  const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Projection Assumptions</h2>
        <p className="text-sm text-gray-600 mb-6">
          Configure projection parameters, lapse logic, mortality assumptions, claim settlement, and premium timing patterns.
        </p>
      </div>

      <FormSection title="Projection Horizon">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projection Start Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={projectionAssumptions.projectionHorizon?.startYear || 2025}
              onChange={(e) => handleConfigUpdate('projectionHorizon', 'startYear', parseInt(e.target.value))}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projection Length (Years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={projectionAssumptions.projectionHorizon?.length || 30}
              onChange={(e) => handleConfigUpdate('projectionHorizon', 'length', parseInt(e.target.value))}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projection Frequency <span className="text-red-500">*</span>
            </label>
            <select
              value={projectionAssumptions.projectionHorizon?.frequency || 'Annual'}
              onChange={(e) => handleConfigUpdate('projectionHorizon', 'frequency', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="Annual">Annual</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection title="Lapse / Termination Logic">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lapse Model Type <span className="text-red-500">*</span>
              </label>
              <select
                value={projectionAssumptions.lapseLogic?.modelType || 'Fixed'}
                onChange={(e) => handleConfigUpdate('lapseLogic', 'modelType', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="Fixed">Fixed</option>
                <option value="Tiered">Tiered</option>
                <option value="Custom Formula">Custom Formula</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surrender Timing <span className="text-red-500">*</span>
              </label>
              <select
                value={projectionAssumptions.lapseLogic?.surrenderTiming || 'Mid-Year'}
                onChange={(e) => handleConfigUpdate('lapseLogic', 'surrenderTiming', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="Mid-Year">Mid-Year</option>
                <option value="End-of-Year">End-of-Year</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <OverrideField
                label="Lapse Rate (Years 1-5) %"
                defaultValue={projectionAssumptions.lapseLogic?.years1to5 || 0.10}
                overrides={getFieldOverrides('lapseLogic.years1to5')}
                onUpdateOverrides={(overrides) => handleOverrideUpdate('lapseLogic.years1to5', overrides)}
                onUpdateDefault={(value) => handleConfigUpdate('lapseLogic', 'years1to5', value)}
                measurementModel={model.measurementModel}
                fieldType="number"
                step="0.01"
                min={0}
                max={1}
                disabled={!canEdit}
                required={true}
              />
            </div>
            
            <div>
              <OverrideField
                label="Lapse Rate (After Year 5) %"
                defaultValue={projectionAssumptions.lapseLogic?.afterYear5 || 0.05}
                overrides={getFieldOverrides('lapseLogic.afterYear5')}
                onUpdateOverrides={(overrides) => handleOverrideUpdate('lapseLogic.afterYear5', overrides)}
                onUpdateDefault={(value) => handleConfigUpdate('lapseLogic', 'afterYear5', value)}
                measurementModel={model.measurementModel}
                fieldType="number"
                step="0.01"
                min={0}
                max={1}
                disabled={!canEdit}
                required={false}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Lapse Formula (Optional)
            </label>
            <textarea
              value={projectionAssumptions.lapseLogic?.customFormula || ''}
              onChange={(e) => handleConfigUpdate('lapseLogic', 'customFormula', e.target.value)}
              disabled={!canEdit}
              rows={2}
              placeholder="Enter custom lapse formula expression"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Mortality / Morbidity Assumptions">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mortality Table Reference <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectionAssumptions.mortality?.tableReference || 'CIA_2014_Male'}
                onChange={(e) => handleConfigUpdate('mortality', 'tableReference', e.target.value)}
                disabled={!canEdit}
                placeholder="e.g., CIA_2014_Male"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <OverrideField
                label="Mortality Adjustment Factor"
                defaultValue={projectionAssumptions.mortality?.adjustmentFactor || 0.9}
                overrides={getFieldOverrides('mortality.adjustmentFactor')}
                onUpdateOverrides={(overrides) => handleOverrideUpdate('mortality.adjustmentFactor', overrides)}
                onUpdateDefault={(value) => handleConfigUpdate('mortality', 'adjustmentFactor', value)}
                measurementModel={model.measurementModel}
                fieldType="number"
                step="0.01"
                min={0}
                max={2}
                disabled={!canEdit}
                required={true}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mortality Improvement Scale
              </label>
              <input
                type="text"
                value={projectionAssumptions.mortality?.improvementScale || 'Scale AA'}
                onChange={(e) => handleConfigUpdate('mortality', 'improvementScale', e.target.value)}
                disabled={!canEdit}
                placeholder="e.g., Scale AA"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Morbidity Table Reference
              </label>
              <input
                type="text"
                value={projectionAssumptions.mortality?.morbidityTable || ''}
                onChange={(e) => handleConfigUpdate('mortality', 'morbidityTable', e.target.value)}
                disabled={!canEdit}
                placeholder="For health coverage products"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="useMorbidity"
              checked={projectionAssumptions.mortality?.useMorbidityInstead || false}
              onChange={(e) => handleConfigUpdate('mortality', 'useMorbidityInstead', e.target.checked)}
              disabled={!canEdit}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
            />
            <label htmlFor="useMorbidity" className="ml-2 block text-sm text-gray-700">
              Use Morbidity Instead (for disability/CI modeling)
            </label>
          </div>
        </div>
      </FormSection>

      <FormSection title="Claim Settlement Logic">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Claim Settlement Lag (Years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={projectionAssumptions.claimSettlement?.lag || 1}
              onChange={(e) => handleConfigUpdate('claimSettlement', 'lag', parseInt(e.target.value))}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Claim Settlement Pattern <span className="text-red-500">*</span>
            </label>
            <select
              value={projectionAssumptions.claimSettlement?.pattern || 'Immediate'}
              onChange={(e) => handleConfigUpdate('claimSettlement', 'pattern', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="Immediate">Immediate</option>
              <option value="Uniform">Uniform</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reserve Timing Basis <span className="text-red-500">*</span>
            </label>
            <select
              value={projectionAssumptions.claimSettlement?.timingBasis || 'End-of-Year'}
              onChange={(e) => handleConfigUpdate('claimSettlement', 'timingBasis', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="Mid-Year">Mid-Year</option>
              <option value="End-of-Year">End-of-Year</option>
              <option value="Exact">Exact</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection title="Premium Timing Pattern">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Premium Pattern <span className="text-red-500">*</span>
              </label>
              <select
                value={projectionAssumptions.premiumTiming?.pattern || 'Level'}
                onChange={(e) => handleConfigUpdate('premiumTiming', 'pattern', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="Level">Level</option>
                <option value="Front-Loaded">Front-Loaded</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recognition Point <span className="text-red-500">*</span>
              </label>
              <select
                value={projectionAssumptions.premiumTiming?.recognitionPoint || 'Beginning'}
                onChange={(e) => handleConfigUpdate('premiumTiming', 'recognitionPoint', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="Beginning">Beginning</option>
                <option value="Mid-Year">Mid-Year</option>
                <option value="End-of-Year">End-of-Year</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ongoing Premium Frequency <span className="text-red-500">*</span>
              </label>
              <select
                value={projectionAssumptions.premiumTiming?.frequency || 'Annual'}
                onChange={(e) => handleConfigUpdate('premiumTiming', 'frequency', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="Annual">Annual</option>
                <option value="Semiannual">Semiannual</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Pattern (JSON Array)
              </label>
              <input
                type="text"
                value={projectionAssumptions.premiumTiming?.customPattern || ''}
                onChange={(e) => handleConfigUpdate('premiumTiming', 'customPattern', e.target.value)}
                disabled={!canEdit}
                placeholder='e.g., [0.5, 0.3, 0.1, 0.1]'
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>
      </FormSection>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Override Support</h3>
        <p className="text-xs text-blue-800 mb-2">
          All fields support overrides by Line of Business (LoB) and Year combinations:
        </p>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Default configuration applies when no overrides exist</li>
          <li>• Override resolution follows: (LOB + Year) &gt; (LOB) &gt; (Year) &gt; Default</li>
          <li>• Only modified fields need to be included in override JSON</li>
          <li>• Missing fields fall back to base configuration</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectionAssumptionsTab; 