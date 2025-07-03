import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PlusIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Override, OverrideFieldProps } from '@/types/modelDefinitionComponents';

const OverrideField: React.FC<OverrideFieldProps> = ({
  label,
  defaultValue,
  overrides = [],
  onUpdateOverrides,
  onUpdateDefault,
  measurementModel,
  fieldType,
  selectOptions = [],
  step,
  min,
  max,
  placeholder,
  disabled = false,
  required = false,
}) => {
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [newOverride, setNewOverride] = useState({
    lob: 'ALL',
    year: 'ALL',
    value: defaultValue,
  });

  const getLobOptions = () => {
    const lobOptions = {
      GMM: [
        { value: 'ALL', label: 'All Line of Business' },
        { value: 'TERM_LIFE', label: 'Term Life Insurance' },
        { value: 'WHOLE_LIFE_NON_PAR', label: 'Whole Life (Non-PAR)' },
        { value: 'ANNUITIES', label: 'Annuities (Immediate / Deferred)' },
        { value: 'GROUP_LIFE', label: 'Group Life Insurance' },
        { value: 'LONG_TERM_DISABILITY', label: 'Long-Term Disability' },
        { value: 'CRITICAL_ILLNESS', label: 'Critical Illness' },
      ],
      PAA: [
        { value: 'ALL', label: 'All Line of Business' },
        { value: 'AUTO_INSURANCE', label: 'Auto Insurance' },
        { value: 'HOME_INSURANCE', label: 'Home Insurance' },
        { value: 'TRAVEL_INSURANCE', label: 'Travel Insurance' },
        { value: 'SHORT_TERM_HEALTH', label: 'Short-Term Health' },
        { value: 'PROPERTY_CASUALTY', label: 'Property & Casualty' },
        { value: 'CREDIT_INSURANCE', label: 'Credit Insurance' },
        { value: 'ACCIDENT_INSURANCE', label: 'Accident Insurance' },
      ],
      VFA: [
        { value: 'ALL', label: 'All Line of Business' },
        { value: 'WHOLE_LIFE_PAR', label: 'Whole Life (PAR)' },
        { value: 'UNIT_LINKED_LIFE', label: 'Unit-Linked Life Insurance' },
        { value: 'INVESTMENT_LINKED', label: 'Investment-Linked Products' },
        { value: 'UNIVERSAL_LIFE_INVESTMENT', label: 'Universal Life with Investment Account' },
        { value: 'PARTICIPATING_ANNUITIES', label: 'Participating Annuities' },
      ],
    };
    return lobOptions[measurementModel];
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear + 1;
    const endYear = 2051;
    
    const options = [{ value: 'ALL', label: 'All Years' }];
    for (let year = startYear; year <= endYear; year++) {
      options.push({ value: year.toString(), label: year.toString() });
    }
    return options;
  };

  const handleAddOverride = () => {
    const override: Override = {
      id: `${newOverride.lob}_${newOverride.year}_${Date.now()}`,
      lob: newOverride.lob,
      year: newOverride.year,
      value: newOverride.value,
    };

    const updatedOverrides = [...overrides, override];
    onUpdateOverrides(updatedOverrides);
    
    setShowOverrideModal(false);
    setNewOverride({
      lob: 'ALL',
      year: 'ALL',
      value: defaultValue,
    });
  };

  const handleDeleteOverride = (overrideId: string) => {
    const updatedOverrides = (overrides || []).filter(o => o.id !== overrideId);
    onUpdateOverrides(updatedOverrides);
  };

  const renderField = (value: any, onChange: (value: any) => void, disabled: boolean = false) => {
    const baseClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100";

    switch (fieldType) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={baseClassName}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            step={step}
            min={min}
            max={max}
            placeholder={placeholder}
            disabled={disabled}
            className={baseClassName}
          />
        );
      
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={baseClassName}
          >
            {(selectOptions || []).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={3}
            className={baseClassName}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            {renderField(defaultValue, onUpdateDefault || (() => {}), disabled || !onUpdateDefault)}
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={() => setShowOverrideModal(true)}
              className="flex-shrink-0 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              title="Add override"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {overrides && overrides.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Active Overrides</h4>
          <div className="space-y-2">
            {overrides.map((override) => (
              <div key={override.id} className="flex items-center justify-between bg-white p-2 rounded border">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-xs text-gray-600">
                    LOB: <span className="font-medium">{override.lob === 'ALL' ? 'All' : override.lob.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Year: <span className="font-medium">{override.year}</span>
                  </div>
                  <div className="text-xs text-gray-900">
                    Value: <span className="font-medium">{typeof override.value === 'boolean' ? (override.value ? 'Yes' : 'No') : override.value}</span>
                  </div>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleDeleteOverride(override.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete override"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog
        open={showOverrideModal}
        onClose={() => setShowOverrideModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Add Override for {label}
              </Dialog.Title>
              <button
                onClick={() => setShowOverrideModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line of Business
                </label>
                <select
                  value={newOverride.lob}
                  onChange={(e) => setNewOverride(prev => ({ ...prev, lob: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(getLobOptions() || []).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  value={newOverride.year}
                  onChange={(e) => setNewOverride(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(getYearOptions() || []).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Override Value
                </label>
                {renderField(
                  newOverride.value,
                  (value) => setNewOverride(prev => ({ ...prev, value })),
                  false
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-4 border-t">
              <button
                type="button"
                onClick={() => setShowOverrideModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddOverride}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Add Override
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default OverrideField; 