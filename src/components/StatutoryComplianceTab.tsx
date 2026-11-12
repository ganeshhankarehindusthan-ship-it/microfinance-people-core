import React, { useState } from 'react';
import { 
  FileCheck2, 
  Download, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Info,
  Calendar,
  Copy,
  Check
} from 'lucide-react';
import { Employee } from '../types';
import { formatINR, formatNumber } from '../utils/formatters';
import { StatusPill } from './StatusPill';

interface StatutoryComplianceTabProps {
  employees: Employee[];
  isMarathi: boolean;
}

export const StatutoryComplianceTab: React.FC<StatutoryComplianceTabProps> = ({
  employees,
  isMarathi,
}) => {
  const [copiedEcr, setCopiedEcr] = useState(false);
  const [selectedSubTab, setSelectedSubTab] = useState<'epf' | 'pt' | 'esic' | 'gratuity'>('epf');

  // Statutory calculations
  const totalEmployees = employees.length;
  const totalGross = employees.reduce((acc, e) => acc + e.grossSalary, 0);
  const totalEpfBasic = employees.reduce((acc, e) => acc + e.basicSalary, 0);
  const totalEePf = employees.reduce((acc, e) => acc + e.pfDeduction, 0); // 12%
  const totalErEps = Math.round(totalEpfBasic * 0.0833); // 8.33% EPS
  const totalErPf = totalEePf - totalErEps; // 3.67% EPF difference
  const totalAdminPf = Math.round(totalEpfBasic * 0.005); // 0.5% Admin charges

  const totalPtMaharashtra = employees.reduce((acc, e) => acc + e.ptDeduction, 0);

  // Generate EPFO ECR Text File string
  // Format: UAN#~#MEMBER_NAME#~#GROSS#~#EPF_WAGES#~#EPS_WAGES#~#EDLI_WAGES#~#EE_SHARE#~#EPS_SHARE#~#ER_SHARE#~#NCP_DAYS#~#REFUND
  const generateEcrText = () => {
    return employees.map((e) => {
      const gross = e.grossSalary;
      const epfWage = Math.min(e.basicSalary, 15000); // capped at statutory 15k or actual
      const eeShare = Math.round(epfWage * 0.12);
      const epsShare = Math.round(epfWage * 0.0833);
      const erShare = eeShare - epsShare;
      const ncpDays = Math.max(0, e.totalWorkingDays - Math.floor(e.attendanceDays));

      return `${e.uan}#~#${e.name.toUpperCase()}#~#${gross}#~#${epfWage}#~#${epfWage}#~#${epfWage}#~#${eeShare}#~#${epsShare}#~#${erShare}#~#${ncpDays}#~#0`;
    }).join('\n');
  };

  const handleDownloadEcr = () => {
    const ecrContent = generateEcrText();
    const blob = new Blob([ecrContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ECR_EPFO_OCT2026_MH_PUN_${Date.now().toString().slice(-6)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyEcr = () => {
    navigator.clipboard.writeText(generateEcrText());
    setCopiedEcr(true);
    setTimeout(() => setCopiedEcr(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-5 shadow-nbfc-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0E5E4E]" />
            <h2 className="text-base font-bold text-[#18231F]">
              {isMarathi ? 'वैधानिक अनुपालन केंद्र व शासकीय विवरणपत्रे' : 'Statutory Compliance Center & Government Returns'}
            </h2>
          </div>
          <p className="text-xs text-[#5A6A62] mt-0.5">
            EPFO ECR generation, Maharashtra State Professional Tax (PTRC), ESIC Form 5, and Payment of Gratuity Act
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadEcr}
            className="h-10 px-4 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] text-xs font-semibold rounded-lg flex items-center gap-2 transition shadow-sm"
          >
            <Download className="w-4 h-4 text-[#A9F1DB]" />
            <span>{isMarathi ? 'ईपीएफओ ईसीआर फाईल (.txt)' : 'Download EPFO ECR (.txt)'}</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation pills */}
      <div className="flex items-center gap-2 border-b border-[#D9E0D6] pb-2 text-xs font-semibold">
        <button
          onClick={() => setSelectedSubTab('epf')}
          className={`px-4 py-2 rounded-lg transition ${
            selectedSubTab === 'epf'
              ? 'bg-[#0E5E4E] text-[#FFFFFF]'
              : 'bg-[#FFFFFF] text-[#5A6A62] hover:bg-[#EBEFE8]'
          }`}
        >
          1. EPFO Electronic Challan (ECR)
        </button>
        <button
          onClick={() => setSelectedSubTab('pt')}
          className={`px-4 py-2 rounded-lg transition ${
            selectedSubTab === 'pt'
              ? 'bg-[#0E5E4E] text-[#FFFFFF]'
              : 'bg-[#FFFFFF] text-[#5A6A62] hover:bg-[#EBEFE8]'
          }`}
        >
          2. Maharashtra Professional Tax (PT)
        </button>
        <button
          onClick={() => setSelectedSubTab('esic')}
          className={`px-4 py-2 rounded-lg transition ${
            selectedSubTab === 'esic'
              ? 'bg-[#0E5E4E] text-[#FFFFFF]'
              : 'bg-[#FFFFFF] text-[#5A6A62] hover:bg-[#EBEFE8]'
          }`}
        >
          3. ESIC Health Coverage
        </button>
        <button
          onClick={() => setSelectedSubTab('gratuity')}
          className={`px-4 py-2 rounded-lg transition ${
            selectedSubTab === 'gratuity'
              ? 'bg-[#0E5E4E] text-[#FFFFFF]'
              : 'bg-[#FFFFFF] text-[#5A6A62] hover:bg-[#EBEFE8]'
          }`}
        >
          4. Payment of Gratuity Reserve
        </button>
      </div>

      {/* Subtab 1: EPFO ECR */}
      {selectedSubTab === 'epf' && (
        <div className="space-y-6">
          {/* Statutory Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card">
              <span className="text-xs text-[#5A6A62]">Total EPF Wages</span>
              <p className="text-xl font-bold text-[#18231F] tabular-nums mt-1">
                {formatINR(totalEpfBasic)}
              </p>
              <p className="text-[11px] text-[#5A6A62] mt-0.5">Basic pay of enrolled staff</p>
            </div>
            <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card">
              <span className="text-xs text-[#5A6A62]">Employee Share (12%)</span>
              <p className="text-xl font-bold text-[#0E5E4E] tabular-nums mt-1">
                {formatINR(totalEePf)}
              </p>
              <p className="text-[11px] text-[#2C7A4B] mt-0.5">Deducted from October payroll</p>
            </div>
            <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card">
              <span className="text-xs text-[#5A6A62]">Employer Share (EPF + EPS)</span>
              <p className="text-xl font-bold text-[#18231F] tabular-nums mt-1">
                {formatINR(totalEePf)}
              </p>
              <p className="text-[11px] text-[#5A6A62] mt-0.5">8.33% Pension + 3.67% Provident</p>
            </div>
            <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card">
              <span className="text-xs text-[#5A6A62]">Admin Charges (Account 02)</span>
              <p className="text-xl font-bold text-[#C9820F] tabular-nums mt-1">
                {formatINR(totalAdminPf)}
              </p>
              <p className="text-[11px] text-[#5A6A62] mt-0.5">0.50% statutory fee</p>
            </div>
          </div>

          {/* ECR Text Preview Box */}
          <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl shadow-nbfc-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E0D6]">
              <div>
                <h3 className="font-bold text-sm text-[#18231F] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0E5E4E]" />
                  <span>EPFO ECR Upload Format Preview (.txt)</span>
                </h3>
                <p className="text-xs text-[#5A6A62]">
                  Valid 12-column delimiter format required by EPFO Unified Employer Portal
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEcr}
                  className="h-8 px-3 bg-[#EBEFE8] hover:bg-[#D9E0D6] text-[#18231F] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  {copiedEcr ? <Check className="w-3.5 h-3.5 text-[#2C7A4B]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEcr ? 'Copied' : 'Copy Raw'}</span>
                </button>
                <button
                  onClick={handleDownloadEcr}
                  className="h-8 px-3 bg-[#0E5E4E] text-[#FFFFFF] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition hover:bg-[#0A493D]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save .txt</span>
                </button>
              </div>
            </div>

            <div className="bg-[#18231F] text-[#A9F1DB] font-mono text-xs p-4 rounded-lg overflow-x-auto max-h-60 leading-relaxed">
              <pre className="whitespace-pre">{generateEcrText()}</pre>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5A6A62] pt-1">
              <Info className="w-4 h-4 text-[#0E5E4E] shrink-0" />
              <span>
                Format schema: <code className="text-[#18231F] font-mono">UAN#~#MEMBER_NAME#~#GROSS#~#EPF_WAGES#~#EPS_WAGES#~#EDLI_WAGES#~#EE_SHARE#~#EPS_SHARE#~#ER_SHARE#~#NCP_DAYS#~#REFUND</code>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Maharashtra PT */}
      {selectedSubTab === 'pt' && (
        <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-5 shadow-nbfc-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E0D6]">
            <div>
              <h3 className="font-bold text-sm text-[#18231F]">
                Maharashtra State Tax on Professions (PTEC / PTRC)
              </h3>
              <p className="text-xs text-[#5A6A62]">
                Deducted pursuant to the Maharashtra State Tax on Professions, Trades, Callings and Employments Act, 1975
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#5A6A62]">Monthly Tax Remittance:</span>
              <p className="text-xl font-bold text-[#A73C2A] tabular-nums">{formatINR(totalPtMaharashtra)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] space-y-2 text-xs">
              <h4 className="font-bold text-sm text-[#18231F]">Maharashtra Statutory Slabs (Male & Female)</h4>
              <ul className="space-y-1.5 text-[#5A6A62]">
                <li className="flex justify-between">
                  <span>Up to ₹ 7,500 monthly:</span>
                  <strong className="text-[#18231F]">NIL</strong>
                </li>
                <li className="flex justify-between">
                  <span>₹ 7,501 to ₹ 10,000 monthly:</span>
                  <strong className="text-[#18231F]">₹ 175 / month (Men only; Women exempt)</strong>
                </li>
                <li className="flex justify-between">
                  <span>₹ 10,001 and above:</span>
                  <strong className="text-[#18231F]">₹ 200 / month (₹ 300 in February)</strong>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#DCEBE5]/40 border border-[#0E5E4E]/30 space-y-2 text-xs">
              <h4 className="font-bold text-sm text-[#0E5E4E]">Filing Schedule & Challan</h4>
              <p className="text-[#18231F]">
                PTRC Registration Number: <strong>27194829104P</strong>
              </p>
              <p className="text-[#5A6A62]">
                Monthly return due on or before <strong>21st November 2026</strong> on the Maharashtra Goods and Services Tax / Sales Tax Department Portal (Mahagst).
              </p>
              <div className="pt-2">
                <StatusPill type="custom" value="success" label="Challan Reconciled" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: ESIC */}
      {selectedSubTab === 'esic' && (
        <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-5 shadow-nbfc-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E0D6]">
            <div>
              <h3 className="font-bold text-sm text-[#18231F]">
                ESIC (Employees' State Insurance Corporation) Return
              </h3>
              <p className="text-xs text-[#5A6A62]">
                Applicable for employees with gross monthly wages up to ₹ 21,000/-
              </p>
            </div>
            <StatusPill type="custom" value="success" label="Form 5 Ready" />
          </div>

          <div className="text-xs text-[#5A6A62] space-y-3">
            <p>
              Microfinance field officers exceeding ₹21,000 gross monthly wage are covered under NBFC Comprehensive Group Medical Insurance with Bajaj Allianz (Sum Insured ₹ 3,00,000 per family unit).
            </p>
            <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] flex justify-between">
              <div>
                <p className="font-semibold text-[#18231F]">Mapped Regional Dispensaries:</p>
                <p className="text-[#5A6A62]">Baramati Sub-District Hospital, Wai ESI Clinic, Jaysingpur Dispensary</p>
              </div>
              <div className="text-right font-bold text-[#2C7A4B]">
                100% IP Card Generation
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Gratuity */}
      {selectedSubTab === 'gratuity' && (
        <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-5 shadow-nbfc-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E0D6]">
            <div>
              <h3 className="font-bold text-sm text-[#18231F]">
                Payment of Gratuity Act, 1972 (Actuarial Reserve Fund)
              </h3>
              <p className="text-xs text-[#5A6A62]">
                Statutory formula: (15 × Last Drawn Basic × Number of Completed Years) ÷ 26
              </p>
            </div>
            <StatusPill type="custom" value="success" label="LIC Master Policy Funded" />
          </div>

          <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] text-xs space-y-2">
            <p className="text-[#18231F] font-semibold">
              Group Gratuity Scheme with Life Insurance Corporation of India (LIC):
            </p>
            <p className="text-[#5A6A62]">
              Annual actuarial provision certified by licensed actuaries. All Field Credit Officers and Branch Managers with &gt; 5 years of service are vested with full gratuity guarantee upon retirement or resignation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
