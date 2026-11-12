import React from 'react';
import { X, Printer, Download, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';
import { Employee } from '../types';
import { formatINR, formatNumber, numberToWordsINR } from '../utils/formatters';

interface PayslipModalProps {
  employee: Employee | null;
  onClose: () => void;
  isMarathi: boolean;
}

export const PayslipModal: React.FC<PayslipModalProps> = ({
  employee,
  onClose,
  isMarathi,
}) => {
  if (!employee) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#18231F]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-nbfc-modal overflow-hidden animate-in fade-in zoom-in-95 duration-150 print:m-0 print:border-none print:shadow-none print:max-w-none">
        {/* Modal Controls Bar (Hidden during printing) */}
        <div className="p-4 border-b border-[#D9E0D6] flex items-center justify-between bg-[#F4F6F2] print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0E5E4E]" />
            <span className="font-bold text-xs text-[#18231F]">
              Official Salary Slip & Tax Certificate &bull; October 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="h-8 px-3 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#5A6A62] hover:bg-[#EBEFE8]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Payslip Document Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#18231F] print:p-0 print:overflow-visible font-sans">
          {/* NBFC Header */}
          <div className="text-center pb-4 border-b-2 border-[#0E5E4E] space-y-1">
            <div className="flex flex-col items-center justify-center gap-1">
              <img 
                src="/hmpl_logo.png" 
                alt="Hindusthan Microfinance" 
                className="h-12 w-auto object-contain"
              />
              <h2 className="text-base font-extrabold text-[#3A52B8] tracking-tight uppercase">
                Hindusthan Microfinance Pvt Ltd
              </h2>
            </div>
            <p className="text-[11px] text-[#5A6A62]">
              CIN: U65923MH2016PLC192841 | RBI Reg: B-13.02194 | Registered Office: Senapati Bapat Road, Pune - 411016, Maharashtra
            </p>
            <p className="text-xs font-bold text-[#18231F] uppercase pt-1">
              Salary Payslip for the Month of October 2026 (वेतन प्रमाणपत्र)
            </p>
          </div>

          {/* Employee & Bank Summary Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3 bg-[#F4F6F2] rounded-lg border border-[#D9E0D6] text-xs">
            <div className="space-y-1">
              <p>Employee ID: <strong className="font-mono text-[#0E5E4E]">{employee.id}</strong></p>
              <p>Name: <strong>{employee.name}</strong> ({employee.nameMr})</p>
              <p>Designation: <strong>{employee.role}</strong></p>
              <p>Branch / Cluster: <strong>{employee.branch}</strong></p>
              <p>Department: <strong>Rural Credit Operations (Maharashtra)</strong></p>
            </div>
            <div className="space-y-1">
              <p>Bank: <strong>{employee.bankName}</strong></p>
              <p>Account No: <strong className="font-mono">{employee.accountNumber}</strong></p>
              <p>IFSC Code: <strong className="font-mono">{employee.ifsc}</strong></p>
              <p>UAN: <strong className="font-mono">{employee.uan}</strong> | PAN: <strong className="font-mono">{employee.pan}</strong></p>
              <p>Working Days: <strong>{employee.totalWorkingDays}</strong> | Paid Days: <strong>{employee.attendanceDays}</strong></p>
            </div>
          </div>

          {/* Earnings vs Deductions 2-Column Ledger */}
          <div className="grid grid-cols-2 gap-4 border border-[#D9E0D6] rounded-lg overflow-hidden">
            {/* Left: Earnings */}
            <div>
              <div className="bg-[#EBEFE8] px-3 py-1.5 font-bold text-xs text-[#18231F] border-b border-[#D9E0D6]">
                Earnings (रुपये)
              </div>
              <div className="p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5A6A62]">Basic Salary</span>
                  <span className="font-semibold tabular-nums">{formatINR(employee.basicSalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6A62]">House Rent Allowance (HRA)</span>
                  <span className="font-semibold tabular-nums">{formatINR(employee.hra)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6A62]">Field Conveyance Allowance</span>
                  <span className="font-semibold tabular-nums">{formatINR(employee.fieldConveyance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6A62]">Special Allowance</span>
                  <span className="font-semibold tabular-nums">{formatINR(employee.specialAllowance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2C7A4B] font-medium">SHG Collection Incentive</span>
                  <span className="font-bold tabular-nums text-[#2C7A4B]">+{formatINR(employee.incentiveEarned)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D9E0D6] font-bold text-[#18231F]">
                  <span>Total Gross Salary</span>
                  <span className="tabular-nums text-[#0E5E4E]">{formatINR(employee.grossSalary)}</span>
                </div>
              </div>
            </div>

            {/* Right: Deductions */}
            <div className="border-l border-[#D9E0D6]">
              <div className="bg-[#EBEFE8] px-3 py-1.5 font-bold text-xs text-[#18231F] border-b border-[#D9E0D6]">
                Deductions (रुपये)
              </div>
              <div className="p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5A6A62]">Provident Fund (EPF 12%)</span>
                  <span className="font-semibold tabular-nums text-[#A73C2A]">-{formatINR(employee.pfDeduction)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6A62]">Maharashtra PT</span>
                  <span className="font-semibold tabular-nums text-[#A73C2A]">-{formatINR(employee.ptDeduction)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6A62]">ESIC (0.75%)</span>
                  <span className="font-semibold tabular-nums text-[#A73C2A]">-{formatINR(employee.esicDeduction)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6A62]">Income Tax TDS</span>
                  <span className="font-semibold tabular-nums text-[#A73C2A]">-{formatINR(employee.tdsDeduction)}</span>
                </div>
                <div className="flex justify-between text-[#5A6A62] italic text-[11px]">
                  <span>Other Recoveries</span>
                  <span>₹ 0</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D9E0D6] font-bold text-[#18231F]">
                  <span>Total Deductions</span>
                  <span className="tabular-nums text-[#A73C2A]">-{formatINR(employee.totalDeductions)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Pay Box */}
          <div className="p-3.5 bg-[#DCEBE5] border border-[#0E5E4E]/40 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-[#0E5E4E] font-bold uppercase tracking-wider">
                Net Salary Payable (निव्वळ वेतन)
              </p>
              <p className="text-xs text-[#18231F] font-medium mt-0.5 italic">
                In Words: {numberToWordsINR(employee.netPayable)}
              </p>
            </div>
            <div className="text-xl font-bold tabular-nums text-[#0E5E4E]">
              {formatINR(employee.netPayable)}
            </div>
          </div>

          {/* Footer Signatory Notice */}
          <div className="pt-4 border-t border-[#D9E0D6] flex justify-between items-end text-[11px] text-[#5A6A62]">
            <div>
              <p>Generated via Hindusthan Microfinance People Core ERP.</p>
              <p>This is a computer-generated statutory statement; no physical signature required.</p>
            </div>
            <div className="text-right">
              <div className="w-24 border-b border-[#18231F] mb-1"></div>
              <p className="font-bold text-[#18231F]">Authorized Signatory</p>
              <p>Head of People Operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
