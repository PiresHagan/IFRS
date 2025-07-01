export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  getFullName?: string;
}

export interface ModelDefinition {
  id: number;
  name: string;
  description: string;
  version: string;
  productType: string;
  measurementModel: 'GMM' | 'PAA' | 'VFA';
  config: ModelDefinitionConfig;
  status: 'draft' | 'active' | 'locked' | 'deleted';
  createdBy: number;
  createdByName: string;
  lastModifiedBy: number;
  lastModifiedByName: string;
  clonedFrom?: number;
  clonedFromName?: string;
  lockedBy?: number;
  lockedByName?: string;
  lockedAt?: string;
  isLocked: boolean;
  canEdit: boolean;
  createdOn: string;
  modifiedOn: string;
}

export interface ModelDefinitionHistory {
  id: number;
  model: number;
  modelName: string;
  name: string;
  description: string;
  version: string;
  productType: string;
  measurementModel: string;
  config: ModelDefinitionConfig;
  savedAt: string;
  modifiedBy: number;
  modifiedByName: string;
}

export interface ModelDefinitionConfig {
  generalInfo?: GeneralInfoConfig;
  formulaMapping?: FormulaMappingConfig;
  projectionAssumptions?: ProjectionAssumptionsConfig;
  riskAdjustment?: RiskAdjustmentConfig;
  discountRates?: DiscountRatesConfig;
  accountingRules?: AccountingRulesConfig;
  actuarialRules?: ActuarialRulesConfig;
  overrides?: OverridesConfig;
}

export interface GeneralInfoConfig {
  modelName?: string;
  version?: string;
  description?: string;
  productType?: string;
  measurementModel?: 'GMM' | 'PAA' | 'VFA';
  createdBy?: string;
  createdDate?: string;
  lastModified?: string;
  status?: 'draft' | 'active' | 'locked';
  baseTemplate?: string;
}

export interface FormulaMappingConfig {
  statementOfFinancialPosition?: {
    [field: string]: string;
  };
  statementOfProfitOrLoss?: {
    [field: string]: string;
  };
  rollForwardTables?: {
    [field: string]: string;
  };
  
  [key: string]: any;
}

export interface FieldOverride {
  id: string;
  lob: string;
  year: string | number;
  value: any;
}

export interface OverrideData {
  [fieldName: string]: FieldOverride[];
}

export interface ProjectionAssumptionsConfig {
  projectionStartYear?: number;
  projectionLength?: number;
  projectionFrequency?: 'Annual' | 'Quarterly' | 'Monthly';
  
  projectionHorizon?: {
    startYear?: number;
    length?: number;
    frequency?: 'Annual' | 'Quarterly' | 'Monthly';
  };
  
  lapseModel?: {
    type?: 'Fixed' | 'Tiered' | 'Custom Formula';
    years1To5?: number;
    afterYear5?: number;
    customFormula?: string;
    surrenderTiming?: 'Mid-Year' | 'End-of-Year';
  };
  
  lapseLogic?: {
    modelType?: 'Fixed' | 'Tiered' | 'Custom Formula';
    years1to5?: number;
    afterYear5?: number;
    customFormula?: string;
    surrenderTiming?: 'Mid-Year' | 'End-of-Year';
  };
  
  mortality?: {
    table?: string;
    tableReference?: string;
    adjustmentFactor?: number;
    improvementScale?: string;
    morbidityTable?: string;
    useMorbidityInstead?: boolean;
  };
  
  morbidity?: {
    table?: string;
    useMorbidityInstead?: boolean;
  };
  
  claimSettlement?: {
    lag?: number;
    pattern?: 'Immediate' | 'Uniform' | 'Custom';
    timing?: 'Mid-Year' | 'End-of-Year' | 'Exact';
    timingBasis?: 'Mid-Year' | 'End-of-Year' | 'Exact';
  };
  
  premiumPattern?: {
    type?: 'Level' | 'Front-Loaded' | 'Custom';
    customPattern?: number[];
    recognitionPoint?: 'Beginning' | 'Mid-Year' | 'End-of-Year';
    frequency?: 'Annual' | 'Semiannual' | 'Monthly';
  };
  
