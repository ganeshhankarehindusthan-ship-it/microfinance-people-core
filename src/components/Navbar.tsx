import React from 'react';
import { 
  Building2, 
  Plus, 
  Calendar, 
  Globe, 
  ShieldCheck, 
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';
import { INITIAL_BRANCHES } from '../data/mockData';

interface NavbarProps {
  selectedBranch: string;
  onSelectBranch: (branchId: string) => void;
  isMarathi: boolean;
  onToggleMarathi: () => void;
  onOpenOnboarding: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  flaggedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedBranch,
  onSelectBranch,
  isMarathi,
  onToggleMarathi,
  onOpenOnboarding,
  searchQuery,
  onSearchChange,
  flaggedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#D9E0D6] shadow-nbfc-card">
      {/* Top colorful tricolor accent bar: Orange, Blue, Green */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F07800] via-[#3A52B8] to-[#008A3D]"></div>

      {/* Top institutional strip */}
      <div className="bg-gradient-to-r from-[#1E293B] via-[#1E3A8A] to-[#064E3B] text-[#FFFFFF] px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-bold tracking-wider text-[#FDBA74] bg-[#7C2D12]/40 px-2 py-0.5 rounded border border-[#F97316]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FB923C]" />
            RBI REGULATED NBFC-MFI
          </span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-[#E2E8F0] hidden md:inline font-medium">
            Registration: B-13.02194 &bull; Maharashtra Credit Mission
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#E2E8F0]">
          <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-[#93C5FD]" />
            <span>FY 2026-27 &bull; Cycle: Oct 2026</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#065F46] border border-[#34D399]/40 px-2.5 py-0.5 rounded-full text-[11px] text-[#A7F3D0] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse"></span>
            NEFT Gateway Active
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3.5">
          <div className="p-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center hover:shadow-md transition">
            <img 
              src="/hmpl_logo.png" 
              alt="Hindusthan Microfinance Logo" 
              className="h-10 sm:h-11 w-auto max-w-[140px] sm:max-w-[160px] object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight leading-tight flex items-center gap-1.5">
                <span>{isMarathi ? 'हिंदुस्थान मायक्रोफायनान्स प्रा. लि.' : 'Hindusthan Microfinance Pvt Ltd'}</span>
              </h1>
              <span className="bg-gradient-to-r from-[#EBF0FF] to-[#E6F7EC] text-[#3A52B8] border border-[#3A52B8]/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline">
                PEOPLE CORE
              </span>
            </div>
            <p className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#F07800]"></span>
              <span>
                {isMarathi 
                  ? 'कर्मचारी व्यवस्थापन, बायोमेट्रिक हजेरी व वेतन लेखापरीक्षण' 
                  : 'NBFC Operations, Biometric Attendance & Payroll Audit'}
              </span>
            </p>
          </div>
        </div>

        {/* Global Search & Branch Filter */}
        <div className="flex-1 max-w-xl mx-2 hidden lg:flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5A6A62] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isMarathi 
                ? 'कर्मचारी नाव, आयडी, पॅन किंवा आधार शोधा...' 
                : 'Search employee name, ID, UAN, PAN, or branch...'}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-sm bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-[#18231F] placeholder-[#5A6A62] focus:outline-none focus:border-[#0E5E4E] focus:ring-2 focus:ring-[#0E5E4E]/20"
            />
          </div>

          {/* Branch Select */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedBranch}
              onChange={(e) => onSelectBranch(e.target.value)}
              className="w-full h-10 px-3 pr-8 text-xs font-medium bg-[#EBEFE8] text-[#18231F] border border-[#D9E0D6] rounded-lg focus:outline-none focus:border-[#0E5E4E] appearance-none cursor-pointer"
            >
              <option value="ALL">
                {isMarathi ? 'सर्व शाखा (सर्व विभाग)' : 'All Clusters (6 Districts)'}
              </option>
              {INITIAL_BRANCHES.map((b) => (
                <option key={b.id} value={b.name}>
                  {isMarathi ? b.nameMr : b.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6A62] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Marathi Language Toggle */}
          <button
            onClick={onToggleMarathi}
            className={`h-10 px-3 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isMarathi
                ? 'bg-[#0E5E4E] text-[#FFFFFF] border-[#0E5E4E]'
                : 'bg-[#FFFFFF] text-[#18231F] border-[#D9E0D6] hover:bg-[#EBEFE8]'
            }`}
            title="Switch Language / भाषा बदला"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isMarathi ? 'मराठी सक्रिय' : 'English / मराठी'}</span>
          </button>

          {/* New Onboarding Button */}
          <button
            onClick={onOpenOnboarding}
            className="h-10 px-4 bg-gradient-to-r from-[#F07800] to-[#E8630A] hover:from-[#E06E00] hover:to-[#D55A00] text-[#FFFFFF] text-xs font-bold rounded-lg flex items-center gap-2 transition shadow-sm shadow-orange-500/20 active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F07800]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">
              {isMarathi ? 'नवीन कर्मचारी नोंदणी' : '+ New Onboarding'}
            </span>
          </button>

          {/* Audit Alert Pill */}
          {flaggedCount > 0 && (
            <div 
              className="h-10 px-3 bg-gradient-to-r from-[#FFE4E6] to-[#FED7AA] text-[#E11D48] border border-[#FDA4AF] rounded-lg flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs"
              title={`${flaggedCount} audit anomalies pending resolution`}
            >
              <Bell className="w-4 h-4 text-[#E11D48] animate-bounce" />
              <span className="tabular-nums">{flaggedCount} Alerts</span>
            </div>
          )}

          {/* User Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#E2E8F0]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3A52B8] via-[#F07800] to-[#008A3D] p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-[#3A52B8] text-xs font-extrabold">
                AD
              </div>
            </div>
            <div className="hidden xl:block text-left text-xs">
              <p className="font-bold text-[#0F172A] leading-tight">Archana Deshpande</p>
              <p className="text-[11px] text-[#64748B] font-medium">Head of People & Operations</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
