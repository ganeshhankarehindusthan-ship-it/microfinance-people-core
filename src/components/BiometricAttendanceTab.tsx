import React, { useState } from 'react';
import { 
  Fingerprint, 
  MapPin, 
  Battery, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Clock, 
  Navigation,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { AttendancePunch } from '../types';
import { StatusPill } from './StatusPill';

interface BiometricAttendanceTabProps {
  punches: AttendancePunch[];
  isMarathi: boolean;
  selectedBranch: string;
  onRegularizePunch: (punchId: string, reason: string) => void;
}

export const BiometricAttendanceTab: React.FC<BiometricAttendanceTabProps> = ({
  punches,
  isMarathi,
  selectedBranch,
  onRegularizePunch,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedPunchForRegularize, setSelectedPunchForRegularize] = useState<AttendancePunch | null>(null);
  const [regularizeReason, setRegularizeReason] = useState('');

  // Filter punches
  const filteredPunches = punches.filter((p) => {
    if (selectedBranch !== 'ALL' && p.branch !== selectedBranch) return false;
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    return true;
  });

  const verifiedCount = punches.filter((p) => p.status === 'verified').length;
  const flaggedCount = punches.filter((p) => p.status === 'flagged').length;
  const graceCount = punches.filter((p) => p.status === 'grace_period').length;

  const handleConfirmRegularize = () => {
    if (selectedPunchForRegularize && regularizeReason.trim()) {
      onRegularizePunch(selectedPunchForRegularize.id, regularizeReason);
      setSelectedPunchForRegularize(null);
      setRegularizeReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card">
          <div className="flex items-center justify-between text-[#5A6A62]">
            <span className="text-xs font-medium">{isMarathi ? 'आजचे एकूण पंच' : "Today's Punches"}</span>
            <Clock className="w-4 h-4 text-[#0E5E4E]" />
          </div>
          <div className="text-2xl font-bold text-[#18231F] tabular-nums mt-1">
            {punches.length}
          </div>
          <p className="text-[11px] text-[#5A6A62] mt-1">
            {isMarathi ? 'सर्व ६ क्लस्टरमधील फील्ड कर्मचारी' : 'Across 6 Maharashtra districts'}
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card">
          <div className="flex items-center justify-between text-[#5A6A62]">
            <span className="text-xs font-medium">{isMarathi ? 'प्रमाणित बायोमेट्रिक' : 'Verified Within Geofence'}</span>
            <CheckCircle2 className="w-4 h-4 text-[#2C7A4B]" />
          </div>
          <div className="text-2xl font-bold text-[#2C7A4B] tabular-nums mt-1">
            {verifiedCount}
          </div>
          <p className="text-[11px] text-[#2C7A4B] mt-1 font-medium">
            &le; 50m radius of SHG center
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card">
          <div className="flex items-center justify-between text-[#5A6A62]">
            <span className="text-xs font-medium">{isMarathi ? 'जिओफेन्स इशारे' : 'Geofence Outliers'}</span>
            <AlertTriangle className="w-4 h-4 text-[#A73C2A]" />
          </div>
          <div className="text-2xl font-bold text-[#A73C2A] tabular-nums mt-1">
            {flaggedCount}
          </div>
          <p className="text-[11px] text-[#A73C2A] mt-1 font-medium">
            &gt; 200m from registered village center
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card">
          <div className="flex items-center justify-between text-[#5A6A62]">
            <span className="text-xs font-medium">{isMarathi ? 'सवलत मंजूर' : 'Grace Approved'}</span>
            <ShieldCheck className="w-4 h-4 text-[#C9820F]" />
          </div>
          <div className="text-2xl font-bold text-[#9A6514] tabular-nums mt-1">
            {graceCount}
          </div>
          <p className="text-[11px] text-[#5A6A62] mt-1">
            BOM network exception sanctioned
          </p>
        </div>
      </div>

      {/* Table & Filters */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl shadow-nbfc-card overflow-hidden">
        <div className="p-4 border-b border-[#D9E0D6] flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-[#18231F]">
              {isMarathi ? 'फील्ड बचत गट बायोमेट्रिक हजेरी लॉग' : 'Field SHG Biometric & GPS Punch Trail'}
            </h3>
            <p className="text-xs text-[#5A6A62]">
              Live telemetry from rural biometric POS devices & field credit officers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 text-xs bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
            >
              <option value="ALL">{isMarathi ? 'सर्व स्थिती' : 'All Statuses'}</option>
              <option value="verified">{isMarathi ? 'प्रमाणित (Verified)' : 'Verified'}</option>
              <option value="flagged">{isMarathi ? 'जिओफेन्स अलर्ट (Flagged)' : 'Flagged (>200m)'}</option>
              <option value="grace_period">{isMarathi ? 'सवलत मंजूर (Grace Period)' : 'Grace Period'}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBEFE8] text-[#5A6A62] text-[11px] font-semibold uppercase tracking-wider h-9 border-b border-[#D9E0D6]">
                <th className="px-3 py-2">{isMarathi ? 'पंच आयडी' : 'Punch ID'}</th>
                <th className="px-4 py-2">{isMarathi ? 'फील्ड ऑफिसर' : 'Field Credit Officer'}</th>
                <th className="px-3 py-2">{isMarathi ? 'वेळ व दिनांक' : 'Timestamp'}</th>
                <th className="px-3 py-2">{isMarathi ? 'बचत गट केंद्र व गाव' : 'SHG Center & Village'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'जिओफेन्स अंतर' : 'Geofence Distance'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'प्रमाणीकरण' : 'Auth Method'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'बॅटरी' : 'Device Battery'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'स्थिती' : 'Status'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'नियमितीकरण' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E0D6] text-xs">
              {filteredPunches.map((punch) => (
                <tr key={punch.id} className="h-12 hover:bg-[#F4F6F2] transition-colors">
                  <td className="px-3 py-2 font-mono text-[11px] font-semibold text-[#0E5E4E]">
                    {punch.id}
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-semibold text-[#18231F]">{punch.employeeName}</div>
                    <div className="text-[11px] text-[#5A6A62]">
                      {punch.role} &bull; {punch.employeeId}
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="font-semibold text-[#18231F] tabular-nums">{punch.time}</div>
                    <div className="text-[11px] text-[#5A6A62]">{punch.date}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-medium text-[#18231F]">{punch.centerName}</div>
                    <div className="text-[11px] text-[#5A6A62] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#5A6A62]" />
                      <span>{punch.village}, {punch.taluka}</span>
                      <span className="text-[#D9E0D6]">&bull;</span>
                      <span className="font-mono text-[10px]">{punch.coords}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center tabular-nums">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      punch.distanceFromCenter <= 50
                        ? 'bg-[#DDEFE3] text-[#2C7A4B]'
                        : punch.distanceFromCenter <= 200
                        ? 'bg-[#F6EAD2] text-[#9A6514]'
                        : 'bg-[#F5DFDA] text-[#A73C2A]'
                    }`}>
                      {punch.distanceFromCenter} m
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center text-[11px] text-[#5A6A62] whitespace-nowrap">
                    <span className="bg-[#EBEFE8] px-2 py-0.5 rounded text-[#18231F] font-medium">
                      {punch.authMethod}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center tabular-nums">
                    <div className="flex items-center justify-center gap-1 text-[11px] text-[#5A6A62]">
                      <Battery className={`w-3.5 h-3.5 ${punch.deviceBattery < 30 ? 'text-[#A73C2A]' : 'text-[#2C7A4B]'}`} />
                      <span>{punch.deviceBattery}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <StatusPill type="attendance" value={punch.status} />
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    {punch.status === 'flagged' ? (
                      <button
                        onClick={() => {
                          setSelectedPunchForRegularize(punch);
                          setRegularizeReason(punch.regularizationReason || '');
                        }}
                        className="px-2.5 py-1 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] text-xs font-semibold rounded-md transition"
                      >
                        {isMarathi ? 'नियमित करा' : 'Regularize'}
                      </button>
                    ) : punch.regularizationReason ? (
                      <span className="text-[11px] text-[#5A6A62] italic" title={punch.regularizationReason}>
                        Approved Note
                      </span>
                    ) : (
                      <span className="text-[#2C7A4B] text-[11px] font-medium flex items-center justify-end gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regularize Modal */}
      {selectedPunchForRegularize && (
        <div className="fixed inset-0 z-50 bg-[#18231F]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl max-w-lg w-full p-6 shadow-nbfc-modal space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E0D6]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#A73C2A]" />
                <h3 className="font-bold text-base text-[#18231F]">
                  {isMarathi ? 'पंच नियमितीकरण मंजुरी' : 'Regularize Geofence Anomaly'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPunchForRegularize(null)}
                className="p-1 rounded-md text-[#5A6A62] hover:bg-[#EBEFE8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p>
                <strong>Employee:</strong> {selectedPunchForRegularize.employeeName} ({selectedPunchForRegularize.employeeId})
              </p>
              <p>
                <strong>Center:</strong> {selectedPunchForRegularize.centerName} ({selectedPunchForRegularize.village})
              </p>
              <p>
                <strong>Recorded Distance:</strong>{' '}
                <span className="text-[#A73C2A] font-bold tabular-nums">
                  {selectedPunchForRegularize.distanceFromCenter} meters from registered SHG center
                </span>
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#18231F]">
                {isMarathi ? 'शाखा व्यवस्थापक मंजुरी शेरा / कारण:' : 'Branch Operations Manager Justification:'}
              </label>
              <textarea
                rows={3}
                value={regularizeReason}
                onChange={(e) => setRegularizeReason(e.target.value)}
                placeholder="e.g. Weak cellular signal in rural valley; officer confirmed on-time collection with SHG leader."
                className="w-full p-2.5 text-xs bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#D9E0D6]">
              <button
                onClick={() => setSelectedPunchForRegularize(null)}
                className="px-4 py-2 bg-[#EBEFE8] hover:bg-[#D9E0D6] text-[#18231F] text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRegularize}
                disabled={!regularizeReason.trim()}
                className="px-4 py-2 bg-[#0E5E4E] hover:bg-[#0A493D] disabled:opacity-50 text-[#FFFFFF] text-xs font-semibold rounded-lg shadow-sm"
              >
                {isMarathi ? 'सवलत मंजूर करा' : 'Approve Grace Period'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
