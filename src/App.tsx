/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  INITIAL_EMPLOYEES, 
  INITIAL_BRANCHES, 
  INITIAL_PUNCHES, 
  INITIAL_ANOMALIES 
} from './data/mockData';
import { Employee, AttendancePunch, AuditAnomaly, BranchStat } from './types';

// Components
import { Navbar } from './components/Navbar';
import { NavigationTabs, TabKey } from './components/NavigationTabs';
import { OverviewTab } from './components/OverviewTab';
import { EmployeeRosterTab } from './components/EmployeeRosterTab';
import { PayrollAuditTab } from './components/PayrollAuditTab';
import { BiometricAttendanceTab } from './components/BiometricAttendanceTab';
import { IncentiveSimulatorTab } from './components/IncentiveSimulatorTab';
import { StatutoryComplianceTab } from './components/StatutoryComplianceTab';

// Modals
import { EmployeeDetailModal } from './components/EmployeeDetailModal';
import { PayslipModal } from './components/PayslipModal';
import { OnboardingModal } from './components/OnboardingModal';
import { AnomalyDetailModal } from './components/AnomalyDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMarathi, setIsMarathi] = useState<boolean>(false);

  // Core Data States
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [branches, setBranches] = useState<BranchStat[]>(INITIAL_BRANCHES);
  const [punches, setPunches] = useState<AttendancePunch[]>(INITIAL_PUNCHES);
  const [anomalies, setAnomalies] = useState<AuditAnomaly[]>(INITIAL_ANOMALIES);

  // Modals state
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [payslipEmployee, setPayslipEmployee] = useState<Employee | null>(null);
  const [selectedAnomaly, setSelectedAnomaly] = useState<AuditAnomaly | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Dynamic counts
  const unverifiedKycCount = employees.filter((e) => e.kycStatus !== 'verified').length;
  const flaggedAnomalyCount = anomalies.filter((a) => a.status === 'flagged').length;

  // Handlers
  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
    // Also create an initial attendance punch
    const initialPunch: AttendancePunch = {
      id: `PCH-${Date.now().toString().slice(-6)}`,
      employeeId: newEmp.id,
      employeeName: newEmp.name,
      employeeNameMr: newEmp.nameMr,
      role: newEmp.role,
      branch: newEmp.branch,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      time: '08:50 AM',
      centerName: `${newEmp.taluka} Central Gram Panchayat`,
      village: newEmp.taluka,
      taluka: newEmp.taluka,
      coords: '18.1500° N, 74.5000° E',
      distanceFromCenter: 20,
      authMethod: 'Biometric Fingerprint',
      deviceBattery: 95,
      status: 'verified',
    };
    setPunches((prev) => [initialPunch, ...prev]);
  };

  const handleBulkApproveBatch = (ids: string[]) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        ids.includes(emp.id) ? { ...emp, batchStatus: 'approved' } : emp
      )
    );
  };

  const handleBulkVerifyKyc = (ids: string[]) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        ids.includes(emp.id) ? { ...emp, kycStatus: 'verified', kycNotes: undefined } : emp
      )
    );
  };

  const handleToggleKycStatus = (employeeId: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === employeeId) {
          const nextStatus = emp.kycStatus === 'verified' ? 'action_required' : 'verified';
          const updated = {
            ...emp,
            kycStatus: nextStatus as Employee['kycStatus'],
            kycNotes: nextStatus === 'action_required' ? 'Manual audit reverification requested' : undefined,
          };
          if (selectedEmployee?.id === employeeId) {
            setSelectedEmployee(updated);
          }
          return updated;
        }
        return emp;
      })
    );
  };

  const handleApproveAllForDisbursement = () => {
    setEmployees((prev) =>
      prev.map((emp) => ({ ...emp, batchStatus: 'disbursed' }))
    );
  };

  const handleResolveAnomaly = (anomalyId: string) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === anomalyId ? { ...a, status: 'resolved' } : a))
    );
    // If anomaly was linked to an employee, clean their batch status
    const matched = anomalies.find((a) => a.id === anomalyId);
    if (matched) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === matched.employeeId ? { ...emp, batchStatus: 'approved', kycStatus: 'verified' } : emp
        )
      );
    }
  };

  const handleRegularizePunch = (punchId: string, reason: string) => {
    setPunches((prev) =>
      prev.map((p) =>
        p.id === punchId
          ? {
              ...p,
              status: 'grace_period',
              regularizationReason: reason,
              isRegularized: true,
            }
          : p
      )
    );
  };

  const handleApplyIncentivesToBatch = (incentiveMap: Record<string, number>) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (incentiveMap[emp.id] !== undefined) {
          const newIncentive = incentiveMap[emp.id];
          const newGross = emp.basicSalary + emp.hra + emp.fieldConveyance + emp.specialAllowance + newIncentive;
          const newPf = Math.round(emp.basicSalary * 0.12);
          const newPt = 200;
          const newDeductions = newPf + newPt + emp.tdsDeduction;
          const newNet = newGross - newDeductions;
          return {
            ...emp,
            incentiveEarned: newIncentive,
            grossSalary: newGross,
            pfDeduction: newPf,
            totalDeductions: newDeductions,
            netPayable: newNet,
          };
        }
        return emp;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F6F2] text-[#18231F] flex flex-col font-sans">
      {/* Top Navigation & NBFC System Header */}
      <Navbar
        selectedBranch={selectedBranch}
        onSelectBranch={setSelectedBranch}
        isMarathi={isMarathi}
        onToggleMarathi={() => setIsMarathi((m) => !m)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && activeTab !== 'roster') {
            setActiveTab('roster');
          }
        }}
        flaggedCount={flaggedAnomalyCount}
      />

      {/* Primary Tab Navigation */}
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMarathi={isMarathi}
        anomalyCount={flaggedAnomalyCount}
        unverifiedKycCount={unverifiedKycCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'overview' && (
          <OverviewTab
            employees={employees}
            branches={branches}
            anomalies={anomalies}
            isMarathi={isMarathi}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenAnomaly={(anomaly) => setSelectedAnomaly(anomaly)}
          />
        )}

        {activeTab === 'roster' && (
          <EmployeeRosterTab
            employees={employees}
            isMarathi={isMarathi}
            selectedBranch={selectedBranch}
            onSelectEmployee={(emp) => setSelectedEmployee(emp)}
            onOpenPayslip={(emp) => setPayslipEmployee(emp)}
            onBulkApproveBatch={handleBulkApproveBatch}
            onBulkVerifyKyc={handleBulkVerifyKyc}
          />
        )}

        {activeTab === 'payroll' && (
          <PayrollAuditTab
            employees={employees}
            anomalies={anomalies}
            isMarathi={isMarathi}
            onApproveAllForDisbursement={handleApproveAllForDisbursement}
            onResolveAnomaly={handleResolveAnomaly}
            onOpenPayslip={(emp) => setPayslipEmployee(emp)}
          />
        )}

        {activeTab === 'biometric' && (
          <BiometricAttendanceTab
            punches={punches}
            isMarathi={isMarathi}
            selectedBranch={selectedBranch}
            onRegularizePunch={handleRegularizePunch}
          />
        )}

        {activeTab === 'incentives' && (
          <IncentiveSimulatorTab
            employees={employees}
            isMarathi={isMarathi}
            onApplyIncentivesToBatch={handleApplyIncentivesToBatch}
          />
        )}

        {activeTab === 'statutory' && (
          <StatutoryComplianceTab
            employees={employees}
            isMarathi={isMarathi}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#D9E0D6] py-4 px-4 sm:px-6 text-xs text-[#5A6A62] mt-auto">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            &copy; 2026 Hindusthan Microfinance Pvt Ltd &bull; Western Maharashtra Credit Mission
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Statutory Compliance: EPFO &bull; ESIC &bull; PT Act 1975</span>
            <span>&bull;</span>
            <span className="text-[#0E5E4E] font-medium">Data Center: Mumbai (MH-West-1)</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onOpenPayslip={(emp) => setPayslipEmployee(emp)}
        onToggleKycStatus={handleToggleKycStatus}
        isMarathi={isMarathi}
      />

      <PayslipModal
        employee={payslipEmployee}
        onClose={() => setPayslipEmployee(null)}
        isMarathi={isMarathi}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onAddEmployee={handleAddEmployee}
        isMarathi={isMarathi}
      />

      <AnomalyDetailModal
        anomaly={selectedAnomaly}
        onClose={() => setSelectedAnomaly(null)}
        onResolve={handleResolveAnomaly}
        isMarathi={isMarathi}
      />
    </div>
  );
}
