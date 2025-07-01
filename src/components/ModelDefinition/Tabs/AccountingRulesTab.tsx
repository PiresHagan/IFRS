import React from 'react';
import { AccountingRulesTabProps } from '@/types/modelDefinitionComponents';

const AccountingRulesTab: React.FC<AccountingRulesTabProps> = ({ model, onUpdate, canEdit }) => {
  const handleConfigUpdate = (section: string, field: string, value: any) => {
    const currentAccountingRules = model.config.accountingRules || {};
    const currentSection = (currentAccountingRules as any)[section] || {};
    
    const updatedConfig = {
      ...model.config,
      accountingRules: {
        ...currentAccountingRules,
        [section]: {
          ...currentSection,
          [field]: value
        }
      }
    };
    onUpdate({ config: updatedConfig });
  };

  const accountingRules = model.config.accountingRules || {};

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
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Accounting Rules</h2>
        <p className="text-sm text-gray-600 mb-6">
          Define how calculated values are mapped into financial statement components under IFRS 17. 
          Configure presentation, classification, and recognition rules.
        </p>
      </div>

      <FormSection title="Revenue Recognition">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Revenue Pattern <span className="text-red-500">*</span>
              </label>
              <select
                value={accountingRules.revenueRecognition?.pattern || 'coverage_unit'}
                onChange={(e) => handleConfigUpdate('revenueRecognition', 'pattern', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="coverage_unit">Coverage Unit</option>
                <option value="flat">Flat</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div className="flex items-center pt-8">
              <input
                type="checkbox"
                id="useCsmReleaseAsRevenue"
                checked={accountingRules.revenueRecognition?.useCsmReleaseAsRevenue || false}
                onChange={(e) => handleConfigUpdate('revenueRecognition', 'useCsmReleaseAsRevenue', e.target.checked)}
                disabled={!canEdit}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              />
              <label htmlFor="useCsmReleaseAsRevenue" className="ml-2 block text-sm text-gray-700">
                Use CSM Release as Revenue
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Revenue Formula <span className="text-red-500">*</span>
            </label>
            <textarea
              value={accountingRules.revenueRecognition?.revenueFormula || '= csm_release[t] + yield_adj[t]'}
              onChange={(e) => handleConfigUpdate('revenueRecognition', 'revenueFormula', e.target.value)}
              disabled={!canEdit}
              rows={2}
              placeholder="Define actual revenue release logic"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Presentation & Classification">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="presentRaInPnl"
                  checked={accountingRules.presentation?.presentRaInPnl || false}
                  onChange={(e) => handleConfigUpdate('presentation', 'presentRaInPnl', e.target.checked)}
                  disabled={!canEdit}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="presentRaInPnl" className="ml-2 block text-sm text-gray-700">
                  Present RA in P&L (vs OCI)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="discountRateChangeToOci"
                  checked={accountingRules.presentation?.discountRateChangeToOci || false}
                  onChange={(e) => handleConfigUpdate('presentation', 'discountRateChangeToOci', e.target.checked)}
                  disabled={!canEdit}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="discountRateChangeToOci" className="ml-2 block text-sm text-gray-700">
                  Discount Rate Changes to OCI
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allocation Method <span className="text-red-500">*</span>
              </label>
              <select
                value={accountingRules.presentation?.allocationMethod || 'by_contract'}
                onChange={(e) => handleConfigUpdate('presentation', 'allocationMethod', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="by_contract">By Contract</option>
                <option value="by_portfolio">By Portfolio</option>
                <option value="by_unit">By Unit</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contract Boundary Rule (Optional)
            </label>
            <textarea
              value={accountingRules.presentation?.contractBoundaryRule || ''}
              onChange={(e) => handleConfigUpdate('presentation', 'contractBoundaryRule', e.target.value)}
              disabled={!canEdit}
              rows={2}
              placeholder="Optional logic for when contract ends"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Portfolio Mapping Rules">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grouping Basis <span className="text-red-500">*</span>
              </label>
              <select
                value={accountingRules.portfolioMapping?.groupingBasis || 'by_product'}
                onChange={(e) => handleConfigUpdate('portfolioMapping', 'groupingBasis', e.target.value)}
                disabled={!canEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="by_product">By Product</option>
                <option value="by_underwriting_year">By Underwriting Year</option>
                <option value="by_profitability">By Profitability Grouping</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio Assignment <span className="text-red-500">*</span>
              </label>
              <textarea
                value={accountingRules.portfolioMapping?.portfolioAssignment || '{"Term Life": "Life_Portfolio_1", "Auto": "PC_Portfolio_1"}'}
                onChange={(e) => handleConfigUpdate('portfolioMapping', 'portfolioAssignment', e.target.value)}
                disabled={!canEdit}
                rows={3}
                placeholder='JSON map: {"Product": "Portfolio", ...}'
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cohort Definition Rule (Optional)
            </label>
            <textarea
              value={accountingRules.portfolioMapping?.cohortDefinitionRule || ''}
              onChange={(e) => handleConfigUpdate('portfolioMapping', 'cohortDefinitionRule', e.target.value)}
              disabled={!canEdit}
              rows={2}
              placeholder="Optional custom cohort definition"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Recognition Timing Rules">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Premium Recognition Timing <span className="text-red-500">*</span>
            </label>
            <select
              value={accountingRules.recognitionTiming?.premiumRecognitionTiming || 'start'}
              onChange={(e) => handleConfigUpdate('recognitionTiming', 'premiumRecognitionTiming', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="start">Start of Period</option>
              <option value="mid">Mid Period</option>
              <option value="end">End of Period</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Claim Recognition Timing <span className="text-red-500">*</span>
            </label>
            <select
              value={accountingRules.recognitionTiming?.claimRecognitionTiming || 'incurred'}
              onChange={(e) => handleConfigUpdate('recognitionTiming', 'claimRecognitionTiming', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="incurred">When Incurred</option>
              <option value="reported">When Reported</option>
              <option value="paid">When Paid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Acquisition Expense Timing <span className="text-red-500">*</span>
            </label>
            <select
              value={accountingRules.recognitionTiming?.acquisitionExpenseTiming || 'immediate'}
              onChange={(e) => handleConfigUpdate('recognitionTiming', 'acquisitionExpenseTiming', e.target.value)}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="immediate">Immediate</option>
              <option value="amortized">Amortized</option>
            </select>
          </div>
        </div>
      </FormSection>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">IFRS 17 Accounting Rules</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Contains IFRS 17-specific accounting presentation logic</li>
          <li>• Enables fine-grained mapping of calculated values to P&L, OCI, balance sheet</li>
          <li>• Fully supports override logic per LoB and Year</li>
          <li>• All configurations are stored under ModelDefinition.config.accountingRules</li>
        </ul>
      </div>
    </div>
  );
};

export default AccountingRulesTab; 