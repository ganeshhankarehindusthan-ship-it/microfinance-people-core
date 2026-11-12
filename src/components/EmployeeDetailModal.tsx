import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  CreditCard, 
  ShieldCheck, 
  TrendingUp, 
  Fingerprint, 
  FileText, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { Employee } from '../types';
import { formatINR, formatNumber, formatPercent } from '../utils/formatters';
import { StatusPill } from './StatusPill';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  onClose: () => void;
  onOpenPayslip: (employee: Employee) => void;
  onToggleKycStatus: (employeeId: string) => void;
  isMarathi: boolean;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  employee,
  onClose,
  onOpenPayslip,
  onToggleKycStatus,
  isMarathi,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'salary' | 'portfolio' | 'attendance'>('profile');

  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#18231F]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-nbfc-modal overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E2E8F0] flex items-start justify-between bg-gradient-to-r from-[#F8FAFC] via-[#EBF0FF]/40 to-white">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3A52B8] to-[#008A3D] text-[#FFFFFF] font-extrabold text-base flex items-center justify-center shadow-md">
              {employee.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#0F172A]">{employee.name}</h3>
                <StatusPill type="kyc" value={employee.kycStatus} />
                <StatusPill type="batch" value={employee.batchStatus} />
              </div>
              <p className="text-xs text-[#64748B] mt-0.5 flex items-center gap-2">
                <span className="font-semibold text-[#0F172A]">{employee.nameMr}</span>
                <span>&bull;</span>
                <span className="font-mono text-[#3A52B8] font-bold">{employee.id}</span>
                <span>&bull;</span>
                <span>{employee.role}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5A6A62] hover:bg-[#EBEFE8] hover:text-[#18231F] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-[#D9E0D6] text-xs font-semibold bg-[#FFFFFF]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-3 border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-[#0E5E4E] text-[#0E5E4E]'
                : 'border-transparent text-[#5A6A62] hover:text-[#18231F]'
            }`}
          >
            1. Identity & Statutory KYC
          </button>
          <button
            onClick={() => setActiveTab('salary')}
            className={`py-2 px-3 border-b-2 transition ${
              activeTab === 'salary'
                ? 'border-[#0E5E4E] text-[#0E5E4E]'
                : 'border-transparent text-[#5A6A62] hover:text-[#18231F]'
            }`}
          >
            2. Salary Structure & Deductions
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-2 px-3 border-b-2 transition ${
              activeTab === 'portfolio'
                ? 'border-[#0E5E4E] text-[#0E5E4E]'
                : 'border-transparent text-[#5A6A62] hover:text-[#18231F]'
            }`}
          >
            3. Microfinance SHG Book
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-2 px-3 border-b-2 transition ${
              activeTab === 'attendance'
                ? 'border-[#0E5E4E] text-[#0E5E4E]'
                : 'border-transparent text-[#5A6A62] hover:text-[#18231F]'
            }`}
          >
            4. Biometric Attendance
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* TAB 1: Profile & KYC */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] space-y-2.5">
                  <h4 className="font-bold text-sm text-[#18231F] flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#0E5E4E]" />
                    <span>Branch & Field Territory</span>
                  </h4>
                  <div className="space-y-1.5 text-[#5A6A62]">
                    <p>Branch: <strong className="text-[#18231F]">{employee.branch}</strong></p>
                    <p>Taluka: <strong className="text-[#18231F]">{employee.taluka}</strong></p>
                    <p>District: <strong className="text-[#18231F]">{employee.district}, Maharashtra</strong></p>
                    <p>Join Date: <strong className="text-[#18231F]">{employee.joinDate}</strong></p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] space-y-2.5">
                  <h4 className="font-bold text-sm text-[#18231F] flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#0E5E4E]" />
                    <span>Contact Details</span>
                  </h4>
                  <div className="space-y-1.5 text-[#5A6A62]">
                    <p>Mobile: <strong className="text-[#18231F] font-mono">{employee.phone}</strong></p>
                    <p>Official Email: <strong className="text-[#18231F]">{employee.email}</strong></p>
                  </div>
                </div>
              </div>

              {/* Statutory Numbers */}
              <div className="p-4 rounded-xl border border-[#D9E0D6] space-y-3">
                <h4 className="font-bold text-sm text-[#18231F] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0E5E4E]" />
                  <span>Statutory Registration Identifiers</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-2.5 bg-[#EBEFE8] rounded-lg">
                    <p className="text-[11px] text-[#5A6A62]">Income Tax PAN</p>
                    <p className="font-mono font-bold text-xs text-[#18231F] mt-0.5">{employee.pan}</p>
                  </div>
                  <div className="p-2.5 bg-[#EBEFE8] rounded-lg">
                    <p className="text-[11px] text-[#5A6A62]">Aadhaar (Masked)</p>
                    <p className="font-mono font-bold text-xs text-[#18231F] mt-0.5">{employee.aadhaarMasked}</p>
                  </div>
                  <div className="p-2.5 bg-[#EBEFE8] rounded-lg">
                    <p className="text-[11px] text-[#5A6A62]">EPFO UAN</p>
                    <p className="font-mono font-bold text-xs text-[#18231F] mt-0.5">{employee.uan}</p>
                  </div>
                  <div className="p-2.5 bg-[#EBEFE8] rounded-lg">
                    <p className="text-[11px] text-[#5A6A62]">ESIC IP Number</p>
                    <p className="font-mono font-bold text-xs text-[#18231F] mt-0.5">{employee.esicNo}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D9E0D6] flex flex-wrap items-center justify-between text-[#5A6A62] text-xs">
                  <span>Salary Account: <strong className="text-[#18231F]">{employee.bankName}</strong> (A/C: {employee.accountNumber})</span>
                  <span>IFSC: <strong className="text-[#18231F] font-mono">{employee.ifsc}</strong></span>
                </div>
              </div>

              {employee.kycNotes && (
                <div className="p-3 bg-[#F6EAD2] border border-[#9A6514]/30 rounded-xl flex items-start gap-2.5 text-[#9A6514]">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">KYC Action Required Note:</span>
                    <p className="mt-0.5">{employee.kycNotes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Salary Structure */}
          {activeTab === 'salary' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Earnings Table */}
                <div className="border border-[#D9E0D6] rounded-xl overflow-hidden">
                  <div className="bg-[#EBEFE8] px-4 py-2 font-bold text-xs text-[#18231F]">
                    Earnings (उपार्जित वेतन)
                  </div>
                  <div className="p-4 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#5A6A62]">Basic Salary</span>
                      <span className="font-semibold tabular-nums text-[#18231F]">{formatINR(employee.basicSalary)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#5A6A62]">House Rent Allowance (HRA)</span>
                      <span className="font-semibold tabular-nums text-[#18231F]">{formatINR(employee.hra)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#5A6A62]">Field Conveyance (Fuel & Bike)</span>
                      <span className="font-semibold tabular-nums text-[#18231F]">{formatINR(employee.fieldConveyance)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#5A6A62]">Special Allowance</span>
                      <span className="font-semibold tabular-nums text-[#18231F]">{formatINR(employee.specialAllowance)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#2C7A4B] font-medium">SHG Collection Incentive</span>
                      <span className="font-bold tabular-nums text-[#2C7A4B]">+{formatINR(employee.incentiveEarned)}</span>
                    </div>
                    <div className="flex justify-between pt-2 text-sm font-bold border-t border-[#D9E0D6]">
                      <span className="text-[#18231F]">Total Gross Earnings</span>
                      <span className="text-[#0E5E4E] tabular-nums">{formatINR(employee.grossSalary)}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions Table */}
                <div className="border border-[#D9E0D6] rounded-xl overflow-hidden">
                  <div className="bg-[#EBEFE8] px-4 py-2 font-bold text-xs text-[#18231F]">
                    Statutory Deductions (वैधानिक कपाती)
                  </div>
                  <div className="p-4 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#5A6A62]">Provident Fund (EPF 12%)</span>
                      <span className="font-semibold tabular-nums text-[#A73C2A]">-{formatINR(employee.pfDeduction)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#5A6A62]">Maharashtra Professional Tax (PT)</span>
                      <span className="font-semibold tabular-nums text-[#A73C2A]">-{formatINR(employee.ptDeduction)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#5A6A62]">ESIC (0.75%)</span>
                      <span className="font-semibold tabular-nums text-[#A73C2A]">-{formatINR(employee.esicDeduction)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#D9E0D6]/50">
                      <span className="text-[#5A6A62]">TDS Income Tax</span>
                      <span className="font-semibold tabular-nums text-[#A73C2A]">-{formatINR(employee.tdsDeduction)}</span>
                    </div>
                    <div className="flex justify-between pt-2 text-sm font-bold border-t border-[#D9E0D6]">
                      <span className="text-[#18231F]">Total Statutory Deductions</span>
                      <span className="text-[#A73C2A] tabular-nums">-{formatINR(employee.totalDeductions)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Take Home Highlight */}
              <div className="p-4 rounded-xl bg-[#0E5E4E] text-[#FFFFFF] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A9F1DB] font-semibold uppercase tracking-wider">
                    Net Take-Home Pay (बँक खात्यात जमा रक्कम)
                  </p>
                  <p className="text-xs text-[#DCEBE5] mt-0.5">
                    Credit via NEFT to {employee.bankName} (A/C: {employee.accountNumber})
                  </p>
                </div>
                <div className="text-2xl font-bold tabular-nums text-[#FFFFFF]">
                  {formatINR(employee.netPayable)}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Portfolio */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6]">
                  <span className="text-[11px] text-[#5A6A62]">Assigned SHGs / JLGs</span>
                  <p className="text-lg font-bold text-[#18231F] tabular-nums mt-0.5">
                    {employee.assignedSHGs} Groups
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6]">
                  <span className="text-[11px] text-[#5A6A62]">Active Women Borrowers</span>
                  <p className="text-lg font-bold text-[#18231F] tabular-nums mt-0.5">
                    {employee.activeBorrowers} Borrowers
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6]">
                  <span className="text-[11px] text-[#5A6A62]">Total Loan Portfolio</span>
                  <p className="text-lg font-bold text-[#0E5E4E] tabular-nums mt-0.5">
                    {formatINR(employee.loanPortfolio)}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6]">
                  <span className="text-[11px] text-[#5A6A62]">Collection Rate</span>
                  <p className="text-lg font-bold text-[#2C7A4B] tabular-nums mt-0.5">
                    {formatPercent(employee.collectionRate)}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D9E0D6] space-y-2">
                <h4 className="font-bold text-sm text-[#18231F]">Joint Liability Group (JLG) Credit Health</h4>
                <p className="text-xs text-[#5A6A62]">
                  Oversees rural micro-credit center meetings across {employee.taluka} villages. Portfolio at Risk (PAR 30) stands at <strong>{employee.par30Rate}%</strong>, well within RBI NBFC prudential limits (&lt;2.0%).
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Attendance */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6]">
                  <span className="text-[11px] text-[#5A6A62]">Attendance Compliance</span>
                  <p className="text-lg font-bold text-[#2C7A4B] tabular-nums mt-0.5">
                    {employee.biometricCompliance}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6]">
                  <span className="text-[11px] text-[#5A6A62]">Days Present</span>
                  <p className="text-lg font-bold text-[#18231F] tabular-nums mt-0.5">
                    {employee.attendanceDays} / {employee.totalWorkingDays} Days
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6]">
                  <span className="text-[11px] text-[#5A6A62]">Missed / Irregular Punches</span>
                  <p className={`text-lg font-bold tabular-nums mt-0.5 ${employee.punchMissCount > 0 ? 'text-[#A73C2A]' : 'text-[#2C7A4B]'}`}>
                    {employee.punchMissCount} Misses
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#D9E0D6] bg-[#FFFFFF]">
                <h4 className="font-bold text-xs text-[#18231F] mb-2">Biometric Authentication Security</h4>
                <p className="text-xs text-[#5A6A62]">
                  All field attendance events require RD-service compliant biometric finger scanner or geofenced facial recognition on Android micro-banking tablets.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#D9E0D6] bg-[#F4F6F2] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onToggleKycStatus(employee.id)}
            className="text-xs font-semibold text-[#0E5E4E] hover:underline flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#0E5E4E]" />
            <span>{employee.kycStatus === 'verified' ? 'Revoke KYC Verification' : 'Approve & Verify KYC'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenPayslip(employee)}
              className="h-9 px-3.5 bg-[#DCEBE5] hover:bg-[#CDE3DB] text-[#0E5E4E] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Payslip PDF</span>
            </button>
            <button
              onClick={onClose}
              className="h-9 px-4 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] text-xs font-semibold rounded-lg transition"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
