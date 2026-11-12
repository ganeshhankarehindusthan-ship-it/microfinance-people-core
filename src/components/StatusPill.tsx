import React from 'react';
import { KYCStatus, BatchStatus, AttendanceStatus } from '../types';

interface StatusPillProps {
  type: 'kyc' | 'batch' | 'attendance' | 'custom';
  value: KYCStatus | BatchStatus | AttendanceStatus | string;
  label?: string;
  showDot?: boolean;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  type,
  value,
  label,
  showDot = true,
}) => {
  let displayLabel = label;
  let bgClass = 'bg-slate-100 text-slate-700 border border-slate-200'; // Draft / Default
  let dotColor = '#64748B';

  if (type === 'kyc') {
    switch (value) {
      case 'verified':
        displayLabel = label || 'KYC Verified';
        bgClass = 'bg-emerald-50 text-emerald-800 border border-emerald-300';
        dotColor = '#059669';
        break;
      case 'action_required':
        displayLabel = label || 'Action Required';
        bgClass = 'bg-amber-50 text-amber-800 border border-amber-300';
        dotColor = '#D97706';
        break;
      case 'in_review':
        displayLabel = label || 'In Review';
        bgClass = 'bg-blue-50 text-blue-800 border border-blue-200';
        dotColor = '#2563EB';
        break;
    }
  } else if (type === 'batch') {
    switch (value) {
      case 'disbursed':
        displayLabel = label || 'Disbursed';
        bgClass = 'bg-emerald-50 text-emerald-800 border border-emerald-300';
        dotColor = '#059669';
        break;
      case 'approved':
        displayLabel = label || 'Audit Approved';
        bgClass = 'bg-blue-50 text-blue-800 border border-blue-300';
        dotColor = '#3A52B8';
        break;
      case 'flagged':
        displayLabel = label || 'Audit Flagged';
        bgClass = 'bg-rose-50 text-rose-800 border border-rose-300';
        dotColor = '#E11D48';
        break;
      case 'draft':
        displayLabel = label || 'Draft Calculation';
        bgClass = 'bg-slate-100 text-slate-700 border border-slate-200';
        dotColor = '#64748B';
        break;
    }
  } else if (type === 'attendance') {
    switch (value) {
      case 'verified':
        displayLabel = label || 'Biometric Verified';
        bgClass = 'bg-emerald-50 text-emerald-800 border border-emerald-300';
        dotColor = '#059669';
        break;
      case 'grace_period':
        displayLabel = label || 'Grace Approved';
        bgClass = 'bg-amber-50 text-amber-800 border border-amber-300';
        dotColor = '#D97706';
        break;
      case 'flagged':
        displayLabel = label || 'Geofence Alert';
        bgClass = 'bg-rose-50 text-rose-800 border border-rose-300';
        dotColor = '#E11D48';
        break;
      case 'absent':
        displayLabel = label || 'Absent';
        bgClass = 'bg-rose-50 text-rose-800 border border-rose-300';
        dotColor = '#E11D48';
        break;
    }
  } else if (type === 'custom') {
    if (value === 'success') {
      bgClass = 'bg-emerald-50 text-emerald-800 border border-emerald-300';
      dotColor = '#059669';
    } else if (value === 'warning') {
      bgClass = 'bg-amber-50 text-amber-800 border border-amber-300';
      dotColor = '#D97706';
    } else if (value === 'danger') {
      bgClass = 'bg-rose-50 text-rose-800 border border-rose-300';
      dotColor = '#E11D48';
    } else if (value === 'info') {
      bgClass = 'bg-blue-50 text-blue-800 border border-blue-300';
      dotColor = '#2563EB';
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide shadow-2xs ${bgClass}`}
    >
      {showDot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      <span className="whitespace-nowrap">{displayLabel || value}</span>
    </span>
  );
};
