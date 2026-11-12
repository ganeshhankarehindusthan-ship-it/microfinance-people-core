import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ReceiptIndianRupee, 
  Fingerprint, 
  TrendingUp, 
  FileCheck2 
} from 'lucide-react';

export type TabKey = 'overview' | 'roster' | 'payroll' | 'biometric' | 'incentives' | 'statutory';

interface NavigationTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  isMarathi: boolean;
  anomalyCount: number;
  unverifiedKycCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  isMarathi,
  anomalyCount,
  unverifiedKycCount,
}) => {
  const tabs = [
    {
      key: 'overview' as TabKey,
      label: isMarathi ? 'एकूण आढावा' : 'Dashboard Overview',
      sub: isMarathi ? 'केपीआय व क्लस्टर स्थिती' : 'KPIs & Cluster Health',
      icon: LayoutDashboard,
      activeColor: 'text-[#3A52B8] border-[#3A52B8] bg-[#EBF0FF]',
      iconColor: 'text-[#3A52B8]',
      indicatorColor: 'bg-[#3A52B8]',
    },
    {
      key: 'roster' as TabKey,
      label: isMarathi ? 'कर्मचारी नोंदवही' : 'Staff Roster & Ledger',
      sub: isMarathi ? 'फील्ड ऑफिसर्स व केवायसी' : 'FCOs, BOMs & KYC',
      icon: Users,
      activeColor: 'text-[#008A3D] border-[#008A3D] bg-[#E6F7EC]',
      iconColor: 'text-[#008A3D]',
      indicatorColor: 'bg-[#008A3D]',
      badge: unverifiedKycCount > 0 ? `${unverifiedKycCount}` : undefined,
      badgeColor: 'bg-[#FEF3C7] text-[#B45309] border border-[#FCD34D]',
    },
    {
      key: 'payroll' as TabKey,
      label: isMarathi ? 'वेतन लेखापरीक्षण' : 'Payroll & Batch Audit',
      sub: isMarathi ? 'मासिक वितरण व कपात' : 'Disbursements & Deductions',
      icon: ReceiptIndianRupee,
      activeColor: 'text-[#F07800] border-[#F07800] bg-[#FFF4E5]',
      iconColor: 'text-[#F07800]',
      indicatorColor: 'bg-[#F07800]',
      badge: anomalyCount > 0 ? `${anomalyCount} Alert` : undefined,
      badgeColor: 'bg-[#FFE4E6] text-[#E11D48] border border-[#FDA4AF]',
    },
    {
      key: 'biometric' as TabKey,
      label: isMarathi ? 'बायोमेट्रिक हजेरी' : 'Biometric & Geofence',
      sub: isMarathi ? 'फील्ड केंद्र पंच नोंदी' : 'SHG Center GPS Punches',
      icon: Fingerprint,
      activeColor: 'text-[#0D9488] border-[#0D9488] bg-[#CCFBF1]',
      iconColor: 'text-[#0D9488]',
      indicatorColor: 'bg-[#0D9488]',
    },
    {
      key: 'incentives' as TabKey,
      label: isMarathi ? 'प्रोत्साहन सिम्युलेटर' : 'Incentive Matrix',
      sub: isMarathi ? 'वसूली व जेएलजी कमिशन' : 'Recovery & JLG Targets',
      icon: TrendingUp,
      activeColor: 'text-[#7C3AED] border-[#7C3AED] bg-[#F3E8FF]',
      iconColor: 'text-[#7C3AED]',
      indicatorColor: 'bg-[#7C3AED]',
    },
    {
      key: 'statutory' as TabKey,
      label: isMarathi ? 'वैधानिक अनुपालन' : 'Statutory & ECR',
      sub: isMarathi ? 'ईपीएफ, ईएसआयसी, पीटी' : 'EPFO, ESIC, Maha PT',
      icon: FileCheck2,
      activeColor: 'text-[#D97706] border-[#D97706] bg-[#FEF3C7]',
      iconColor: 'text-[#D97706]',
      indicatorColor: 'bg-[#D97706]',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 sm:px-6 shadow-xs">
      <div className="max-w-[1440px] mx-auto flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`group relative py-3 px-3 sm:px-4 flex items-center gap-2.5 text-left border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-200 rounded-lg ${
                isActive
                  ? `${tab.activeColor} font-bold shadow-xs`
                  : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition ${
                isActive 
                  ? 'bg-white shadow-xs' 
                  : 'bg-[#F1F5F9] group-hover:bg-[#E2E8F0]'
              }`}>
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? tab.iconColor : 'text-[#64748B] group-hover:text-[#0F172A]'
                  }`}
                />
              </div>

              <div className="flex flex-col">
                <span className="leading-tight">{tab.label}</span>
                <span className="text-[10px] text-[#64748B] hidden md:block">
                  {tab.sub}
                </span>
              </div>

              {tab.badge && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${tab.badgeColor}`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
