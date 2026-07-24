import React from 'react';
import { Plan } from '../types';
import { PLANS } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface PlanSelectorProps {
  selectedPlanId: string | null;
  onSelect: (planId: string) => void;
  onStart: () => void;
  onBack?: () => void;
}

export function PlanSelector({ selectedPlanId, onSelect, onStart, onBack }: PlanSelectorProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 flex-1 flex flex-col w-full max-w-2xl mx-auto mt-4 sm:mt-8">
      {onBack && (
        <button
          onClick={onBack}
          className="self-start flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Information Form</span>
        </button>
      )}

      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Funds Recovery Plans</h2>
        <p className="text-slate-500 text-sm">Choose a recovery timeframe to begin tracking.</p>
      </div>
      
      <div className="flex flex-col gap-3">
        {PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => onSelect(plan.id)}
              className={`p-4 rounded-lg cursor-pointer transition-colors relative text-left w-full ${
                isSelected 
                  ? 'border-2 border-indigo-600 bg-indigo-50/30' 
                  : 'border border-slate-200 hover:border-indigo-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <div>
                  <div className="font-bold text-slate-800">{plan.title}</div>
                  <div className="text-xs text-slate-500">Duration: {plan.durationLabel}</div>
                </div>
                <div className={`${isSelected ? 'text-indigo-600' : 'text-slate-600'} font-bold text-sm`}>{plan.priceLabel}</div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="flex justify-end mt-8">
        <button
          onClick={onStart}
          disabled={!selectedPlanId}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Tracking
        </button>
      </div>
    </div>
  );
}

