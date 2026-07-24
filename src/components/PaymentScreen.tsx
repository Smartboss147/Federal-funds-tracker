import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PaymentScreenProps {
  onContinue: () => void;
}

export function PaymentScreen({ onContinue }: PaymentScreenProps) {
  const [copied, setCopied] = useState(false);
  const walletAddress = '0x6aEC6e8AedC600B8EA25577748a513E6CDA850F3';

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 flex-1 flex flex-col w-full max-w-2xl mx-auto mt-8">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Payment steps</h2>
        <p className="text-slate-500 text-sm">Send the exact amount to the following wallet address.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="p-6 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Network</label>
            <div className="text-slate-800 font-semibold">eth network</div>
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">USDT Wallet Address</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white border border-slate-200 p-3 rounded-lg text-sm text-slate-700 break-all">
                {walletAddress}
              </code>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center p-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors border border-indigo-100"
                title="Copy Address"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onContinue}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg active:scale-[0.98] transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