  premiumTiming?: {
    pattern?: 'Level' | 'Front-Loaded' | 'Custom';
    customPattern?: string;
    recognitionPoint?: 'Beginning' | 'Mid-Year' | 'End-of-Year';
    frequency?: 'Annual' | 'Semiannual' | 'Monthly';
  };
  
  overrides?: OverrideData;
}

export interface RiskAdjustmentConfig {
  method?: {
    method?: 'confidence_level' | 'cost_of_capital' | 'fixed_margin' | 'percent_of_be';
    applyToLicOnly?: boolean;
    diversificationApplied?: boolean;
  };
  
  confidenceLevel?: {
    level?: number;
    distribution?: 'Normal' | 'Log-Normal' | 'Custom';
    volatilityReference?: string;
  };
  
  costOfCapital?: {
    capitalFactor?: number;
    costRate?: number;
    duration?: number;
  };
  
  fixedMargin?: {
    amount?: number;
    applyProRata?: boolean;
  };
  
  percentOfBe?: {
    percentage?: number;
    applyTo?: 'claims_only' | 'claims_expenses' | 'all_outflows';
  };
  
  overrides?: OverrideData;
  
  [key: string]: any;
}

export interface DiscountRatesConfig {
  method?: {
    method?: 'spot_rate_curve' | 'flat_rate' | 'reference_table' | 'no_discounting';
    useLockedInRate?: boolean;
    applyToLic?: boolean;
    applyToCsm?: boolean;
  };
  
  spotRateCurve?: {
    rateCurveId?: string;
    currency?: string;
    termRange?: string;
    interpolation?: 'linear' | 'spline' | 'step';
  };
  
  flatRate?: {
    rate?: number;
    currency?: string;
  };
  
  referenceTable?: {
    tableId?: string;
    rateSource?: string;
    effectiveDate?: string;
  };
  
  overrides?: OverrideData;
  
  [key: string]: any;
}

export interface AccountingRulesConfig {
  revenueRecognition?: {
    pattern?: string;
    revenueFormula?: string;
    useCsmReleaseAsRevenue?: boolean;
  };
  
  presentation?: {
    presentRaInPnl?: boolean;
    discountRateChangeToOci?: boolean;
    contractBoundaryRule?: string;
    allocationMethod?: string;
  };
  
  portfolioMapping?: {
    portfolioAssignment?: string;
    groupingBasis?: string;
    cohortDefinitionRule?: string;
  };
  
  recognitionTiming?: {
    premiumRecognitionTiming?: string;
    claimRecognitionTiming?: string;
    acquisitionExpenseTiming?: string;
  };
  
  [key: string]: any;
}

export interface ActuarialRulesConfig {
  baseCashFlow?: {
    premiumProjection?: string;
    expectedClaims?: string;
    maintenanceExpenses?: string;
    commission?: string;
    benefitPayment?: string;
  };
  
  csmLiability?: {
    discountedCashflow?: string;
    csmRelease?: string;
    csmAdjustment?: string;
    liabilityForRemainingCoverage?: string;
    liabilityForIncurredClaims?: string;
  };
  
  riskAdjustment?: {
    riskAdjustment?: string;
  };
  
  overrides?: OverrideData;
  
  [key: string]: any;
}

export interface OverridesConfig {
  [key: string]: {
    tab: string;
    section: string;
    field: string;
    lob: string;
    year: number | 'All';
    defaultValue: any;
    overrideValue: any;
  };
}

export interface CreateModelDefinitionRequest {
  name: string;
  description?: string;
  config: ModelDefinitionConfig;
  clonedFrom?: number;
}

export interface UpdateModelDefinitionRequest {
  name?: string;
  description?: string;
  config?: ModelDefinitionConfig;
  status?: 'draft' | 'active' | 'locked' | 'deleted';
}

export interface CloneModelDefinitionRequest {
  name: string;
  description?: string;
}

export interface ModelDefinitionListResponse {
  detail: string;
  results: {
    count: number;
    next?: string;
    previous?: string;
    results: ModelDefinition[];
  };
}

export interface ModelDefinitionDetailResponse {
  detail: string;
  modelDefinition: ModelDefinition;
}

export interface ModelDefinitionHistoryResponse {
  detail: string;
  history: ModelDefinitionHistory[];
} 