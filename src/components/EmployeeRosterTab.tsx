import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  UserCheck, 
  FileText, 
  ChevronRight, 
  ShieldAlert, 
  Building,
  CheckSquare,
  Square,
  Eye,
  Check
} from 'lucide-react';
import { Employee, Role, KYCStatus } from '../types';
import { formatINR, formatNumber } from '../utils/formatters';
import { StatusPill } from './StatusPill';

interface EmployeeRosterTabProps {
  employees: Employee[];
  isMarathi: boolean;
  selectedBranch: string;
  onSelectEmployee: (employee: Employee) => void;
  onOpenPayslip: (employee: Employee) => void;
  onBulkApproveBatch: (employeeIds: string[]) => void;
  onBulkVerifyKyc: (employeeIds: string[]) => void;
}

export const EmployeeRosterTab: React.FC<EmployeeRosterTabProps> = ({
  employees,
  isMarathi,
  selectedBranch,
  onSelectEmployee,
  onOpenPayslip,
  onBulkApproveBatch,
  onBulkVerifyKyc,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedKycStatus, setSelectedKycStatus] = useState<string>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // Branch filter
      if (selectedBranch !== 'ALL' && emp.branch !== selectedBranch) return false;

      // Role filter
      if (selectedRole !== 'ALL' && emp.role !== selectedRole) return false;

      // KYC filter
      if (selectedKycStatus !== 'ALL' && emp.kycStatus !== selectedKycStatus) return false;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = emp.name.toLowerCase().includes(query);
        const matchesMr = emp.nameMr.includes(query);
        const matchesId = emp.id.toLowerCase().includes(query);
        const matchesPan = emp.pan.toLowerCase().includes(query);
        const matchesUan = emp.uan.includes(query);
        if (!matchesName && !matchesMr && !matchesId && !matchesPan && !matchesUan) {
          return false;
        }
      }

      return true;
    });
  }, [employees, selectedBranch, selectedRole, selectedKycStatus, searchTerm]);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedIds.length === filteredEmployees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEmployees.map((e) => e.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Export Roster as CSV
  const handleExportCSV = () => {
    const headers = [
      'Emp ID',
      'Name',
      'Role',
      'Branch',
      'Taluka',
      'PAN',
      'UAN',
      'Bank',
      'IFSC',
      'Account',
      'Gross Salary (₹)',
      'PF (₹)',
      'PT (₹)',
      'Net Payable (₹)',
      'Biometric %',
      'KYC Status',
      'Batch Status'
    ];
    const rows = filteredEmployees.map((e) => [
      e.id,
      `"${e.name}"`,
      `"${e.role}"`,
      `"${e.branch}"`,
      `"${e.taluka}"`,
      e.pan,
      e.uan,
      `"${e.bankName}"`,
      e.ifsc,
      e.accountNumber,
      e.grossSalary,
      e.pfDeduction,
      e.ptDeduction,
      e.netPayable,
      e.biometricCompliance,
      e.kycStatus,
      e.batchStatus,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Maharashtra_NBFC_Staff_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Search, Filter & Quick Export Header */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl p-4 shadow-nbfc-card space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5A6A62] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isMarathi 
                ? 'कर्मचारी नाव, आयडी, पॅन, यूएएन किंवा तालुका शोधा...' 
                : 'Search by employee name, ID (e.g. MH-FCO-1042), PAN, UAN...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-sm bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-[#18231F] placeholder-[#5A6A62] focus:outline-none focus:border-[#0E5E4E] focus:ring-2 focus:ring-[#0E5E4E]/20"
            />
          </div>

          {/* Role & KYC Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="h-10 px-3 text-xs bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
            >
              <option value="ALL">{isMarathi ? 'सर्व पदे (All Roles)' : 'All Roles'}</option>
              <option value="Field Credit Officer">Field Credit Officer (FCO)</option>
              <option value="Senior Credit Officer">Senior Credit Officer</option>
              <option value="Branch Operations Manager">Branch Operations Manager (BOM)</option>
              <option value="Cashier & Teller">Cashier & Teller</option>
              <option value="Recovery & Vigilance Officer">Recovery & Vigilance</option>
            </select>

            <select
              value={selectedKycStatus}
              onChange={(e) => setSelectedKycStatus(e.target.value)}
              className="h-10 px-3 text-xs bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
            >
              <option value="ALL">{isMarathi ? 'सर्व केवायसी स्थिती' : 'All KYC Status'}</option>
              <option value="verified">{isMarathi ? 'सत्यापित (Verified)' : 'Verified'}</option>
              <option value="action_required">{isMarathi ? 'आवश्यक कारवाई (Action Req)' : 'Action Required'}</option>
              <option value="in_review">{isMarathi ? 'तपासणी सुरू (In Review)' : 'In Review'}</option>
            </select>

            {/* Export Roster CSV */}
            <button
              onClick={handleExportCSV}
              className="h-10 px-3.5 bg-[#EBEFE8] hover:bg-[#D9E0D6] text-[#18231F] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              title="Download full staff register as CSV"
            >
              <Download className="w-4 h-4 text-[#0E5E4E]" />
              <span>{isMarathi ? 'सीएसव्ही निर्यात' : 'Export CSV'}</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Counts */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#D9E0D6]/60 text-xs">
          <span className="text-[#5A6A62]">
            {isMarathi ? 'दाखवत आहे:' : 'Showing:'} <strong className="text-[#18231F] tabular-nums">{filteredEmployees.length}</strong> {isMarathi ? 'कर्मचारी' : 'records'}
          </span>
          <span className="text-[#D9E0D6]">&bull;</span>
          <button 
            onClick={() => setSelectedKycStatus('verified')}
            className="hover:underline text-[#2C7A4B] font-medium"
          >
            {employees.filter(e => e.kycStatus === 'verified').length} {isMarathi ? 'केवायसी प्रमाणित' : 'Verified'}
          </button>
          <span className="text-[#D9E0D6]">&bull;</span>
          <button 
            onClick={() => setSelectedKycStatus('action_required')}
            className="hover:underline text-[#9A6514] font-medium"
          >
            {employees.filter(e => e.kycStatus === 'action_required').length} {isMarathi ? 'त्रुटी निराकरण' : 'Action Required'}
          </button>
          <span className="text-[#D9E0D6]">&bull;</span>
          <button 
            onClick={() => setSelectedKycStatus('in_review')}
            className="hover:underline text-[#5A6A62] font-medium"
          >
            {employees.filter(e => e.kycStatus === 'in_review').length} {isMarathi ? 'प्रलंबित' : 'In Review'}
          </button>
        </div>
      </div>

      {/* Bulk Action Sticky Bar (appears when rows are selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-[#0E5E4E] text-[#FFFFFF] px-5 py-3 rounded-xl shadow-nbfc-modal flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="w-5 h-5 rounded-full bg-[#A9F1DB] text-[#002019] text-xs font-bold flex items-center justify-center">
              {selectedIds.length}
            </span>
            <span className="font-medium">
              {isMarathi ? 'कर्मचारी निवडले आहेत' : 'staff members selected'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBulkApproveBatch(selectedIds)}
              className="h-8 px-3 bg-[#A9F1DB] hover:bg-[#8ED4C0] text-[#002019] text-xs font-bold rounded-lg transition"
            >
              {isMarathi ? 'वेतन बॅच मंजूर करा' : 'Approve for Payroll'}
            </button>
            <button
              onClick={() => onBulkVerifyKyc(selectedIds)}
              className="h-8 px-3 bg-[#0A493D] hover:bg-[#07382E] text-[#A9F1DB] border border-[#8ED5C0]/40 text-xs font-semibold rounded-lg transition"
            >
              {isMarathi ? 'केवायसी मंजूर करा' : 'Mark KYC Verified'}
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="h-8 px-2.5 text-[#DCEBE5] hover:text-[#FFFFFF] text-xs font-medium"
            >
              {isMarathi ? 'निवड रद्द' : 'Deselect All'}
            </button>
          </div>
        </div>
      )}

      {/* Main Staff Roster Data Table - Strictly Styled */}
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl shadow-nbfc-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBEFE8] text-[#5A6A62] text-[11px] font-semibold uppercase tracking-wider h-9 border-b border-[#D9E0D6]">
                <th className="w-10 px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredEmployees.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-[#D9E0D6] text-[#0E5E4E] focus:ring-[#0E5E4E] cursor-pointer"
                  />
                </th>
                <th className="px-3 py-2">{isMarathi ? 'आयडी' : 'Emp ID'}</th>
                <th className="px-4 py-2">{isMarathi ? 'कर्मचारी तपशील' : 'Employee Name & Role'}</th>
                <th className="px-3 py-2">{isMarathi ? 'शाखा व विभाग' : 'Branch & Taluka'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'बचत गट' : 'SHGs'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'स्थूल वेतन' : 'Gross CTC'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'निव्वळ देय' : 'Net Payout'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'हजेरी' : 'Biometric'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'केवायसी' : 'KYC Status'}</th>
                <th className="px-3 py-2 text-center">{isMarathi ? 'बॅच स्थिती' : 'Batch'}</th>
                <th className="px-3 py-2 text-right">{isMarathi ? 'कृती' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E0D6] text-xs">
              {filteredEmployees.map((emp) => {
                const isSelected = selectedIds.includes(emp.id);
                return (
                  <tr
                    key={emp.id}
                    className={`h-12 transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#DCEBE5]' : 'hover:bg-[#F4F6F2]'
                    }`}
                    onClick={() => onSelectEmployee(emp)}
                  >
                    {/* Checkbox */}
                    <td 
                      className="px-3 py-2 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectOne(emp.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(emp.id)}
                        className="w-4 h-4 rounded border-[#D9E0D6] text-[#0E5E4E] focus:ring-[#0E5E4E] cursor-pointer"
                      />
                    </td>

                    {/* Emp ID */}
                    <td className="px-3 py-2 font-mono text-[11px] font-bold text-[#3A52B8] whitespace-nowrap">
                      {emp.id}
                    </td>

                    {/* Name & Role */}
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3A52B8] to-[#008A3D] text-[#FFFFFF] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {emp.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                            <span>{emp.name}</span>
                            {emp.kycStatus === 'action_required' && (
                              <span title="Action required on Aadhaar/PAN" className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                            <span className="font-medium text-[#3A52B8] bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                              {isMarathi ? emp.nameMr : emp.role}
                            </span>
                            <span className="text-[#CBD5E1]">&bull;</span>
                            <span className="font-mono text-[10px] text-[#64748B]">UAN: {emp.uan.slice(0, 6)}...</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Branch & Taluka */}
                    <td className="px-3 py-2">
                      <div className="text-[#0F172A] font-semibold">{emp.branch.split('(')[0]}</div>
                      <div className="text-[11px] text-[#64748B]">{emp.taluka}, {emp.district}</div>
                    </td>

                    {/* SHGs count & loan book */}
                    <td className="px-3 py-2 text-center">
                      <div className="font-bold tabular-nums text-[#0F172A]">{emp.assignedSHGs || '—'}</div>
                      <div className="text-[10px] font-semibold text-[#008A3D] bg-emerald-50 px-1 rounded inline-block">
                        {emp.activeBorrowers > 0 ? `${emp.activeBorrowers} JLGs` : 'Stationed'}
                      </div>
                    </td>

                    {/* Gross CTC (tabular right aligned) */}
                    <td className="px-3 py-2 text-right font-medium text-[#64748B] tabular-nums whitespace-nowrap">
                      {formatINR(emp.grossSalary)}
                    </td>

                    {/* Net Payable (tabular bold right aligned) */}
                    <td className="px-3 py-2 text-right font-extrabold text-[#008A3D] tabular-nums whitespace-nowrap">
                      {formatINR(emp.netPayable)}
                    </td>

                    {/* Biometric % */}
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-extrabold tabular-nums border ${
                        emp.biometricCompliance >= 98
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : emp.biometricCompliance >= 90
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}>
                        {emp.biometricCompliance}%
                      </span>
                    </td>

                    {/* KYC Status */}
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <StatusPill type="kyc" value={emp.kycStatus} />
                    </td>

                    {/* Batch Status */}
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <StatusPill type="batch" value={emp.batchStatus} />
                    </td>

                    {/* Actions */}
                    <td 
                      className="px-3 py-2 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenPayslip(emp)}
                          className="p-1.5 text-[#5A6A62] hover:text-[#0E5E4E] hover:bg-[#EBEFE8] rounded-md transition"
                          title="Generate October Payslip"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectEmployee(emp)}
                          className="p-1.5 text-[#5A6A62] hover:text-[#0E5E4E] hover:bg-[#EBEFE8] rounded-md transition"
                          title="View Full Employee Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-[#5A6A62]">
                    <ShieldAlert className="w-8 h-8 text-[#A73C2A] mx-auto mb-2 opacity-60" />
                    <p className="text-sm font-semibold text-[#18231F]">No field personnel match query</p>
                    <p className="text-xs text-[#5A6A62] mt-0.5">Try resetting search keywords or role filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
