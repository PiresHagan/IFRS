import React from 'react';
import { FieldOverride } from '@/types/modelDefinition';
import OverrideField from '@/components/ModelDefinition/OverrideField';
import { ActuarialRulesTabProps } from '@/types/modelDefinitionComponents';

const ActuarialRulesTab: React.FC<ActuarialRulesTabProps> = ({ model, onUpdate, canEdit }) => {
  const handleConfigUpdate = (section: string, field: string, value: any) => {
    const currentActuarialRules = model.config.actuarialRules || {};
    const currentSection = (currentActuarialRules as any)[section] || {};
    
    const updatedConfig = {
      ...model.config,
      actuarialRules: {
        ...currentActuarialRules,
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
      actuarialRules: {
        ...model.config.actuarialRules,
        overrides: {
          ...model.config.actuarialRules?.overrides,
          [fieldPath]: overrides
        }
      }
    };
    onUpdate({ config: updatedConfig });
  };

  const getFieldOverrides = (fieldPath: string): FieldOverride[] => {
    return model.config.actuarialRules?.overrides?.[fieldPath] || [];
  };

  const actuarialRules = model.config.actuarialRules || {};

  const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {children}
      </div>
    </div>
  );

  const FormulaField = ({ 
    label, 
    field, 
    section, 
    required = false, 
    placeholder, 
    example 
  }: { 
    label: string; 
    field: string; 
    section: string; 
    required?: boolean; 
    placeholder?: string; 
    example?: string; 
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={(actuarialRules as any)[section]?.[field] || ''}
        onChange={(e) => handleConfigUpdate(section, field, e.target.value)}
        disabled={!canEdit}
        rows={2}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
      />
      {example && (
        <p className="text-xs text-gray-500 mt-1">
          <strong>Example:</strong> {example}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Actuarial Calculation Rules</h2>
        <p className="text-sm text-gray-600 mb-6">
          Define configurable formulas used for projecting future cash flows, CSM, liabilities, and risk adjustment. 
          All formulas are stored with override support by Line of Business (LoB) and Year.
        </p>
      </div>

      <FormSection title="Base Cash Flow Formulas">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <OverrideField
                label="Premium Projection"
                defaultValue={actuarialRules.baseCashFlow?.premiumProjection || '= base_premium * lapse_survival[t]'}
                overrides={getFieldOverrides('baseCashFlow.premiumProjection')}
                onUpdateOverrides={(overrides) => handleOverrideUpdate('baseCashFlow.premiumProjection', overrides)}
                onUpdateDefault={(value) => handleConfigUpdate('baseCashFlow', 'premiumProjection', value)}
                measurementModel={model.measurementModel}
                fieldType="textarea"
                placeholder="Calculate future premium cash flows"
                disabled={!canEdit}
                required={true}
              />
              <p className="text-xs text-gray-500 mt-1">
                <strong>Example:</strong> = base_premium * lapse_survival[t]
              </p>
            </div>
            
            <div>
              <OverrideField
                label="Expected Claims"
                defaultValue={actuarialRules.baseCashFlow?.expectedClaims || '= face_amount * mortality_rate[t] * persistency[t]'}
                overrides={getFieldOverrides('baseCashFlow.expectedClaims')}
                onUpdateOverrides={(overrides) => handleOverrideUpdate('baseCashFlow.expectedClaims', overrides)}
                onUpdateDefault={(value) => handleConfigUpdate('baseCashFlow', 'expectedClaims', value)}
                measurementModel={model.measurementModel}
                fieldType="textarea"
                placeholder="Calculate incurred claims"
                disabled={!canEdit}
                required={true}
              />
              <p className="text-xs text-gray-500 mt-1">
                <strong>Example:</strong> = face_amount * mortality_rate[t] * persistency[t]
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormulaField
              label="Maintenance Expenses"
              field="maintenanceExpenses"
              section="baseCashFlow"
              required={true}
              placeholder="Calculate fixed/variable expenses"
              example="= fixed_expense + (expense_rate * base_premium)"
            />
            
            <FormulaField
              label="Commission"
              field="commission"
              section="baseCashFlow"
              placeholder="Calculate commissions if applicable"
              example="= commission_rate * base_premium"
            />
          </div>
          
          <FormulaField
            label="Benefit Payment"
            field="benefitPayment"
            section="baseCashFlow"
            required={true}
            placeholder="Define benefit payout cash flows"
            example="= claim_amount * claim_probability[t]"
          />
        </div>
      </FormSection>

      <FormSection title="CSM & Liability Rollforward">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormulaField
              label="Discounted Cash Flow"
              field="discountedCashflow"
              section="csmLiability"
              required={true}
              placeholder="Apply discount rate to future cash flows"
              example="= cashflow[t] / pow(1 + discount_rate[t], t)"
            />
            
            <FormulaField
              label="CSM Release"
              field="csmRelease"
              section="csmLiability"
              required={true}
              placeholder="Service-based release of CSM over time"
              example="= opening_csm * coverage_units[t] / total_units[t]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormulaField
              label="CSM Adjustment"
              field="csmAdjustment"
              section="csmLiability"
              placeholder="Adjusts CSM for assumption changes or experience"
              example="= delta_assumptions[t] + experience_adjustment[t]"
            />
            
            <FormulaField
              label="Liability for Remaining Coverage"
              field="liabilityForRemainingCoverage"
              section="csmLiability"
              required={true}
              placeholder="Projects remaining liability"
              example="= PV_Future_Cashflows[t] + RA[t] - CSM[t]"
            />
          </div>
          
          <FormulaField
            label="Liability for Incurred Claims"
            field="liabilityForIncurredClaims"
            section="csmLiability"
            required={true}
            placeholder="Projects reserves for incurred but unpaid claims"
            example="= PV_Claims[t] + RA_Incurred[t]"
          />
        </div>
      </FormSection>

      <FormSection title="Risk Adjustment (Optional Formula-Based)">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This section provides optional formula override if not using the method-based approach from the Risk Adjustment tab.
          </p>
        </div>
        
        <FormulaField
          label="Risk Adjustment Formula"
          field="riskAdjustment"
          section="riskAdjustmentFormula"
          placeholder="Optional full formula override for risk adjustment calculation"
          example="= quantile(CF_distribution, confidence_level)"
        />
      </FormSection>

      <FormSection title="Formula Testing & Validation">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Formula Syntax Guidelines</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
            <div>
              <p className="font-medium mb-2">Variables & Functions:</p>
              <ul className="space-y-1">
                <li>• Use [t] for time-based variables</li>
                <li>• Reference other formulas by name</li>
                <li>• Use standard mathematical operators</li>
                <li>• Functions: pow(), sqrt(), log(), exp()</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Example Patterns:</p>
              <ul className="space-y-1">
                <li>• <code>= field_name[t] * rate</code></li>
                <li>• <code>= sum(cash_flows[1:t])</code></li>
                <li>• <code>= max(0, calculation)</code></li>
                <li>• <code>= if(condition, value1, value2)</code></li>
              </ul>
            </div>
          </div>
        </div>
      </FormSection>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Actuarial Formula Configuration</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Formulas are stored in JSON under config.actuarialRules</li>
          <li>• Support full flexibility to define, override, and version key actuarial formulas</li>
          <li>• Works in combination with assumptions and rates defined in other tabs</li>
          <li>• Partial overrides supported by Line of Business and Year</li>
          <li>• Only changed formulas need to be included in override JSON</li>
        </ul>
      </div>
    </div>
  );
};

export default ActuarialRulesTab; 