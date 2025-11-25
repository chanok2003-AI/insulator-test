export enum InsulatorStatus {
  NORMAL = 'NORMAL',
  FLASHOVER = 'FLASHOVER',
  BROKEN = 'BROKEN',
  UNKNOWN = 'UNKNOWN'
}

export interface AnalysisResult {
  status: InsulatorStatus;
  confidence: number;
  description: string;
  recommendation: string;
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
  imagePreview: string | null;
}
