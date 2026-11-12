export type Role = 
  | 'Field Credit Officer' 
  | 'Senior Credit Officer' 
  | 'Branch Operations Manager' 
  | 'Cashier & Teller' 
  | 'Recovery & Vigilance Officer'
  | 'Cluster Area Manager';

export type KYCStatus = 'verified' | 'action_required' | 'in_review';
export type BatchStatus = 'disbursed' | 'approved' | 'flagged' | 'draft';
export type AttendanceStatus = 'verified' | 'grace_period' | 'flagged' | 'absent';

export interface Employee {
  id: string; // e.g. MH-FCO-1042
  name: string;
  nameMr: string; // Marathi transliteration
  role: Role;
  branch: string;
  district: string;
  taluka: string;
  assignedSHGs: number; // e.g. 16 Self Help Groups / JLGs
  activeBorrowers: number;
  loanPortfolio: number; // in ₹ (e.g. 1850000 = 18.5 Lakhs)
  collectionRate: number; // % e.g. 99.4
  par30Rate: number; // % Portfolio at Risk (e.g. 0.4%)
  
  // KYC & Statutory Identifiers
  pan: string;
  aadhaarMasked: string;
  uan: string; // EPFO UAN
  esicNo: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  kycStatus: KYCStatus;
  kycNotes?: string;

  // Monthly Salary Structure (INR)
  basicSalary: number;
  hra: number;
  fieldConveyance: number;
  specialAllowance: number;
  incentiveEarned: number;
  grossSalary: number;

  // Statutory Deductions
  pfDeduction: number; // 12% of basic
  esicDeduction: number; // 0.75% of gross (if <= 21,000 gross)
  ptDeduction: number; // Maharashtra PT (typically ₹200 / ₹300)
  tdsDeduction: number;
  totalDeductions: number;
  netPayable: number;

  // Attendance metrics
  attendanceDays: number;
  totalWorkingDays: number;
  biometricCompliance: number; // % e.g. 98.2%
  punchMissCount: number;
  batchStatus: BatchStatus;
  joinDate: string;
  phone: string;
  email: string;
}

export interface AttendancePunch {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeNameMr: string;
  role: string;
  branch: string;
  timestamp: string;
  date: string;
  time: string;
  centerName: string; // e.g. "Koregaon SHG Center #4"
  village: string;
  taluka: string;
  coords: string;
  distanceFromCenter: number; // meters
  authMethod: 'Biometric Fingerprint' | 'Iris Scan' | 'Mobile GPS Punch';
  deviceBattery: number;
  status: AttendanceStatus;
  regularizationReason?: string;
  isRegularized?: boolean;
}

export interface AuditAnomaly {
  id: string;
  employeeId: string;
  employeeName: string;
  branch: string;
  severity: 'critical' | 'warning';
  title: string;
  titleMr: string;
  description: string;
  statutoryType: 'EPFO' | 'ESIC' | 'BIOMETRIC' | 'BANK_NEFT' | 'MAHA_PT';
  status: 'flagged' | 'resolved' | 'grace_approved';
  detectedAt: string;
}

export interface BranchStat {
  id: string;
  name: string;
  nameMr: string;
  district: string;
  taluka: string;
  fcoCount: number;
  activeLoanBook: number; // in ₹
  monthlyPayroll: number; // in ₹
  avgCollectionRate: number; // %
  complianceScore: number; // %
}
