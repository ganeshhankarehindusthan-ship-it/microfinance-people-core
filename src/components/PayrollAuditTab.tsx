import React, { useState } from 'react';
import { 
  ReceiptIndianRupee, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Send, 
  RefreshCw, 
  FileCheck, 
  ShieldCheck, 
  Building,
  ArrowRight,
  Info
} from 'lucide-react';
import { Employee, AuditAnomaly } from '../types';
import { formatINR, formatNumber } from '../utils/formatters';
import { StatusPill } from './StatusPill';

interface PayrollAuditTabProps {
  employees: Employee[];
  anomalies: AuditAnomaly[];
  isMarathi: boolean;
  onApproveAllForDisbursement: () => void;
  onResolveAnomaly: (anomalyId: string) => void;
  onOpenPayslip: (employee: Employee) => void;
}

export const PayrollAuditTab: React.FC<PayrollAuditTabProps> = ({
  employees,
  anomalies,
  isMarathi,
  onApproveAllForDisbursement,
  onResolveAnomaly,
  onOpenPayslip,
}) => {
  const [activeCycle, setActiveCycle] = useState('2026-10');
  const [filterBatchStatus, setFilterBatchStatus] = useState<string>('ALL');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Compute live payroll aggregates
  const totalEmployees = employees.length;
  const totalGross = employees.reduce((acc, e) => acc + e.grossSalary, 0);
  const totalBasic = employees.reduce((acc, e) => acc + e.basicSalary, 0);
  const totalIncentives = employees.reduce((acc, e) => acc + e.incentiveEarned, 0);
  const totalPf = employees.reduce((acc, e) => acc + e.pfDeduction, 0);
  const totalPt = employees.reduce((acc, e) => acc + e.ptDeduction, 0);
  const totalTds = employees.reduce((acc, e) => acc + e.tdsDeduction, 0);
  const totalNet = employees.reduce((acc, e) => acc + e.netPayable, 0);

  const pendingAnomalies = anomalies.filter((a) => a.status === 'flagged');
  const readyForDisbursement = employees.filter((e) => e.batchStatus === 'approved').length;
  const alreadyDisbursed = employees.filter((e) => e.batchStatus === 'disbursed').length;

  // Export Bank NEFT File (format standard for Bank of Maharashtra / SBI corporate netbanking)
  const handleExportNEFT = () => {
    const lines = [
      'Record_Type,Beneficiary_Name,Account_Number,IFSC,Amount_INR,Employee_ID,Narration',
      ...employees.map((e) => 
        `NEFT,"${e.name}",${e.accountNumber},${e.ifsc},${e.netPayable},${e.id},"SALARY OCT 2026 HINDUSTHAN MFI"`
      ),
    ];
    const textContent = lines.join('\n');
    const blob = new Blob([textContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MAHA_NEFT_PAYROLL_BATCH_${activeCycle}_HINDUSTHAN.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage('Bank NEFT corporate payment file generated successfully! Ready for CBS upload.');
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  // Export Payroll Ledger CSV
  const handleExportSalaryRegister = () => {
    const headers = [
      'Emp ID',
      'Name',
      'Role',
      'Branch',
      'Basic Salary',
      'HRA',
      'Field Conveyance',
      'Special Allowance',
      'SHG Incentive',
      'Gross Salary',
      'PF (12%)',
      'Maharashtra PT',
      'TDS',
      'Total Deductions',
      'Net Take Home',
      'Bank Name',
      'Account Number',
      'IFSC Code'
    ];

    const rows = employees.map(e => [
      e.id,
      `"${e.name}"`,
      `"${e.role}"`,
      `"${e.branch}"`,
      e.basicSalary,
      e.hra,
      e.fieldConveyance,
      e.specialAllowance,
      e.incentiveEarned,
      e.grossSalary,
      e.pfDeduction,
      e.ptDeduction,
      e.tdsDeduction,
      e.totalDeductions,
      e.netPayable,
      `"${e.bankName}"`,
      e.accountNumber,
      e.ifsc
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Salary_Register_MFI_${activeCycle}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Download Alert Notification */}
      {downloadSuccessMessage && (
        <div className="bg-[#DDEFE3] border border-[#2C7A4B]/30 text-[#2C7A4B] p-3 rounded-xl flex items-center justify-between text-xs font-semibold animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{downloadSuccessMessage}</span>
          </div>
          <button 
            onClick={() => setDownloadSuccessMessage(null)}
            className="text-xs text-[#2C7A4B] hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Cycle Header & Batch Actions */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-5 shadow-nbfc-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-[#18231F]">
              {isMarathi ? 'मासिक वेतन लेखापरीक्षण व मंजुरी' : 'Monthly Payroll & Statutory Audit Engine'}
            </h2>
            <span className="bg-[#DCEBE5] text-[#0E5E4E] text-xs font-bold px-2 py-0.5 rounded-full">
              FY 2026-27
            </span>
          </div>
          <p className="text-xs text-[#5A6A62] mt-0.5">
            {isMarathi 
              ? 'बचत गट वसुली कमिशन, बायोमेट्रिक हजेरी, पीएफ व महाराष्ट्र व्यावसायिक कर कपात' 
              : 'Joint Liability Group collection incentives, biometric logs, EPF 12%, and Maharashtra PT'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Cycle selector */}
          <select
            value={activeCycle}
            onChange={(e) => setActiveCycle(e.target.value)}
            className="h-10 px-3 text-xs bg-[#EBEFE8] text-[#18231F] font-semibold border border-[#D9E0D6] rounded-lg focus:outline-none focus:border-[#0E5E4E]"
          >
            <option value="2026-10">October 2026 (Active Audit)</option>
            <option value="2026-09">September 2026 (Settled)</option>
            <option value="2026-08">August 2026 (Settled)</option>
          </select>

          {/* Export NEFT */}
          <button
            onClick={handleExportNEFT}
            className="h-10 px-3.5 bg-[#EBEFE8] hover:bg-[#D9E0D6] text-[#18231F] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            title="Download Bank NEFT CSV for CBS batch disbursement"
          >
            <Download className="w-4 h-4 text-[#0E5E4E]" />
            <span>{isMarathi ? 'एनईएफटी फाईल' : 'Bank NEFT File'}</span>
          </button>

          {/* Final Batch Approve */}
          <button
            onClick={onApproveAllForDisbursement}
            disabled={pendingAnomalies.length > 0}
            className={`h-10 px-4 text-xs font-semibold rounded-lg flex items-center gap-2 transition ${
              pendingAnomalies.length > 0
                ? 'bg-[#D9E0D6] text-[#5A6A62] cursor-not-allowed'
                : 'bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] shadow-sm'
            }`}
            title={pendingAnomalies.length > 0 ? 'Resolve audit anomalies before final approval' : 'Authorize entire payout'}
          >
            <Send className="w-4 h-4" />
            <span>{isMarathi ? 'सर्व वेतन मंजूर करा' : 'Approve All for Payout'}</span>
          </button>
        </div>
      </div>

      {/* 4-Step Audit Pipeline Stepper */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-5 shadow-nbfc-card">
        <h3 className="text-xs font-bold text-[#5A6A62] uppercase tracking-wider mb-4">
          {isMarathi ? 'वेतन लेखापरीक्षण टप्पे (४-स्टेप पडताळणी)' : 'Payroll Audit Stages (4-Step Statutory Verification)'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1: Biometric Attendance */}
          <div className="p-3.5 rounded-lg border border-[#2C7A4B]/40 bg-[#DDEFE3]/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#2C7A4B] mb-1">
                <span>Stage 1</span>
                <CheckCircle2 className="w-4 h-4 text-[#2C7A4B]" />
              </div>
              <h4 className="font-bold text-sm text-[#18231F]">Biometric Punch Audit</h4>
              <p className="text-[11px] text-[#5A6A62] mt-1">
                Geofence validated against SHG centers in Baramati, Wai & Shirol.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#2C7A4B]/20 text-[11px] font-semibold text-[#2C7A4B]">
              Passed & Reconciled
            </div>
          </div>

          {/* Step 2: Incentive Matrix */}
          <div className="p-3.5 rounded-lg border border-[#2C7A4B]/40 bg-[#DDEFE3]/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#2C7A4B] mb-1">
                <span>Stage 2</span>
                <CheckCircle2 className="w-4 h-4 text-[#2C7A4B]" />
              </div>
              <h4 className="font-bold text-sm text-[#18231F]">SHG Incentive Audit</h4>
              <p className="text-[11px] text-[#5A6A62] mt-1">
                Repayment efficiency computed: Total ₹ {formatNumber(totalIncentives)} credited.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#2C7A4B]/20 text-[11px] font-semibold text-[#2C7A4B]">
              Calculated (Avg 99.2%)
            </div>
          </div>

          {/* Step 3: Statutory Audit (Active Stage) */}
          <div className="p-3.5 rounded-lg border border-[#0E5E4E] bg-[#DCEBE5]/50 flex flex-col justify-between ring-2 ring-[#0E5E4E]/20">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#0E5E4E] mb-1">
                <span>Stage 3 &bull; Active</span>
                <RefreshCw className="w-4 h-4 text-[#0E5E4E] animate-spin" />
              </div>
              <h4 className="font-bold text-sm text-[#18231F]">Statutory Reconciliation</h4>
              <p className="text-[11px] text-[#5A6A62] mt-1">
                PF (12%), ESIC, and Maharashtra PT (₹200/₹300) validation underway.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#0E5E4E]/30 text-[11px] font-bold text-[#0E5E4E]">
              {pendingAnomalies.length > 0 
                ? `${pendingAnomalies.length} Flagged Anomalies` 
                : 'All Checks Passed'}
            </div>
          </div>

          {/* Step 4: Final NEFT Disbursement */}
          <div className="p-3.5 rounded-lg border border-[#D9E0D6] bg-[#F4F6F2] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#5A6A62] mb-1">
                <span>Stage 4</span>
                <Building className="w-4 h-4 text-[#5A6A62]" />
              </div>
              <h4 className="font-bold text-sm text-[#18231F]">Bank NEFT Transfer</h4>
              <p className="text-[11px] text-[#5A6A62] mt-1">
                Bank of Maharashtra, SBI & Canara corporate gateway disbursement.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D9E0D6] text-[11px] font-medium text-[#5A6A62]">
              Awaiting Chief HR Sign-off
            </div>
          </div>
        </div>
      </div>

      {/* Flagged Audit Anomalies (if any) */}
      {pendingAnomalies.length > 0 && (
        <div className="bg-[#FFFFFF] border-2 border-[#A73C2A]/30 rounded-xl p-5 shadow-nbfc-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#A73C2A]" />
              <h3 className="font-bold text-sm text-[#18231F]">
                {isMarathi ? 'लेखापरीक्षण विसंगती (तातडीचे निराकरण आवश्यक)' : 'Audit Anomalies Requiring Resolution'}
              </h3>
            </div>
            <span className="text-xs bg-[#F5DFDA] text-[#A73C2A] font-bold px-2 py-0.5 rounded-full">
              {pendingAnomalies.length} Critical Items
            </span>
          </div>
          <p className="text-xs text-[#5A6A62]">
            {isMarathi
              ? 'खालील कर्मचाऱ्यांचे आधार ई-केवायसी किंवा जिओफेन्स अंतर तफावत आहे. कृपया निराकरण करा किंवा सवलत मंजूर करा.'
              : 'Discrepancies flagged by automated statutory audit rules. Review or accept grace period before releasing batch.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {pendingAnomalies.map((anom) => (
              <div
                key={anom.id}
                className="p-3.5 rounded-lg border border-[#D9E0D6] bg-[#F5DFDA]/30 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#A73C2A] uppercase tracking-wider">
                      {anom.statutoryType} &bull; {anom.severity}
                    </span>
                    <span className="text-[#5A6A62]">{anom.detectedAt}</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#18231F] mt-1">
                    {isMarathi ? anom.titleMr : anom.title}
                  </h4>
                  <p className="text-[11px] text-[#5A6A62] mt-0.5">{anom.description}</p>
                  <p className="text-[11px] font-semibold text-[#18231F] mt-1">
                    Employee: {anom.employeeName} ({anom.branch})
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#D9E0D6]">
                  <button
                    onClick={() => onResolveAnomaly(anom.id)}
                    className="flex-1 h-8 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] text-xs font-semibold rounded-lg transition"
                  >
                    {isMarathi ? 'सवलत मंजूर करा व सोडवा' : 'Approve Grace & Clear'}
                  </button>
                  <button
                    onClick={() => onResolveAnomaly(anom.id)}
                    className="h-8 px-3 bg-[#EBEFE8] hover:bg-[#D9E0D6] text-[#18231F] text-xs font-semibold rounded-lg transition"
                  >
                    Hold Salary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Financial Summary Cards with Colorful Top Accent Bars */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-xs">
          <div className="h-1 w-full bg-blue-500 absolute top-0 left-0"></div>
          <p className="text-[11px] text-blue-900 font-bold uppercase">{isMarathi ? 'मूळ वेतन' : 'Basic Pay'}</p>
          <p className="text-base font-extrabold text-[#0F172A] tabular-nums mt-0.5">{formatINR(totalBasic)}</p>
        </div>
        
        <div className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-xs">
          <div className="h-1 w-full bg-emerald-500 absolute top-0 left-0"></div>
          <p className="text-[11px] text-emerald-900 font-bold uppercase">{isMarathi ? 'बचत गट प्रोत्साहन' : 'SHG Incentives'}</p>
          <p className="text-base font-extrabold text-emerald-700 tabular-nums mt-0.5">{formatINR(totalIncentives)}</p>
        </div>

        <div className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-xs">
          <div className="h-1 w-full bg-indigo-500 absolute top-0 left-0"></div>
          <p className="text-[11px] text-indigo-900 font-bold uppercase">{isMarathi ? 'स्थूल वेतन' : 'Gross Earnings'}</p>
          <p className="text-base font-extrabold text-[#0F172A] tabular-nums mt-0.5">{formatINR(totalGross)}</p>
        </div>

        <div className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-xs">
          <div className="h-1 w-full bg-rose-500 absolute top-0 left-0"></div>
          <p className="text-[11px] text-rose-900 font-bold uppercase">{isMarathi ? 'ईपीएफ १२%' : 'EPF 12%'}</p>
          <p className="text-base font-extrabold text-rose-700 tabular-nums mt-0.5">{formatINR(totalPf)}</p>
        </div>

        <div className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-xs">
          <div className="h-1 w-full bg-purple-500 absolute top-0 left-0"></div>
          <p className="text-[11px] text-purple-900 font-bold uppercase">{isMarathi ? 'महाराष्ट्र पीटी' : 'Maha PT Tax'}</p>
          <p className="text-base font-extrabold text-purple-700 tabular-nums mt-0.5">{formatINR(totalPt)}</p>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-400 rounded-xl p-3.5 shadow-xs">
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 absolute top-0 left-0"></div>
          <p className="text-[11px] text-emerald-950 font-black uppercase tracking-wider">{isMarathi ? 'निव्वळ बँक ट्रान्सफर' : 'Net Disbursable'}</p>
          <p className="text-base font-black text-emerald-800 tabular-nums mt-0.5">{formatINR(totalNet)}</p>
        </div>
      </div>

      {/* Salary Breakdown & Payout Matrix Table */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl shadow-nbfc-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#D9E0D6] flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-[#18231F]">
              {isMarathi ? 'कर्मचारी वेतन नोंदवही व बँक खाती' : 'October 2026 Salary Register & Bank Ledger'}
            </h3>
            <p className="text-xs text-[#5A6A62]">
              Tabular numbers, statutory deductions, bank accounts & IFSC routing
            </p>
          </div>

          <button
            onClick={handleExportSalaryRegister}
            className="h-9 px-3.5 bg-[#EBEFE8] hover:bg-[#D9E0D6] text-[#18231F] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-[#0E5E4E]" />
            <span>{isMarathi ? 'वेतन रजिस्टर डाऊनलोड' : 'Export Salary Register'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBEFE8] text-[#5A6A62] text-[11px] font-semibold uppercase tracking-wider h-9 border-b border-[#D9E0D6]">
                <th className="px-3 py-2">{isMarathi ? 'आयडी' : 'Emp ID'}</th>
                <th className="px-4 py-2">{isMarathi ? 'कर्मचारी' : 'Staff Member'}</th>
                <th className="px-3 py-2">{isMarathi ? 'बँक व आयएफएससी' : 'Bank & IFSC'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'मूळ वेतन' : 'Basic (₹)'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'प्रोत्साहन' : 'Incentive (₹)'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'स्थूल वेतन' : 'Gross (₹)'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'पीएफ (१२%)' : 'PF (₹)'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'महा पीटी' : 'PT (₹)'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'निव्वळ देय' : 'Net Take Home (₹)'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'स्थिती' : 'Batch Status'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'पेस्लिप' : 'Payslip'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E0D6] text-xs">
              {employees.map((emp) => (
                <tr key={emp.id} className="h-12 hover:bg-[#F4F6F2] transition-colors">
                  <td className="px-3 py-2 font-mono text-[11px] font-semibold text-[#0E5E4E] whitespace-nowrap">
                    {emp.id}
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-semibold text-[#18231F]">{emp.name}</div>
                    <div className="text-[11px] text-[#5A6A62]">{emp.role}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-medium text-[#18231F]">{emp.bankName}</div>
                    <div className="font-mono text-[10px] text-[#5A6A62]">
                      A/C: ...{emp.accountNumber.slice(-4)} &bull; {emp.ifsc}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#5A6A62]">
                    {formatNumber(emp.basicSalary)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#2C7A4B] font-semibold">
                    +{formatNumber(emp.incentiveEarned)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#18231F] font-semibold">
                    {formatNumber(emp.grossSalary)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#A73C2A]">
                    -{formatNumber(emp.pfDeduction)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#A73C2A]">
                    -{formatNumber(emp.ptDeduction)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums font-bold text-[#0E5E4E] text-sm whitespace-nowrap">
                    {formatINR(emp.netPayable)}
                  </td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <StatusPill type="batch" value={emp.batchStatus} />
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <button
                      onClick={() => onOpenPayslip(emp)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#0E5E4E] hover:bg-[#DCEBE5] rounded transition"
                    >
                      {isMarathi ? 'पेस्लिप' : 'Payslip'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
