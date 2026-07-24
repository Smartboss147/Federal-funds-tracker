import React, { useState } from 'react';
import { IncidentInfo } from '../types';
import { FileText, User, Calendar, DollarSign, AlertCircle } from 'lucide-react';

interface InfoFormProps {
  initialData?: IncidentInfo;
  onContinue: (info: IncidentInfo) => void;
  onCancel?: () => void;
}

const CURRENCIES = [
  { code: 'NGN', symbol: '₦', label: 'Nigeria (NGN ₦)' },
  { code: 'ZAR', symbol: 'R', label: 'South Africa (ZAR R)' },
  { code: 'EUR', symbol: '€', label: 'Germany / Eurozone (EUR €)' },
  { code: 'USD', symbol: '$', label: 'United States (USD $)' },
  { code: 'GBP', symbol: '£', label: 'United Kingdom (GBP £)' },
  { code: 'CAD', symbol: '$', label: 'Canada (CAD $)' },
  { code: 'AUD', symbol: '$', label: 'Australia (AUD $)' },
  { code: 'JPY', symbol: '¥', label: 'Japan (JPY ¥)' },
  { code: 'KES', symbol: 'KSh', label: 'Kenya (KES KSh)' },
  { code: 'GHS', symbol: 'GH₵', label: 'Ghana (GHS GH₵)' },
  { code: 'EGP', symbol: 'E£', label: 'Egypt (EGP E£)' },
  { code: 'CHF', symbol: 'CHF', label: 'Switzerland (CHF)' },
  { code: 'CNY', symbol: '¥', label: 'China (CNY ¥)' },
  { code: 'SEK', symbol: 'kr', label: 'Sweden (SEK kr)' },
  { code: 'NZD', symbol: '$', label: 'New Zealand (NZD $)' },
  { code: 'MXN', symbol: '$', label: 'Mexico (MXN $)' },
  { code: 'SGD', symbol: '$', label: 'Singapore (SGD $)' },
  { code: 'HKD', symbol: '$', label: 'Hong Kong (HKD $)' },
  { code: 'NOK', symbol: 'kr', label: 'Norway (NOK kr)' },
  { code: 'KRW', symbol: '₩', label: 'South Korea (KRW ₩)' },
  { code: 'TRY', symbol: '₺', label: 'Turkey (TRY ₺)' },
  { code: 'INR', symbol: '₹', label: 'India (INR ₹)' },
  { code: 'PKR', symbol: '₨', label: 'Pakistan (PKR ₨)' },
  { code: 'BDT', symbol: '৳', label: 'Bangladesh (BDT ৳)' },
  { code: 'RUB', symbol: '₽', label: 'Russia (RUB ₽)' },
  { code: 'BRL', symbol: 'R$', label: 'Brazil (BRL R$)' },
  { code: 'DKK', symbol: 'kr', label: 'Denmark (DKK kr)' },
  { code: 'PLN', symbol: 'zł', label: 'Poland (PLN zł)' },
  { code: 'TWD', symbol: 'NT$', label: 'Taiwan (TWD NT$)' },
  { code: 'THB', symbol: '฿', label: 'Thailand (THB ฿)' },
  { code: 'MYR', symbol: 'RM', label: 'Malaysia (MYR RM)' },
  { code: 'IDR', symbol: 'Rp', label: 'Indonesia (IDR Rp)' },
  { code: 'VND', symbol: '₫', label: 'Vietnam (VND ₫)' },
  { code: 'CZK', symbol: 'Kč', label: 'Czech Republic (CZK Kč)' },
  { code: 'HUF', symbol: 'Ft', label: 'Hungary (HUF Ft)' },
  { code: 'ILS', symbol: '₪', label: 'Israel (ILS ₪)' },
  { code: 'PHP', symbol: '₱', label: 'Philippines (PHP ₱)' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE (AED د.إ)' },
  { code: 'SAR', symbol: '﷼', label: 'Saudi Arabia (SAR ﷼)' },
  { code: 'QAR', symbol: 'QR', label: 'Qatar (QAR QR)' },
  { code: 'KWD', symbol: 'KD', label: 'Kuwait (KWD KD)' },
  { code: 'COP', symbol: '$', label: 'Colombia (COP $)' },
  { code: 'CLP', symbol: '$', label: 'Chile (CLP $)' },
  { code: 'RON', symbol: 'lei', label: 'Romania (RON lei)' },
  { code: 'PEN', symbol: 'S/', label: 'Peru (PEN S/)' },
  { code: 'ARS', symbol: '$', label: 'Argentina (ARS $)' },
];

export function InfoForm({ initialData, onContinue, onCancel }: InfoFormProps) {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [dateOfBirth, setDateOfBirth] = useState(initialData?.dateOfBirth || '');
  const [currency, setCurrency] = useState(initialData?.currency || 'USD');
  const [amount, setAmount] = useState(initialData?.amount || '');
  const [description, setDescription] = useState(initialData?.description || '');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const MAX_DESC_LENGTH = 500;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required.';
    } else {
      const selectedDate = new Date(dateOfBirth);
      const today = new Date();
      if (isNaN(selectedDate.getTime()) || selectedDate > today) {
        newErrors.dateOfBirth = 'Please enter a valid past birth date.';
      }
    }

    const numericAmount = parseFloat(amount.replace(/,/g, ''));
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required.';
    } else if (isNaN(numericAmount) || numericAmount <= 0) {
      newErrors.amount = 'Please enter a valid positive amount.';
    }

    if (!description.trim()) {
      newErrors.description = 'Short description of the incident is required.';
    } else if (description.length > MAX_DESC_LENGTH) {
      newErrors.description = `Description must not exceed ${MAX_DESC_LENGTH} characters.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits, single decimal point, and commas
    if (/^[0-9.,]*$/.test(val)) {
      setAmount(val);
      if (errors.amount) {
        setErrors(prev => ({ ...prev, amount: '' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      dateOfBirth: true,
      amount: true,
      description: true,
    });

    if (validate()) {
      const selectedCurrencyObj = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
      const numericVal = parseFloat(amount.replace(/,/g, ''));
      const formattedAmount = isNaN(numericVal) ? amount : numericVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      onContinue({
        fullName: fullName.trim(),
        dateOfBirth,
        currency: selectedCurrencyObj.code,
        amount: formattedAmount,
        description: description.trim(),
      });
    }
  };

  const handleCancel = () => {
    setFullName('');
    setDateOfBirth('');
    setCurrency('USD');
    setAmount('');
    setDescription('');
    setErrors({});
    setTouched({});
    if (onCancel) {
      onCancel();
    }
  };

  // Today's date formatted as YYYY-MM-DD for max attribute on birth date
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 flex-1 flex flex-col w-full max-w-2xl mx-auto mt-4 sm:mt-8">
      <div className="text-center space-y-2 mb-8">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Funds Tracker</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Please provide the details below to initiate your funds tracking process and proceed to plan selection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
              }}
              onBlur={() => setTouched(prev => ({ ...prev, fullName: true }))}
              placeholder="e.g. Alex Morgan"
              className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${
                errors.fullName && touched.fullName
                  ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white'
              }`}
            />
          </div>
          {errors.fullName && touched.fullName && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Date of Birth <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              max={todayStr}
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value);
                if (errors.dateOfBirth) setErrors(prev => ({ ...prev, dateOfBirth: '' }));
              }}
              onBlur={() => setTouched(prev => ({ ...prev, dateOfBirth: true }))}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm text-slate-800 focus:outline-none transition-all ${
                errors.dateOfBirth && touched.dateOfBirth
                  ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white'
              }`}
            />
          </div>
          {errors.dateOfBirth && touched.dateOfBirth && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.dateOfBirth}</span>
            </p>
          )}
        </div>

        {/* Amount (Currency + Amount) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Amount <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            {/* Currency Select */}
            <div className="w-32 shrink-0">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                {CURRENCIES.find(c => c.code === currency)?.symbol || '$'}
              </div>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                onBlur={() => setTouched(prev => ({ ...prev, amount: true }))}
                placeholder="0.00"
                className={`w-full pl-9 pr-4 py-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${
                  errors.amount && touched.amount
                    ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white'
                }`}
              />
            </div>
          </div>
          {errors.amount && touched.amount && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.amount}</span>
            </p>
          )}
        </div>

        {/* Short Description of Incident */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Short Description of the Incident <span className="text-rose-500">*</span>
            </label>
            <span className={`text-[11px] ${description.length > MAX_DESC_LENGTH ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
              {description.length} / {MAX_DESC_LENGTH}
            </span>
          </div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= MAX_DESC_LENGTH) {
                setDescription(e.target.value);
                if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
              }
            }}
            onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
            placeholder="Briefly describe what happened, including dates, financial platforms involved, transaction references, or details of the funds loss..."
            className={`w-full p-3.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all resize-none ${
              errors.description && touched.description
                ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white'
            }`}
          />
          {errors.description && touched.description && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 mt-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm transition-all"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg active:scale-[0.98] transition-all shadow-sm"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
