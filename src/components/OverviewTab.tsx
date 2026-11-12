import React from 'react';
import { 
  Users, 
  ReceiptIndianRupee, 
  Percent, 
  Fingerprint, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Clock,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';
import { Employee, AuditAnomaly, BranchStat } from '../types';
import { formatINR, formatNumber, formatPercent } from '../utils/formatters';
import { StatusPill } from './StatusPill';

interface OverviewTabProps {
  employees: Employee[];
  branches: BranchStat[];
  anomalies: AuditAnomaly[];
  isMarathi: boolean;
  onNavigateTab: (tab: 'roster' | 'payroll' | 'biometric' | 'statutory' | 'incentives') => void;
  onOpenAnomaly: (anomaly: AuditAnomaly) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  employees,
  branches,
  anomalies,
  isMarathi,
  onNavigateTab,
  onOpenAnomaly,
}) => {
  // Compute live aggregates from active employees
  const totalEmployees = employees.length;
  const totalGrossPayroll = employees.reduce((acc, curr) => acc + curr.grossSalary, 0);
  const totalNetPayroll = employees.reduce((acc, curr) => acc + curr.netPayable, 0);
  const totalIncentives = employees.reduce((acc, curr) => acc + curr.incentiveEarned, 0);
  const totalPfDeduction = employees.reduce((acc, curr) => acc + curr.pfDeduction, 0);
  const totalPtDeduction = employees.reduce((acc, curr) => acc + curr.ptDeduction, 0);
  const avgCollectionRate = employees.reduce((acc, curr) => acc + curr.collectionRate, 0) / (totalEmployees || 1);
  const avgBiometricRate = employees.reduce((acc, curr) => acc + curr.biometricCompliance, 0) / (totalEmployees || 1);
  const totalLoanBook = employees.reduce((acc, curr) => acc + curr.loanPortfolio, 0);
  const pendingKycCount = employees.filter((e) => e.kycStatus !== 'verified').length;

  // District color mappings for colorful visual flair
  const districtColors: Record<string, { bg: string; text: string; badge: string }> = {
    Pune: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', badge: 'bg-blue-600' },
    Satara: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-600' },
    Kolhapur: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', badge: 'bg-purple-600' },
    Solapur: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', badge: 'bg-amber-600' },
    Ahmednagar: { bg: 'bg-teal-50 border-teal-200', text: 'text-teal-700', badge: 'bg-teal-600' },
    Sangli: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', badge: 'bg-rose-600' },
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome & Audit Banner in Hindusthan Brand Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E3A8A] via-[#2F48B5] to-[#047857] p-6 text-white shadow-lg">
        {/* Decorative background circles */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
        <div className="absolute right-40 -top-10 w-40 h-40 rounded-full bg-[#F07800]/20 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-amber-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Hindusthan Microfinance Core Dashboard</span>
              <span className="text-white/40">&bull;</span>
              <span className="text-emerald-200">October 2026 Live Audit</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {isMarathi 
                ? 'हिंदुस्थान मायक्रोफायनान्स — कर्मचारी व वेतन नियंत्रण केंद्र' 
                : 'Hindusthan Microfinance Operations & Payroll Control Center'}
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {isMarathi 
                ? 'महाराष्ट्र ग्रामीण कर्ज वाटप, बचत गट वसुली (९९.२%), बायोमेट्रिक हजेरी व ईपीएफओ ईसीआर चलन मंजुरी प्रक्रियेत आहे.' 
                : 'Overseeing rural micro-credit across Western Maharashtra & Marathwada. SHG repayment efficiency stands at a record 99.2% with zero PAR delinquency.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('payroll')}
              className="h-10 px-5 bg-gradient-to-r from-[#F07800] to-[#E8630A] hover:from-[#E06E00] hover:to-[#D55A00] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md shadow-orange-900/30 transition active:scale-98"
            >
              <span>{isMarathi ? 'वेतन लेखापरीक्षण उघडा' : 'Review Payroll Batch'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('statutory')}
              className="h-10 px-4 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition"
            >
              <span>{isMarathi ? 'वैधानिक ईसीआर' : 'EPFO ECR'}</span>
            </button>
          </div>
        </div>

        {/* Banner mini-stats strip */}
        <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-blue-200 text-[11px]">Managed Portfolio:</span>
            <p className="text-base font-bold text-white tabular-nums">{formatINR(totalLoanBook)}</p>
          </div>
          <div>
            <span className="text-blue-200 text-[11px]">Collection Target:</span>
            <p className="text-base font-bold text-emerald-300 tabular-nums">99.2% Achieved</p>
          </div>
          <div>
            <span className="text-blue-200 text-[11px]">Incentives Earned:</span>
            <p className="text-base font-bold text-amber-300 tabular-nums">{formatINR(totalIncentives)}</p>
          </div>
          <div>
            <span className="text-blue-200 text-[11px]">Statutory Status:</span>
            <p className="text-base font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Checks Ready
            </p>
          </div>
        </div>
      </div>

      {/* 4 Colorful & Dynamic Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Active Workforce (Vibrant Royal Blue) */}
        <div className="group relative bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600 absolute top-0 left-0"></div>
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-blue-900 tracking-wide uppercase">
                {isMarathi ? 'सक्रिय फील्ड अधिकारी' : 'Active Field Staff'}
              </p>
              <div className="text-3xl font-extrabold text-[#0F172A] tabular-nums mt-1">
                {formatNumber(totalEmployees)}
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">Across 6 Maharashtra districts</p>
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
            <span className="text-[#64748B]">Pending KYC Checks:</span>
            <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] tabular-nums ${
              pendingKycCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {pendingKycCount} to review
            </span>
          </div>
        </div>

        {/* Metric 2: Net Payroll (Vibrant Saffron Orange) */}
        <div className="group relative bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F07800] to-amber-500 absolute top-0 left-0"></div>
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-amber-900 tracking-wide uppercase">
                {isMarathi ? 'निव्वळ देय वेतन' : 'Net Disbursable'}
              </p>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tabular-nums mt-1">
                {formatINR(totalNetPayroll)}
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">October 2026 Batch Release</p>
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F07800] to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition">
              <ReceiptIndianRupee className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
            <span className="text-[#64748B]">Total Gross CTC:</span>
            <span className="font-extrabold text-[#0F172A] tabular-nums">
              {formatINR(totalGrossPayroll)}
            </span>
          </div>
        </div>

        {/* Metric 3: Microfinance Collection Efficiency (Vibrant Emerald Green) */}
        <div className="group relative bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-500 absolute top-0 left-0"></div>
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-900 tracking-wide uppercase">
                {isMarathi ? 'कर्ज वसुली कार्यक्षमता' : 'SHG Collection'}
              </p>
              <div className="text-3xl font-extrabold text-emerald-700 tabular-nums mt-1 flex items-baseline gap-1.5">
                <span>{formatPercent(avgCollectionRate)}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Super Tier</span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">PAR 30 Delinquency: 0.42%</p>
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
              <Percent className="w-6 h-6" />
            </div>
          </div>

          {/* Visual Mini Progress Bar */}
          <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, avgCollectionRate)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Metric 4: Biometric Compliance (Vibrant Violet / Purple) */}
        <div className="group relative bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-pink-500 absolute top-0 left-0"></div>
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-purple-900 tracking-wide uppercase">
                {isMarathi ? 'बायोमेट्रिक हजेरी' : 'Geofence Punch Rate'}
              </p>
              <div className="text-3xl font-extrabold text-purple-800 tabular-nums mt-1">
                {formatPercent(avgBiometricRate)}
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">GPS verified at SHG centers</p>
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition">
              <Fingerprint className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
            <span className="text-[#64748B]">Active Anomaly Flags:</span>
            <span className="px-2 py-0.5 rounded-full font-bold text-[11px] bg-rose-100 text-rose-800 tabular-nums">
              {anomalies.filter((a) => a.status === 'flagged').length} Alerts
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Clusters Matrix & Priority Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Regional Cluster Operations with colorful district cards */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-gradient-to-r from-[#F8FAFC] to-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">
                    {isMarathi ? 'महाराष्ट्र जिल्हा क्लस्टर कामगिरी व वसुली मॅट्रिक्स' : 'Maharashtra Cluster Operations & Portfolio Matrix'}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Active credit officer deployment and performance indicators
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('roster')}
                className="text-xs font-bold text-[#3A52B8] hover:underline flex items-center gap-1"
              >
                <span>{isMarathi ? 'सर्व कर्मचारी पहा' : 'View Full Roster'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#64748B] text-[11px] font-bold uppercase tracking-wider h-10 border-b border-[#E2E8F0]">
                    <th className="px-5 py-2">{isMarathi ? 'क्लस्टर / शाखा' : 'Cluster Branch'}</th>
                    <th className="px-3 py-2">{isMarathi ? 'जिल्हा' : 'District'}</th>
                    <th className="px-3 py-2 text-right">{isMarathi ? 'कर्मचारी' : 'Staff'}</th>
                    <th className="px-3 py-2 text-right">{isMarathi ? 'कर्ज खाते' : 'Loan Portfolio'}</th>
                    <th className="px-3 py-2 text-right">{isMarathi ? 'वसुली दर' : 'Repayment'}</th>
                    <th className="px-5 py-2 text-center">{isMarathi ? 'स्थिती' : 'Audit Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-xs">
                  {branches.map((b) => {
                    const styling = districtColors[b.district] || { bg: 'bg-slate-50', text: 'text-slate-700', badge: 'bg-slate-600' };
                    return (
                      <tr key={b.id} className="h-14 hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-5 py-2">
                          <div className="font-bold text-[#0F172A] text-sm">
                            {isMarathi ? b.nameMr : b.name}
                          </div>
                          <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#3A52B8]" />
                            <span>Taluka: {b.taluka}</span>
                          </div>
                        </td>

                        <td className="px-3 py-2">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${styling.bg} ${styling.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${styling.badge}`}></span>
                            {b.district}
                          </span>
                        </td>

                        <td className="px-3 py-2 text-right font-extrabold tabular-nums text-[#0F172A]">
                          {b.fcoCount}
                        </td>

                        <td className="px-3 py-2 text-right font-bold tabular-nums text-[#0F172A]">
                          {formatINR(b.activeLoanBook)}
                        </td>

                        <td className="px-3 py-2 text-right tabular-nums">
                          <span className="font-extrabold text-emerald-700 text-sm">
                            {formatPercent(b.avgCollectionRate)}
                          </span>
                        </td>

                        <td className="px-5 py-2 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            b.complianceScore > 98
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}>
                            {b.complianceScore > 98 ? 'Audit Passed' : 'Under Review'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-xs text-[#64748B]">
            <span>Total Active Micro-banking Hubs: <strong className="text-[#0F172A]">6 Districts</strong></span>
            <span className="text-[#008A3D] font-bold">100% NABARD & RBI Prudential Compliance</span>
          </div>
        </div>

        {/* Right Col: Colorful Statutory Radar & Priority Alerts */}
        <div className="space-y-4">
          {/* Statutory Filing Radar */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#008A3D] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">
                    {isMarathi ? 'वैधानिक अनुपालन केंद्र' : 'Statutory Mandates Radar'}
                  </h3>
                  <p className="text-[11px] text-[#64748B]">October 2026 Returns Schedule</p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('statutory')}
                className="text-xs font-bold text-[#3A52B8] hover:underline"
              >
                {isMarathi ? 'तपशील' : 'Details'} &rarr;
              </button>
            </div>

            <div className="space-y-2.5 mt-3.5 text-xs">
              {/* EPFO ECR Card */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between hover:bg-blue-50 transition">
                <div>
                  <p className="font-bold text-blue-950">EPFO Electronic Challan (ECR)</p>
                  <p className="text-[11px] text-blue-700 tabular-nums">
                    Provision: {formatINR(totalPfDeduction)} (12% Basic)
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                  ECR Ready
                </span>
              </div>

              {/* Maharashtra PT Card */}
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 flex items-center justify-between hover:bg-purple-50 transition">
                <div>
                  <p className="font-bold text-purple-950">Maharashtra State PT (PTRC)</p>
                  <p className="text-[11px] text-purple-700 tabular-nums">
                    Tax: {formatINR(totalPtDeduction)} &bull; Due 21 Nov
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white">
                  Calculated
                </span>
              </div>

              {/* ESIC Form 5 */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between hover:bg-amber-50 transition">
                <div>
                  <p className="font-bold text-amber-950">ESIC Form 5 Monthly Return</p>
                  <p className="text-[11px] text-amber-700">Dispensary Mapping: 100%</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white">
                  Pending BOM
                </span>
              </div>

              {/* Gratuity Reserve */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between hover:bg-emerald-50 transition">
                <div>
                  <p className="font-bold text-emerald-950">Payment of Gratuity Reserve</p>
                  <p className="text-[11px] text-emerald-700">LIC Actuarial Fund: Compliant</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                  Vested
                </span>
              </div>
            </div>
          </div>

          {/* Priority Audit Alerts Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">
                  {isMarathi ? 'लेखापरीक्षण इशारे' : 'Priority Audit Alerts'}
                </h3>
              </div>
              <span className="text-xs bg-rose-100 text-rose-700 font-extrabold px-2.5 py-0.5 rounded-full tabular-nums border border-rose-200">
                {anomalies.filter((a) => a.status === 'flagged').length}
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {anomalies.map((anom) => (
                <div
                  key={anom.id}
                  onClick={() => onOpenAnomaly(anom)}
                  className="p-3.5 rounded-xl border border-[#E2E8F0] hover:border-[#3A52B8] hover:bg-[#F8FAFC] transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-rose-600">
                      {anom.statutoryType} &bull; {anom.severity}
                    </span>
                    <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {anom.detectedAt.split(' ')[1]}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0F172A] mt-1 line-clamp-1 group-hover:text-[#3A52B8] transition">
                    {isMarathi ? anom.titleMr : anom.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                    {anom.employeeName} ({anom.branch})
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="text-[#3A52B8] font-bold flex items-center gap-1 group-hover:underline">
                      {isMarathi ? 'निराकरण करा' : 'Review & Resolve'} &rarr;
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      anom.status === 'flagged' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {anom.status === 'flagged' ? 'Unresolved' : 'Resolved'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
