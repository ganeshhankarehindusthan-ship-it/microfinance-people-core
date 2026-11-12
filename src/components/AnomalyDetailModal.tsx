import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { AuditAnomaly } from '../types';

interface AnomalyDetailModalProps {
  anomaly: AuditAnomaly | null;
  onClose: () => void;
  onResolve: (anomalyId: string) => void;
  isMarathi: boolean;
}

export const AnomalyDetailModal: React.FC<AnomalyDetailModalProps> = ({
  anomaly,
  onClose,
  onResolve,
  isMarathi,
}) => {
  const [resolutionNote, setResolutionNote] = useState('');

  if (!anomaly) return null;

  const handleResolve = () => {
    onResolve(anomaly.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#18231F]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#D9E0D6] rounded-xl max-w-lg w-full p-6 shadow-nbfc-modal space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#D9E0D6]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#A73C2A]" />
            <h3 className="font-bold text-base text-[#18231F]">
              {isMarathi ? 'लेखापरीक्षण विसंगती पुनरावलोकन' : 'Audit Anomaly Resolution'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#5A6A62] hover:bg-[#EBEFE8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-[#F5DFDA] rounded-lg border border-[#A73C2A]/20">
            <div className="flex justify-between items-center text-[10px] font-bold text-[#A73C2A] uppercase">
              <span>{anomaly.statutoryType} &bull; {anomaly.severity}</span>
              <span>{anomaly.detectedAt}</span>
            </div>
            <h4 className="font-bold text-sm text-[#18231F] mt-1">
              {isMarathi ? anomaly.titleMr : anomaly.title}
            </h4>
            <p className="text-xs text-[#5A6A62] mt-1">{anomaly.description}</p>
          </div>

          <div className="space-y-1.5 p-3 bg-[#F4F6F2] rounded-lg border border-[#D9E0D6]">
            <p><strong>Employee:</strong> {anomaly.employeeName} ({anomaly.employeeId})</p>
            <p><strong>Branch:</strong> {anomaly.branch}</p>
            <p><strong>Status:</strong> <span className="text-[#A73C2A] font-semibold">{anomaly.status}</span></p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#18231F]">
              {isMarathi ? 'लेखापरीक्षण निराकरण शेरा / स्वाक्षरी टिप्पणी:' : 'Auditor / BOM Justification Note:'}
            </label>
            <textarea
              rows={3}
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="e.g. Identity verified with PAN physical verification; biometric re-enrolment scheduled next Monday."
              className="w-full p-2.5 text-xs bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#D9E0D6]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#EBEFE8] hover:bg-[#D9E0D6] text-[#18231F] text-xs font-semibold rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleResolve}
            className="px-4 py-2 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-[#A9F1DB]" />
            <span>{isMarathi ? 'विसंगती सोडवा व बॅच मंजूर करा' : 'Resolve Anomaly & Approve'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
