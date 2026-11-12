import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sliders, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  ReceiptIndianRupee, 
  Info,
  ShieldCheck,
  Building
} from 'lucide-react';
import { Employee } from '../types';
import { formatINR, formatNumber, formatPercent } from '../utils/formatters';

interface IncentiveSimulatorTabProps {
  employees: Employee[];
  isMarathi: boolean;
  onApplyIncentivesToBatch: (incentiveMap: Record<string, number>) => void;
}

export const IncentiveSimulatorTab: React.FC<IncentiveSimulatorTabProps> = ({
  employees,
  isMarathi,
  onApplyIncentivesToBatch,
}) => {
  // Simulator parameters
  const [targetRepaymentRate, setTargetRepaymentRate] = useState<number>(99.2);
  const [newJlgFormations, setNewJlgFormations] = useState<number>(3);
  const [par30Target, setPar30Target] = useState<number>(0.5);
  const [isApplied, setIsApplied] = useState(false);

  // Field officers only
  const fieldOfficers = employees.filter((e) => 
    e.role.includes('Credit Officer') || e.role.includes('Recovery')
  );

  // Calculate incentive tiers per officer based on simulator sliders
  const calculatedIncentives = fieldOfficers.map((fco) => {
    // 1. Repayment tier bonus
    let repaymentBonus = 0;
    if (fco.collectionRate >= 99.5) {
      repaymentBonus = 5000;
    } else if (fco.collectionRate >= 98.5) {
      repaymentBonus = 3500;
    } else if (fco.collectionRate >= 97.0) {
      repaymentBonus = 1800;
    } else {
      repaymentBonus = 500;
    }

    // Slider adjustment multiplier
    const repaymentMultiplier = targetRepaymentRate >= 99.0 ? 1.15 : 1.0;
    repaymentBonus = Math.round(repaymentBonus * repaymentMultiplier);

    // 2. New JLG formation bonus (e.g. ₹ 800 per group)
    const jlgBonus = newJlgFormations * 800;

    // 3. PAR 30 Quality bonus
    const parBonus = fco.par30Rate <= par30Target ? 2000 : 0;

    const totalSimulatedIncentive = repaymentBonus + jlgBonus + parBonus;
    const diff = totalSimulatedIncentive - fco.incentiveEarned;

    return {
      fco,
      repaymentBonus,
      jlgBonus,
      parBonus,
      totalSimulatedIncentive,
      diff,
    };
  });

  const totalCurrentIncentives = fieldOfficers.reduce((acc, f) => acc + f.incentiveEarned, 0);
  const totalSimulatedIncentives = calculatedIncentives.reduce((acc, c) => acc + c.totalSimulatedIncentive, 0);
  const netIncentiveVariance = totalSimulatedIncentives - totalCurrentIncentives;

  const handleApplyToBatch = () => {
    const map: Record<string, number> = {};
    calculatedIncentives.forEach((item) => {
      map[item.fco.id] = item.totalSimulatedIncentive;
    });
    onApplyIncentivesToBatch(map);
    setIsApplied(true);
    setTimeout(() => setIsApplied(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Alert if applied */}
      {isApplied && (
        <div className="bg-[#DDEFE3] border border-[#2C7A4B]/40 text-[#2C7A4B] p-4 rounded-xl flex items-center justify-between text-xs font-semibold animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#2C7A4B]" />
            <span>
              {isMarathi 
                ? 'सिम्युलेटेड प्रोत्साहन यशस्वीरीत्या ऑक्टोबर २०२६ वेतन बॅचमध्ये लागू केले गेले!' 
                : 'Simulated incentive disbursements successfully applied to October 2026 payroll batch!'}
            </span>
          </div>
          <span className="tabular-nums">+{formatINR(netIncentiveVariance)} net delta</span>
        </div>
      )}

      {/* Simulator Control Sliders */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-5 shadow-nbfc-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#D9E0D6]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C9820F]" />
              <h2 className="text-base font-bold text-[#18231F]">
                {isMarathi ? 'मायक्रोफायनान्स फील्ड प्रोत्साहन व वसुली कमिशन सिम्युलेटर' : 'Field Credit Officer Incentive & Collection Simulator'}
              </h2>
            </div>
            <p className="text-xs text-[#5A6A62] mt-0.5">
              Simulate recovery rate tier bonuses, new JLG disbursements, and PAR 30 zero-delinquency rewards
            </p>
          </div>

          <button
            onClick={handleApplyToBatch}
            className="h-10 px-4 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] text-xs font-semibold rounded-lg flex items-center gap-2 transition shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-[#A9F1DB]" />
            <span>{isMarathi ? 'सक्रिय बॅचमध्ये लागू करा' : 'Apply to Current Payroll Batch'}</span>
          </button>
        </div>

        {/* 3 Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Target Repayment Rate */}
          <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#18231F]">
                {isMarathi ? 'बचत गट वसुली दर लक्ष्य' : 'SHG Collection Threshold'}
              </span>
              <span className="text-sm font-bold text-[#0E5E4E] tabular-nums">
                {targetRepaymentRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="95.0"
              max="100.0"
              step="0.1"
              value={targetRepaymentRate}
              onChange={(e) => setTargetRepaymentRate(parseFloat(e.target.value))}
              className="w-full accent-[#0E5E4E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#5A6A62]">
              <span>95.0% (Base)</span>
              <span>98.5% (Standard)</span>
              <span>100% (Super Tier)</span>
            </div>
          </div>

          {/* Slider 2: New JLG Formations */}
          <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#18231F]">
                {isMarathi ? 'नवीन जेएलजी गट निर्मिती' : 'New JLG Groups per FCO'}
              </span>
              <span className="text-sm font-bold text-[#C9820F] tabular-nums">
                {newJlgFormations} {isMarathi ? 'गट' : 'Groups'} (₹ {newJlgFormations * 800})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={newJlgFormations}
              onChange={(e) => setNewJlgFormations(parseInt(e.target.value))}
              className="w-full accent-[#C9820F] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#5A6A62]">
              <span>0 Groups</span>
              <span>3 Groups (Norm)</span>
              <span>6 Groups (Max)</span>
            </div>
          </div>

          {/* Slider 3: Max PAR 30 Ceiling */}
          <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#18231F]">
                {isMarathi ? 'पार ३० कमाल मर्यादा (PAR 30)' : 'PAR 30 Quality Ceiling'}
              </span>
              <span className="text-sm font-bold text-[#2C7A4B] tabular-nums">
                &le; {par30Target.toFixed(1)}% (+₹2,000)
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.5"
              step="0.1"
              value={par30Target}
              onChange={(e) => setPar30Target(parseFloat(e.target.value))}
              className="w-full accent-[#2C7A4B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#5A6A62]">
              <span>0.2% (Strict)</span>
              <span>0.5% (Standard)</span>
              <span>1.5% (Relaxed)</span>
            </div>
          </div>
        </div>

        {/* Incentive Impact Strip */}
        <div className="p-4 rounded-xl bg-[#DCEBE5]/40 border border-[#0E5E4E]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0E5E4E] text-[#FFFFFF] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#A9F1DB]" />
            </div>
            <div>
              <p className="text-xs text-[#5A6A62]">
                {isMarathi ? 'सिम्युलेटेड एकूण फील्ड प्रोत्साहन पूल' : 'Simulated Total Field Incentive Pool'}
              </p>
              <div className="text-xl font-bold text-[#0E5E4E] tabular-nums">
                {formatINR(totalSimulatedIncentives)}
                <span className="text-xs font-semibold text-[#2C7A4B] ml-2">
                  ({netIncentiveVariance >= 0 ? '+' : ''}{formatINR(netIncentiveVariance)} vs Current)
                </span>
              </div>
            </div>
          </div>

          <div className="text-right text-xs text-[#5A6A62]">
            <p>FCOs Benefiting: <strong className="text-[#18231F] tabular-nums">{fieldOfficers.length}</strong></p>
            <p>Avg Payout: <strong className="text-[#18231F] tabular-nums">{formatINR(totalSimulatedIncentives / (fieldOfficers.length || 1))} / officer</strong></p>
          </div>
        </div>
      </div>

      {/* Individual Field Officer Simulation Breakdown Table */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl shadow-nbfc-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#D9E0D6] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#18231F]">
              {isMarathi ? 'फील्ड ऑफिसर्स प्रोत्साहन तपशील' : 'Officer-Level Incentive Calculation Matrix'}
            </h3>
            <p className="text-xs text-[#5A6A62]">
              Live calculation according to SHG collection %, JLG targets, and PAR status
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBEFE8] text-[#5A6A62] text-[11px] font-semibold uppercase tracking-wider h-9 border-b border-[#D9E0D6]">
                <th className="px-3 py-2">{isMarathi ? 'आयडी' : 'Emp ID'}</th>
                <th className="px-4 py-2">{isMarathi ? 'नाव व पद' : 'Officer Name'}</th>
                <th className="px-3 py-2">{isMarathi ? 'शाखा' : 'Branch'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'वसुली दर' : 'Collection %'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'पार ३०' : 'PAR 30 %'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'वसुली बोनस' : 'Recovery Bonus'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'गट कमिशन' : 'JLG Bonus'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'पार गुणवत्ता' : 'PAR Bonus'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'एकूण सिम्युलेटेड' : 'Simulated Total'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'बदल' : 'Delta'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E0D6] text-xs">
              {calculatedIncentives.map(({ fco, repaymentBonus, jlgBonus, parBonus, totalSimulatedIncentive, diff }) => (
                <tr key={fco.id} className="h-12 hover:bg-[#F4F6F2] transition-colors">
                  <td className="px-3 py-2 font-mono text-[11px] font-semibold text-[#0E5E4E]">
                    {fco.id}
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-semibold text-[#18231F]">{fco.name}</div>
                    <div className="text-[11px] text-[#5A6A62]">{fco.role}</div>
                  </td>
                  <td className="px-3 py-2 text-[#5A6A62]">
                    {fco.branch.split('(')[0]}
                  </td>
                  <td className="px-3 py-2 text-right font-bold tabular-nums text-[#2C7A4B]">
                    {formatPercent(fco.collectionRate)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#5A6A62]">
                    {formatPercent(fco.par30Rate)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#18231F]">
                    +{formatNumber(repaymentBonus)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#18231F]">
                    +{formatNumber(jlgBonus)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#18231F]">
                    +{formatNumber(parBonus)}
                  </td>
                  <td className="px-3 py-2 text-right font-bold text-[#0E5E4E] tabular-nums">
                    {formatINR(totalSimulatedIncentive)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                      diff >= 0 ? 'bg-[#DDEFE3] text-[#2C7A4B]' : 'bg-[#F5DFDA] text-[#A73C2A]'
                    }`}>
                      {diff >= 0 ? `+${formatNumber(diff)}` : formatNumber(diff)}
                    </span>
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
