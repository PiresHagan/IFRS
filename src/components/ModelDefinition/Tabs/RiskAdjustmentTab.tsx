import React from 'react';
import { FieldOverride } from '@/types/modelDefinition';
import OverrideField from '@/components/ModelDefinition/OverrideField';
import { RiskAdjustmentTabProps } from '@/types/modelDefinitionComponents';

const RiskAdjustmentTab: React.FC<RiskAdjustmentTabProps> = ({ model, onUpdate, canEdit }) => {
  const handleConfigUpdate = (section: string, field: string, value: any) => {
    const currentRiskAdjustment = model.config.riskAdjustment || {};
    const currentSection = (currentRiskAdjustment as any)[section] || {};
    
    const updatedConfig = {
      ...model.config,
      riskAdjustment: {
        ...currentRiskAdjustment,
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
      riskAdjustment: {
        ...model.config.riskAdjustment,
        overrides: {
          ...model.config.riskAdjustment?.overrides,
          [fieldPath]: overrides
        }
      }
    };
    onUpdate({ config: updatedConfig });
  };

  const getFieldOverrides = (fieldPath: string): FieldOverride[] => {
    return model.config.riskAdjustment?.overrides?.[fieldPath] || [];
  };

  const riskAdjustment = model.config.riskAdjustment || {};
  const selectedMethod = riskAdjustment.method?.method || 'confidence_level';

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
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Risk Adjustment</h2>
        <p className="text-sm text-gray-600 mb-6">
          Configure risk adjustment calculation method and parameters for uncertainty compensation.
        </p>
      </div>

      <FormSection title="Risk Adjustment Method Selection">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Adjustment Method <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedMethod}
                onChange={(e) => handleConfigUpdate('method', 'method', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="confidence_level">Confidence Level</option>
                <option value="cost_of_capital">Cost of Capital</option>
                <option value="fixed_margin">Fixed Margin</option>
                <option value="percent_of_be">% of Best Estimate</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="applyToLicOnly"
                  checked={riskAdjustment.method?.applyToLicOnly || false}
                  onChange={(e) => handleConfigUpdate('method', 'applyToLicOnly', e.target.checked)}
                  disabled={!canEdit}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="applyToLicOnly" className="ml-2 block text-sm text-gray-700">
                  Apply RA to LIC only
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diversificationApplied"
                  checked={riskAdjustment.method?.diversificationApplied || false}
                  onChange={(e) => handleConfigUpdate('method', 'diversificationApplied', e.target.checked)}
                  disabled={!canEdit}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="diversificationApplied" className="ml-2 block text-sm text-gray-700">
                  Diversification Benefit Applied?
                </label>
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      {selectedMethod === 'confidence_level' && (
        <FormSection title="Confidence Level Parameters">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <OverrideField
                label="Confidence Level"
                defaultValue={riskAdjustment.confidenceLevel?.level || 0.75}
                overrides={getFieldOverrides('confidenceLevel.level')}
                onUpdateOverrides={(overrides) => handleOverrideUpdate('confidenceLevel.level', overrides)}
                onUpdateDefault={(value) => handleConfigUpdate('confidenceLevel', 'level', value)}
                measurementModel={model.measurementModel}
                fieldType="number"
                step="0.01"
                min={0}
                max={1}
                placeholder="e.g., 0.75 for 75th percentile"
                disabled={!canEdit}
                required={true}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distribution Assumption <span className="text-red-500">*</span>
              </label>
              <select
                value={riskAdjustment.confidenceLevel?.distribution || 'Normal'}
                onChange={(e) => handleConfigUpdate('confidenceLevel', 'distribution', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="Normal">Normal</option>
                <option value="Log-Normal">Log-Normal</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Volatility Reference
              </label>
              <input
                type="text"
                value={riskAdjustment.confidenceLevel?.volatilityReference || 'StandardVolatilitySet2025'}
                onChange={(e) => handleConfigUpdate('confidenceLevel', 'volatilityReference', e.target.value)}
                disabled={!canEdit}
                placeholder="Volatility table ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </FormSection>
      )}

      {selectedMethod === 'cost_of_capital' && (
        <FormSection title="Cost of Capital Parameters">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Capital Factor (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={riskAdjustment.costOfCapital?.capitalFactor || 0.10}
                onChange={(e) => handleConfigUpdate('costOfCapital', 'capitalFactor', parseFloat(e.target.value))}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <OverrideField
                label="Cost of Capital Rate (%)"
                defaultValue={riskAdjustment.costOfCapital?.costRate || 0.06}
                overrides={getFieldOverrides('costOfCapital.costRate')}
                onUpdateOverrides={(overrides) => handleOverrideUpdate('costOfCapital.costRate', overrides)}
                onUpdateDefault={(value) => handleConfigUpdate('costOfCapital', 'costRate', value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capital Duration (Years) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={riskAdjustment.costOfCapital?.duration || 10}
                onChange={(e) => handleConfigUpdate('costOfCapital', 'duration', parseInt(e.target.value))}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </FormSection>
      )}

      {selectedMethod === 'fixed_margin' && (
        <FormSection title="Fixed Margin Parameters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fixed Risk Adjustment Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={riskAdjustment.fixedMargin?.amount || 12000}
                onChange={(e) => handleConfigUpdate('fixedMargin', 'amount', parseFloat(e.target.value))}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            
            <div className="flex items-center pt-8">
              <input
                type="checkbox"
                id="applyProRata"
                checked={riskAdjustment.fixedMargin?.applyProRata || false}
                onChange={(e) => handleConfigUpdate('fixedMargin', 'applyProRata', e.target.checked)}
                disabled={!canEdit}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              />
              <label htmlFor="applyProRata" className="ml-2 block text-sm text-gray-700">
                Apply Pro Rata by Year
              </label>
            </div>
          </div>
        </FormSection>
      )}

      {selectedMethod === 'percent_of_be' && (
        <FormSection title="% of Best Estimate Parameters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Adjustment % <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={riskAdjustment.percentOfBe?.percentage || 0.04}
                onChange={(e) => handleConfigUpdate('percentOfBe', 'percentage', parseFloat(e.target.value))}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apply to Which Flow <span className="text-red-500">*</span>
              </label>
              <select
                value={riskAdjustment.percentOfBe?.applyTo || 'claims_only'}
                onChange={(e) => handleConfigUpdate('percentOfBe', 'applyTo', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="claims_only">Claims Only</option>
                <option value="claims_and_expenses">Claims + Expenses</option>
                <option value="all_outflows">All Outflows</option>
              </select>
            </div>
          </div>
        </FormSection>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Risk Adjustment Override Support</h3>
        <p className="text-xs text-blue-800 mb-2">
          Risk adjustment logic can vary by product or year:
        </p>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Configuration engine reads method and applies relevant parameters</li>
          <li>• Unused fields are ignored based on selected method</li>
          <li>• Overrides cascade: (LOB + Year) &gt; (LOB) &gt; (Year) &gt; Default</li>
          <li>• Only changed fields need to be included in override JSON</li>
        </ul>
      </div>
    </div>
  );
};

export default RiskAdjustmentTab; 