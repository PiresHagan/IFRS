import React, { useState } from 'react';
import { FieldOverride } from '@/types/modelDefinition';
import OverrideField from '@/components/ModelDefinition/OverrideField';
import { OverrideDemoProps } from '@/types/modelDefinitionComponents';

const OverrideDemo: React.FC<OverrideDemoProps> = ({ measurementModel }) => {
  const [overrides, setOverrides] = useState<{ [key: string]: FieldOverride[] }>({});

  const handleOverrideUpdate = (fieldPath: string, fieldOverrides: FieldOverride[]) => {
    setOverrides(prev => ({
      ...prev,
      [fieldPath]: fieldOverrides
    }));
  };

  const getFieldOverrides = (fieldPath: string): FieldOverride[] => {
    return overrides[fieldPath] || [];
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Override System Demo - {measurementModel}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This demonstrates how the override system works with different field types and Line of Business options based on the measurement model.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OverrideField
          label="Mortality Adjustment Factor"
          defaultValue={0.9}
          overrides={getFieldOverrides('mortality.adjustmentFactor')}
          onUpdateOverrides={(overrides) => handleOverrideUpdate('mortality.adjustmentFactor', overrides)}
          measurementModel={measurementModel}
          fieldType="number"
          step="0.01"
          min={0}
          max={2}
          disabled={false}
          required={true}
        />

        <OverrideField
          label="Lapse Rate (Years 1-5) %"
          defaultValue={0.10}
          overrides={getFieldOverrides('lapseLogic.years1to5')}
          onUpdateOverrides={(overrides) => handleOverrideUpdate('lapseLogic.years1to5', overrides)}
          measurementModel={measurementModel}
          fieldType="number"
          step="0.01"
          min={0}
          max={1}
          disabled={false}
          required={true}
        />

        <OverrideField
          label="Discount Rate Method"
          defaultValue="spot_rate_curve"
          overrides={getFieldOverrides('discountRates.method')}
          onUpdateOverrides={(overrides) => handleOverrideUpdate('discountRates.method', overrides)}
          measurementModel={measurementModel}
          fieldType="select"
          selectOptions={[
            { value: 'spot_rate_curve', label: 'Spot Rate Curve' },
            { value: 'flat_rate', label: 'Flat Rate' },
            { value: 'reference_table', label: 'Reference Table' },
            { value: 'no_discounting', label: 'No Discounting' }
          ]}
          disabled={false}
          required={true}
        />

        <OverrideField
          label="Premium Projection Formula"
          defaultValue="= base_premium * lapse_survival[t]"
          overrides={getFieldOverrides('actuarialRules.premiumProjection')}
          onUpdateOverrides={(overrides) => handleOverrideUpdate('actuarialRules.premiumProjection', overrides)}
          measurementModel={measurementModel}
          fieldType="textarea"
          placeholder="Enter actuarial formula"
          disabled={false}
          required={true}
        />

        <OverrideField
          label="Apply Diversification Benefit"
          defaultValue={false}
          overrides={getFieldOverrides('riskAdjustment.diversificationApplied')}
          onUpdateOverrides={(overrides) => handleOverrideUpdate('riskAdjustment.diversificationApplied', overrides)}
          measurementModel={measurementModel}
          fieldType="checkbox"
          disabled={false}
          required={false}
        />

        <OverrideField
          label="Mortality Table Reference"
          defaultValue="CIA_2014_Male"
          overrides={getFieldOverrides('mortality.tableReference')}
          onUpdateOverrides={(overrides) => handleOverrideUpdate('mortality.tableReference', overrides)}
          measurementModel={measurementModel}
          fieldType="text"
          placeholder="e.g., CIA_2014_Male"
          disabled={false}
          required={true}
        />
      </div>

      {Object.keys(overrides).length > 0 && (
        <div className="mt-8">
          <h4 className="text-base font-semibold text-gray-900 mb-4">Current Override Summary</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <pre className="text-xs text-gray-800 overflow-auto">
              {JSON.stringify(overrides, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          Available Line of Business Options for {measurementModel}
        </h4>
        <div className="text-xs text-blue-800">
          {measurementModel === 'GMM' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Term Life Insurance</li>
              <li>Whole Life (Non-PAR)</li>
              <li>Annuities (Immediate / Deferred)</li>
              <li>Group Life Insurance</li>
              <li>Long-Term Disability</li>
              <li>Critical Illness</li>
            </ul>
          )}
          
          {measurementModel === 'PAA' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Auto Insurance</li>
              <li>Home Insurance</li>
              <li>Travel Insurance</li>
              <li>Short-Term Health</li>
              <li>Property & Casualty</li>
              <li>Credit Insurance</li>
              <li>Accident Insurance</li>
            </ul>
          )}
          
          {measurementModel === 'VFA' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Whole Life (PAR)</li>
              <li>Unit-Linked Life Insurance</li>
              <li>Investment-Linked Products</li>
              <li>Universal Life with Investment Account</li>
              <li>Participating Annuities</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverrideDemo; 