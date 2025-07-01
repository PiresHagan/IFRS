import React from 'react';
import { CheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { FormulaMappingTabProps } from '@/types/modelDefinitionComponents';

const FormulaMappingTab: React.FC<FormulaMappingTabProps> = ({ model, onUpdate, canEdit }) => {
  const handleConfigUpdate = (section: string, field: string, value: any) => {
    const currentFormulaMapping = model.config.formulaMapping || {};
    const currentSection = (currentFormulaMapping as any)[section] || {};
    
    const updatedConfig = {
      ...model.config,
      formulaMapping: {
        ...currentFormulaMapping,
        [section]: {
          ...currentSection,
          [field]: value
        }
      }
    };
    
    onUpdate({ config: updatedConfig });
  };

  const formulaMapping = model.config.formulaMapping || {};
  
  const formulaOptions = [
    'From previous period',
    'Sum cash inflows',
    'Premium linear earning',
    'LRC roll forward',
    'Sum claims reported',
    'LIC roll forward',
    'RA percent of LIC',
    'Claims + acq. costs + RA',
    'LIC × discount rate',
    'From previous period'
  ];

  const FormulaTable = ({ 
    title, 
    fields, 
    sectionKey 
  }: { 
    title: string; 
    fields: Array<{ field: string; label: string; defaultFormula: string; required: boolean }>; 
    sectionKey: string;
  }) => (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-700 border-b border-gray-200">
          <div className="col-span-4">Output Field</div>
          <div className="col-span-6 flex items-center">
            Formula Expression
            <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400" />
          </div>
          <div className="col-span-2 text-center">Required</div>
        </div>
        
        {fields.map((fieldConfig, index) => {
          const currentValue = (formulaMapping as any)[sectionKey]?.[fieldConfig.field] || fieldConfig.defaultFormula;
          
          return (
            <div key={fieldConfig.field} className={`grid grid-cols-12 gap-4 p-4 items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'} border-b border-gray-100 last:border-b-0`}>
              <div className="col-span-4 text-sm text-gray-900 font-medium">
                {fieldConfig.label}
              </div>
              
              <div className="col-span-6">
                <select
                  value={currentValue}
                  onChange={(e) => handleConfigUpdate(sectionKey, fieldConfig.field, e.target.value)}
                  disabled={!canEdit}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  {formulaOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-span-2 flex justify-center">
                {fieldConfig.required && (
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const statementOfFinancialPositionFields = [
    { field: 'lrcOpening', label: 'LRC Opening', defaultFormula: 'From previous period', required: true },
    { field: 'premiumsReceived', label: 'Premiums Received', defaultFormula: 'Sum cash inflows', required: true },
    { field: 'insuranceRevenue', label: 'Insurance Revenue', defaultFormula: 'Premium linear earning', required: true },
    { field: 'lrcClosing', label: 'LRC Closing', defaultFormula: 'LRC roll forward', required: true },
    { field: 'claimsIncurred', label: 'Claims Incurred', defaultFormula: 'Sum claims reported', required: true },
    { field: 'claimsPaid', label: 'Claims Paid', defaultFormula: 'LIC roll forward', required: true },
    { field: 'riskAdjustmentLic', label: 'Risk Adjustment (LIC)', defaultFormula: 'RA percent of LIC', required: true },
  ];

  const statementOfProfitOrLossFields = [
    { field: 'insuranceRevenue', label: 'Insurance Revenue', defaultFormula: 'Premium linear earning', required: true },
    { field: 'insuranceServiceExpense', label: 'Insurance Service Expense', defaultFormula: 'Claims + acq. costs + RA', required: true },
    { field: 'insuranceFinanceIncome', label: 'Insurance Finance Income', defaultFormula: 'LIC × discount rate', required: true },
  ];

  const rollForwardTablesFields = [
    { field: 'raOpening', label: 'RA Opening', defaultFormula: 'From previous period', required: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Formula Mapping</h2>
        <p className="text-sm text-gray-600 mb-6">
          Define how calculated values are mapped into financial statement components and roll-forward tables under IFRS 17.
        </p>
      </div>

      <FormulaTable
        title="Statement of Financial Position"
        fields={statementOfFinancialPositionFields}
        sectionKey="statementOfFinancialPosition"
      />

      <FormulaTable
        title="Statement of Profit or Loss"
        fields={statementOfProfitOrLossFields}
        sectionKey="statementOfProfitOrLoss"
      />

      <FormulaTable
        title="Roll-Forward Tables"
        fields={rollForwardTablesFields}
        sectionKey="rollForwardTables"
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Formula Mapping Notes</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Formula expressions define how actuarial calculations map to financial statement line items</li>
          <li>• Each formula can reference calculated values from other tabs (projections, risk adjustment, etc.)</li>
          <li>• Required fields must have valid formula expressions for proper IFRS 17 compliance</li>
          <li>• Formulas are evaluated during the reporting process to generate financial statements</li>
        </ul>
      </div>
    </div>
  );
};

export default FormulaMappingTab; 