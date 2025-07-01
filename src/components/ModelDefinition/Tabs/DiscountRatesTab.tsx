import React from 'react';
import { FieldOverride } from '@/types/modelDefinition';
import OverrideField from '@/components/ModelDefinition/OverrideField';
import { DiscountRatesTabProps } from '@/types/modelDefinitionComponents';

const DiscountRatesTab: React.FC<DiscountRatesTabProps> = ({ model, onUpdate, canEdit }) => {
  const handleConfigUpdate = (section: string, field: string, value: any) => {
    const updatedConfig = {
      ...model.config,
      discountRates: {
        ...model.config.discountRates,
        [section]: {
          ...model.config.discountRates?.[section],
          [field]: value
        }
      }
    };
    onUpdate({ config: updatedConfig });
  };

  const handleOverrideUpdate = (fieldPath: string, overrides: FieldOverride[]) => {
    const updatedConfig = {
      ...model.config,
      discountRates: {
        ...model.config.discountRates,
        overrides: {
          ...model.config.discountRates?.overrides,
          [fieldPath]: overrides
        }
      }
    };
    onUpdate({ config: updatedConfig });
  };

  const getFieldOverrides = (fieldPath: string): FieldOverride[] => {
    return model.config.discountRates?.overrides?.[fieldPath] || [];
  };

  const discountRates = model.config.discountRates || {};
  const selectedMethod = discountRates.method?.method || 'spot_rate_curve';

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
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Discount Rates</h2>
        <p className="text-sm text-gray-600 mb-6">
          Configure discount rate methodology for present value calculations and financial reporting.
        </p>
      </div>

      <FormSection title="Discounting Method">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Rate Method <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedMethod}
                onChange={(e) => handleConfigUpdate('method', 'method', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="spot_rate_curve">Spot Rate Curve</option>
                <option value="flat_rate">Flat Rate</option>
                <option value="reference_table">Reference Table</option>
                <option value="no_discounting">No Discounting</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useLockedInRate"
                  checked={discountRates.method?.useLockedInRate || false}
                  onChange={(e) => handleConfigUpdate('method', 'useLockedInRate', e.target.checked)}
                  disabled={!canEdit}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="useLockedInRate" className="ml-2 block text-sm text-gray-700">
                  Use Locked-In Rate (GMM/VFA)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="applyToLic"
                  checked={discountRates.method?.applyToLic || false}
                  onChange={(e) => handleConfigUpdate('method', 'applyToLic', e.target.checked)}
                  disabled={!canEdit}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="applyToLic" className="ml-2 block text-sm text-gray-700">
                  Apply Discounting to LIC
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="applyToCsm"
                  checked={discountRates.method?.applyToCsm || false}
                  onChange={(e) => handleConfigUpdate('method', 'applyToCsm', e.target.checked)}
                  disabled={!canEdit}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="applyToCsm" className="ml-2 block text-sm text-gray-700">
                  Apply Discounting to CSM (GMM/VFA only)
                </label>
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      {selectedMethod === 'spot_rate_curve' && (
        <FormSection title="Spot Rate Curve Configuration">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Curve Reference ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={discountRates.spotRateCurve?.rateCurveId || 'Curve_Q1_2025_Life'}
                  onChange={(e) => handleConfigUpdate('spotRateCurve', 'rateCurveId', e.target.value)}
                  disabled={!canEdit}
                  placeholder="References uploaded yield curve"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency <span className="text-red-500">*</span>
                </label>
                <select
                  value={discountRates.spotRateCurve?.currency || 'CAD'}
                  onChange={(e) => handleConfigUpdate('spotRateCurve', 'currency', e.target.value)}
                  disabled={!canEdit}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="CAD">CAD</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Term Range (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={discountRates.spotRateCurve?.termRange || '0-30'}
                  onChange={(e) => handleConfigUpdate('spotRateCurve', 'termRange', e.target.value)}
                  disabled={!canEdit}
                  placeholder="e.g., 0-30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interpolation Method <span className="text-red-500">*</span>
                </label>
                <select
                  value={discountRates.spotRateCurve?.interpolation || 'linear'}
                  onChange={(e) => handleConfigUpdate('spotRateCurve', 'interpolation', e.target.value)}
                  disabled={!canEdit}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="linear">Linear</option>
                  <option value="spline">Spline</option>
                  <option value="step">Step</option>
                </select>
              </div>
            </div>
          </div>
        </FormSection>
      )}

      {selectedMethod === 'flat_rate' && (
        <FormSection title="Flat Rate Configuration">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <OverrideField
                label="Flat Annual Rate"
                defaultValue={discountRates.flatRate?.rate || 0.03}
                overrides={getFieldOverrides('flatRate.rate')}
                onUpdateOverrides={(overrides) => handleOverrideUpdate('flatRate.rate', overrides)}
                onUpdateDefault={(value) => handleConfigUpdate('flatRate', 'rate', value)}
                measurementModel={model.measurementModel}
                fieldType="number"
                step="0.001"
                min={0}
                max={1}
                placeholder="e.g., 0.03 for 3%"
                disabled={!canEdit}
                required={true}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency <span className="text-red-500">*</span>
              </label>
              <select
                value={discountRates.flatRate?.currency || 'CAD'}
                onChange={(e) => handleConfigUpdate('flatRate', 'currency', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </FormSection>
      )}

      {selectedMethod === 'reference_table' && (
        <FormSection title="Reference Table Configuration">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Table ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={discountRates.referenceTable?.tableId || ''}
                  onChange={(e) => handleConfigUpdate('referenceTable', 'tableId', e.target.value)}
                  disabled={!canEdit}
                  placeholder="Named table stored in system"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Source
                </label>
                <input
                  type="text"
                  value={discountRates.referenceTable?.rateSource || 'EIOPA'}
                  onChange={(e) => handleConfigUpdate('referenceTable', 'rateSource', e.target.value)}
                  disabled={!canEdit}
                  placeholder="e.g., EIOPA, OSFI, Bloomberg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={discountRates.referenceTable?.effectiveDate || '2025-01-01'}
                onChange={(e) => handleConfigUpdate('referenceTable', 'effectiveDate', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </FormSection>
      )}

      {selectedMethod === 'no_discounting' && (
        <FormSection title="No Discounting">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>No Discounting Selected:</strong> Cash flows will not be discounted to present value. 
              This is common under PAA for contracts with short claim settlement duration (&lt;12 months).
            </p>
          </div>
        </FormSection>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Discount Rate Configuration Notes</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• The model <strong>only stores references</strong> to curves or rates — actual values come from the Data module</li>
          <li>• Interpolation is applied at runtime using the configured method</li>
          <li>• Override resolution follows: (LOB + Year) &gt; (LOB) &gt; (Year) &gt; Default</li>
          <li>• Multi-LOB configurations allow different discount logic by product line</li>
        </ul>
      </div>
    </div>
  );
};

export default DiscountRatesTab; 