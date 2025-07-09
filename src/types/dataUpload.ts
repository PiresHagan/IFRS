export interface DataUploadBatch {
  id: number;
  batchId: string;
  createdBy: number;
  createdByName: string;
  batchStatus: 'draft' | 'saved' | 'validated';
  uploadCount: number;
  createdOn: string;
  modifiedOn: string;
}

export interface DataUpload {
  id: number;
  uploadId: string;
  batch: number;
  batchId: string;
  source: 'custom' | 'staging' | 'api';
  insuranceType: 'direct_insurance' | 'reinsurance' | 'group_insurance';
  dataType: 'expense' | 'claims_paid' | 'outstanding_claims' | 'premiums' | 'commissions_paid' | 'manual_data';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  year: number;
  uploadedBy: number;
  uploadedByName: string;
  fileUpload?: File | string;
  originalFilename: string;
  fileSize: number;
  validationStatus: 'in_progress' | 'validated' | 'failed';
  rowsProcessed: number;
  errorCount: number;
  validationErrors: ValidationError[];
  apiPayload?: any;
  createdOn: string;
  modifiedOn: string;
}

export interface ValidationError {
  row?: number;
  column?: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface DataUploadTemplate {
  id: number;
  name: string;
  dataType: 'expense' | 'claims_paid' | 'outstanding_claims' | 'premiums' | 'commissions_paid' | 'manual_data';
  templateFile: string;
  version: string;
  isActive: boolean;
  isStandardTemplate: boolean;
  createdOn: string;
  modifiedOn: string;
}

export interface APIUploadLog {
  id: number;
  reportingDate: string;
  uploadDate: string;
  sumOfPremiums?: number;
  sumOfPaidClaims?: number;
  sumOfCommissions?: number;
  status: 'success' | 'failed';
  dataUpload?: number;
  dataUploadId?: string;
  apiPayload?: any;
  errorMessage: string;
  createdOn: string;
  modifiedOn: string;
}

export interface UploadFormData {
  batch?: number;
  source?: 'custom' | 'staging' | 'api';
  insuranceType: 'direct_insurance' | 'reinsurance' | 'group_insurance';
  dataType: 'expense' | 'claims_paid' | 'outstanding_claims' | 'premiums' | 'commissions_paid' | 'manual_data';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  year: number;
  file?: File;
}

export interface BulkUploadData {
  batchId: string;
  uploads: UploadFormData[];
}

export interface DataUploadBatchResponse {
  detail: string;
  results: {
    count: number;
    next?: string;
    previous?: string;
    results: DataUploadBatch[];
  };
}

export interface DataUploadResponse {
  detail: string;
  results: {
    count: number;
    next?: string;
    previous?: string;
    results: DataUpload[];
  };
}

export interface DataUploadTemplateResponse {
  detail: string;
  results: {
    count: number;
    next?: string;
    previous?: string;
    results: DataUploadTemplate[];
  };
}

export interface APIUploadLogResponse {
  detail: string;
  results: {
    count: number;
    next?: string;
    previous?: string;
    results: APIUploadLog[];
  };
}

export interface SingleDataUploadBatchResponse {
  detail: string;
  batch: DataUploadBatch;
}

export interface SingleDataUploadResponse {
  detail: string;
  upload: DataUpload;
}

export interface BulkUploadResponse {
  detail: string;
  uploads: DataUpload[];
}

export interface DataUploadFilters {
  source?: 'custom' | 'staging' | 'api';
  insuranceType?: 'direct_insurance' | 'reinsurance' | 'group_insurance';
  dataType?: 'expense' | 'claims_paid' | 'outstanding_claims' | 'premiums' | 'commissions_paid' | 'manual_data';
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  year?: number;
  validationStatus?: 'in_progress' | 'validated' | 'failed';
  batchId?: string;
  uploadId?: string;
  uploadedBy?: string;
  search?: string;
}

export interface BatchFilters {
  batchStatus?: 'draft' | 'saved' | 'validated';
  createdBy?: number;
  search?: string;
}

export const INSURANCE_TYPES = [
  { value: 'direct_insurance', label: 'Direct Insurance' },
  { value: 'reinsurance', label: 'Reinsurance' },
  { value: 'group_insurance', label: 'Group Insurance' },
] as const;

export const DATA_TYPES = [
  { value: 'expense', label: 'Expense' },
  { value: 'claims_paid', label: 'Claims Paid' },
  { value: 'outstanding_claims', label: 'Outstanding Claims' },
  { value: 'premiums', label: 'Premiums' },
  { value: 'commissions_paid', label: 'Commissions Paid' },
  { value: 'manual_data', label: 'Manual Data' },
] as const;

export const QUARTERS = [
  { value: 'Q1', label: 'Q1' },
  { value: 'Q2', label: 'Q2' },
  { value: 'Q3', label: 'Q3' },
  { value: 'Q4', label: 'Q4' },
] as const;

export const UPLOAD_SOURCES = [
  { value: 'custom', label: 'Custom' },
  { value: 'staging', label: 'Staging' },
  { value: 'api', label: 'API' },
] as const;

export const VALIDATION_STATUSES = [
  { value: 'in_progress', label: 'In Progress' },
  { value: 'validated', label: 'Validated' },
  { value: 'failed', label: 'Failed' },
] as const;

export const BATCH_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'saved', label: 'Saved' },
  { value: 'validated', label: 'Validated' },
] as const;

export const getBatchStatusLabel = (status: string): string => {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'saved':
      return 'Saved';
    case 'validated':
      return 'Validated';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'saved':
      return 'bg-blue-100 text-blue-800';
    case 'validated':
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getSourceColor = (source: string): string => {
  switch (source) {
    case 'custom':
      return 'bg-blue-100 text-blue-800';
    case 'staging':
      return 'bg-purple-100 text-purple-800';
    case 'api':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getDataTypeLabel = (dataType: string): string => {
  const type = DATA_TYPES.find(t => t.value === dataType);
  return type ? type.label : dataType.charAt(0).toUpperCase() + dataType.slice(1);
};

export const getInsuranceTypeLabel = (insuranceType: string): string => {
  const type = INSURANCE_TYPES.find(t => t.value === insuranceType);
  return type ? type.label : insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1);
};

export const getValidationStatusLabel = (status: string): string => {
  const validationStatus = VALIDATION_STATUSES.find(s => s.value === status);
  return validationStatus ? validationStatus.label : status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getYearOptions = (): { value: number; label: string }[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  for (let year = currentYear - 5; year <= currentYear + 2; year++) {
    years.push({ value: year, label: year.toString() });
  }
  
  return years.reverse();
};

 