import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  User, 
  CreditCard, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Search,
  Sparkles
} from 'lucide-react';
import { Employee, Role } from '../types';
import { INITIAL_BRANCHES } from '../data/mockData';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (newEmployee: Employee) => void;
  isMarathi: boolean;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onAddEmployee,
  isMarathi,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form states
  const [name, setName] = useState('');
  const [nameMr, setNameMr] = useState('');
  const [role, setRole] = useState<Role>('Field Credit Officer');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [aadhaarLast4, setAadhaarLast4] = useState('');

  // Step 2: Banking
  const [bankName, setBankName] = useState('Bank of Maharashtra');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('MAHB0000072');
  const [pennyDropVerified, setPennyDropVerified] = useState(false);

  // Step 3: Statutory
  const [uan, setUan] = useState('');
  const [esicNo, setEsicNo] = useState('');
  const [ptCenter, setPtCenter] = useState('Pune Urban & Rural Tax Zone');

  // Step 4: Branch & Territory
  const [branch, setBranch] = useState(INITIAL_BRANCHES[0].name);
  const [taluka, setTaluka] = useState('Baramati');
  const [district, setDistrict] = useState('Pune');
  const [assignedSHGs, setAssignedSHGs] = useState(15);
  const [basicSalary, setBasicSalary] = useState(14000);

  if (!isOpen) return null;

  const handleVerifyPennyDrop = () => {
    if (accountNumber && ifsc) {
      setTimeout(() => {
        setPennyDropVerified(true);
      }, 500);
    }
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = INITIAL_BRANCHES.find(b => b.name === e.target.value);
    if (selected) {
      setBranch(selected.name);
      setTaluka(selected.taluka);
      setDistrict(selected.district);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate standard Maharashtra microfinance salary structure
    const basic = Number(basicSalary) || 14000;
    const hra = Math.round(basic * 0.4);
    const conveyance = 4500;
    const special = 2500;
    const incentive = 4000;
    const gross = basic + hra + conveyance + special + incentive;
    const pf = Math.round(basic * 0.12);
    const esic = gross <= 21000 ? Math.round(gross * 0.0075) : 0;
    const pt = 200; // Maharashtra PT standard
    const tds = 0;
    const totalDeductions = pf + esic + pt + tds;
    const net = gross - totalDeductions;

    const newEmpId = `MH-FCO-${Math.floor(1050 + Math.random() * 800)}`;

    const newEmp: Employee = {
      id: newEmpId,
      name: name || 'Sanjay Baburao Salunkhe',
      nameMr: nameMr || 'संजय बाबुराव साळुंखे',
      role,
      branch,
      district,
      taluka,
      assignedSHGs: Number(assignedSHGs) || 12,
      activeBorrowers: (Number(assignedSHGs) || 12) * 20,
      loanPortfolio: (Number(assignedSHGs) || 12) * 90000,
      collectionRate: 99.0,
      par30Rate: 0.3,
      pan: pan.toUpperCase() || 'ABCPS9912K',
      aadhaarMasked: `XXXX-XXXX-${aadhaarLast4 || '4920'}`,
      uan: uan || `101${Math.floor(100000000 + Math.random() * 900000000)}`,
      esicNo: esicNo || `314298${Math.floor(100000 + Math.random() * 900000)}001`,
      bankName,
      accountNumber: accountNumber || '60194829104',
      ifsc: ifsc.toUpperCase() || 'MAHB0000072',
      kycStatus: 'verified',
      basicSalary: basic,
      hra,
      fieldConveyance: conveyance,
      specialAllowance: special,
      incentiveEarned: incentive,
      grossSalary: gross,
      pfDeduction: pf,
      esicDeduction: esic,
      ptDeduction: pt,
      tdsDeduction: tds,
      totalDeductions,
      netPayable: net,
      attendanceDays: 26,
      totalWorkingDays: 26,
      biometricCompliance: 100,
      punchMissCount: 0,
      batchStatus: 'approved',
      joinDate: new Date().toISOString().slice(0, 10),
      phone: phone || '+91 98220 12345',
      email: email || `${(name || 'staff').toLowerCase().replace(/\s+/g, '.')}@hindusthanmfi.in`,
    };

    onAddEmployee(newEmp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#18231F]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-nbfc-modal overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-gradient-to-r from-[#F8FAFC] via-[#EBF0FF]/40 to-white">
          <div className="flex items-center gap-3.5">
            <div className="p-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center">
              <img 
                src={`${import.meta.env.BASE_URL}hmpl_logo.png`}
                alt="Hindusthan Microfinance" 
                className="h-9 w-auto object-contain" 
              />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0F172A]">
                {isMarathi ? 'नवीन फील्ड कर्मचारी नोंदणी व ई-केवायसी' : 'New Field Staff Onboarding & KYC Wizard'}
              </h3>
              <p className="text-xs text-[#64748B]">
                Hindusthan Microfinance UIDAI validation, IFSC penny drop, and EPFO enrollment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#5A6A62] hover:bg-[#EBEFE8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Stepper Header */}
        <div className="grid grid-cols-4 border-b border-[#D9E0D6] text-xs font-semibold text-center bg-[#FFFFFF]">
          <div className={`py-3 border-b-2 ${step === 1 ? 'border-[#0E5E4E] text-[#0E5E4E]' : 'border-transparent text-[#5A6A62]'}`}>
            1. Identity & KYC
          </div>
          <div className={`py-3 border-b-2 ${step === 2 ? 'border-[#0E5E4E] text-[#0E5E4E]' : 'border-transparent text-[#5A6A62]'}`}>
            2. Bank Account
          </div>
          <div className={`py-3 border-b-2 ${step === 3 ? 'border-[#0E5E4E] text-[#0E5E4E]' : 'border-transparent text-[#5A6A62]'}`}>
            3. Statutory (PF/PT)
          </div>
          <div className={`py-3 border-b-2 ${step === 4 ? 'border-[#0E5E4E] text-[#0E5E4E]' : 'border-transparent text-[#5A6A62]'}`}>
            4. Territory & Salary
          </div>
        </div>

        {/* Step Forms */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Full Name (English as per Aadhaar) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanjay Baburao Salunkhe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">मराठीत नाव (Devanagari Transliteration)</label>
                  <input
                    type="text"
                    placeholder="उदा. संजय बाबुराव साळुंखे"
                    value={nameMr}
                    onChange={(e) => setNameMr(e.target.value)}
                    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Designation / Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  >
                    <option value="Field Credit Officer">Field Credit Officer (FCO)</option>
                    <option value="Senior Credit Officer">Senior Credit Officer</option>
                    <option value="Cashier & Teller">Cashier & Teller</option>
                    <option value="Recovery & Vigilance Officer">Recovery & Vigilance Officer</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Mobile Contact *</label>
                  <input
                    type="text"
                    placeholder="+91 98220 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">PAN Card (10 Digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    placeholder="ABCPS9912K"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    className="w-full h-10 px-3 font-mono bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Aadhaar Last 4 Digits *</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="4920"
                    value={aadhaarLast4}
                    onChange={(e) => setAadhaarLast4(e.target.value)}
                    className="w-full h-10 px-3 font-mono bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#DDEFE3] border border-[#2C7A4B]/30 rounded-lg text-xs text-[#2C7A4B] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>UIDAI biometric OTP verification will be prompted during first mobile tablet sync.</span>
              </div>
            </div>
          )}

          {/* STEP 2: Banking */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#18231F]">Salary Bank Name *</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                >
                  <option value="Bank of Maharashtra">Bank of Maharashtra (State Preferred)</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>
                  <option value="Canara Bank">Canara Bank</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Savings Account Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 60194829104"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full h-10 px-3 font-mono bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Bank IFSC Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="MAHB0000072"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                    className="w-full h-10 px-3 font-mono bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
              </div>

              {/* Penny Drop Verification Simulation */}
              <div className="p-4 rounded-xl bg-[#F4F6F2] border border-[#D9E0D6] flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-[#18231F]">NPCI Penny Drop Account Validation</p>
                  <p className="text-[11px] text-[#5A6A62]">Transfers ₹1.00 to verify account active status & holder name</p>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyPennyDrop}
                  className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    pennyDropVerified
                      ? 'bg-[#DDEFE3] text-[#2C7A4B] border border-[#2C7A4B]/40'
                      : 'bg-[#0E5E4E] text-[#FFFFFF]'
                  }`}
                >
                  {pennyDropVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                  <span>{pennyDropVerified ? 'Penny Drop Verified' : 'Run Penny Drop'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Statutory */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#18231F]">EPFO Universal Account Number (UAN)</label>
                <input
                  type="text"
                  placeholder="e.g. 101948291048 (Leave blank if first-time enrollee)"
                  value={uan}
                  onChange={(e) => setUan(e.target.value)}
                  className="w-full h-10 px-3 font-mono bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                />
                <p className="text-[10px] text-[#5A6A62]">If left blank, system auto-generates EPFO fresh member ID.</p>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#18231F]">ESIC Insurance IP Number</label>
                <input
                  type="text"
                  placeholder="e.g. 3142981048001"
                  value={esicNo}
                  onChange={(e) => setEsicNo(e.target.value)}
                  className="w-full h-10 px-3 font-mono bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#18231F]">Maharashtra PT Tax Registration Jurisdiction</label>
                <select
                  value={ptCenter}
                  onChange={(e) => setPtCenter(e.target.value)}
                  className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                >
                  <option value="Pune Urban & Rural Tax Zone">Pune Division (Baramati / Indapur / Daund)</option>
                  <option value="Satara District Tax Circle">Satara Division (Wai / Khandala / Karad)</option>
                  <option value="Kolhapur Sugar Belt Circle">Kolhapur Division (Shirol / Hatkanangle)</option>
                  <option value="Solapur Agri Circle">Solapur Division (Pandharpur / Mohol)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: Territory & Salary */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Cluster Branch Assignment *</label>
                  <select
                    value={branch}
                    onChange={handleBranchChange}
                    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  >
                    {INITIAL_BRANCHES.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Taluka & District</label>
                  <input
                    type="text"
                    disabled
                    value={`${taluka}, ${district}`}
                    className="w-full h-10 px-3 bg-[#EBEFE8] border border-[#D9E0D6] rounded-lg text-xs text-[#5A6A62]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Initial SHG Groups Assigned</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={assignedSHGs}
                    onChange={(e) => setAssignedSHGs(parseInt(e.target.value) || 10)}
                    className="w-full h-10 px-3 font-mono bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#18231F]">Basic Monthly Pay (₹) *</label>
                  <input
                    type="number"
                    min="10000"
                    max="60000"
                    step="500"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(parseInt(e.target.value) || 14000)}
                    className="w-full h-10 px-3 font-mono bg-[#FFFFFF] border border-[#D9E0D6] rounded-lg text-xs text-[#18231F] focus:outline-none focus:border-[#0E5E4E]"
                  />
                </div>
              </div>

              {/* Calculated Package Preview */}
              <div className="p-3 bg-[#DCEBE5]/50 border border-[#0E5E4E]/30 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-[#0E5E4E]">Calculated CTC Summary:</span>
                <div className="flex justify-between text-[#5A6A62]">
                  <span>Gross (Basic + HRA + Conveyance + Allowance):</span>
                  <strong className="text-[#18231F] font-mono">₹ {(basicSalary * 1.4 + 7000 + 4000).toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-[#5A6A62]">
                  <span>Net Estimated Take-Home (after EPF 12% & PT ₹200):</span>
                  <strong className="text-[#0E5E4E] font-mono">₹ {(basicSalary * 1.4 + 7000 + 4000 - basicSalary * 0.12 - 200).toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#D9E0D6]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="h-9 px-4 bg-[#EBEFE8] hover:bg-[#D9E0D6] text-[#18231F] font-semibold text-xs rounded-lg flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                className="h-9 px-4 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] font-semibold text-xs rounded-lg flex items-center gap-1.5 transition"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="h-9 px-5 bg-[#0E5E4E] hover:bg-[#0A493D] text-[#FFFFFF] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition"
              >
                <CheckCircle2 className="w-4 h-4 text-[#A9F1DB]" />
                <span>Complete Onboarding & Enroll Staff</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
