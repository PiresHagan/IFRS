import { ModelDefinition } from './modelDefinition';

export interface Override {
  id: string;
  lob: string;
  year: string | number;
  value: any;
}

export interface OverrideEntry {
  tab: string;
  section: string;
  field: string;
  lob: string;
  year: string | number;
  defaultValue: any;
  overriddenValue: any;
}

export interface GeneralInfoTabProps {
  model: ModelDefinition;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  canEdit: boolean;
}

export interface FormulaMappingTabProps {
  model: ModelDefinition;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  canEdit: boolean;
}

export interface ProjectionAssumptionsTabProps {
  model: ModelDefinition;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  canEdit: boolean;
}

export interface RiskAdjustmentTabProps {
  model: ModelDefinition;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  canEdit: boolean;
}

export interface DiscountRatesTabProps {
  model: ModelDefinition;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  canEdit: boolean;
}

export interface AccountingRulesTabProps {
  model: ModelDefinition;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  canEdit: boolean;
}

export interface ActuarialRulesTabProps {
  model: ModelDefinition;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  canEdit: boolean;
}

export interface OverridesViewerTabProps {
  model: ModelDefinition;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  canEdit: boolean;
}

export interface OverrideFieldProps {
  label: string;
  defaultValue: any;
  overrides: Override[];
  onUpdateOverrides: (overrides: Override[]) => void;
  onUpdateDefault?: (value: any) => void;
  measurementModel: 'GMM' | 'PAA' | 'VFA';
  fieldType: 'text' | 'number' | 'select' | 'checkbox' | 'textarea';
  selectOptions?: { value: string; label: string }[];
  step?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface OverrideDemoProps {
  measurementModel: 'GMM' | 'PAA' | 'VFA';
}

export interface ModelCardProps {
  model: ModelDefinition;
  onOpen: () => void;
}

export interface CreateModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (model: ModelDefinition) => void;
} 