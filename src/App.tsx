/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TrackerState } from './types';
import { PlanSelector } from './components/PlanSelector';
import { PaymentScreen } from './components/PaymentScreen';
import { ReceiptUpload } from './components/ReceiptUpload';
import { TrackerDashboard } from './components/TrackerDashboard';
import { ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'federal_funds_tracker_state';

const INITIAL_STATE: TrackerState = {
  step: 1,
  planId: null,
  startTime: null
};

export default function App() {
  const [trackerState, setTrackerState] = useState<TrackerState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.step) {
          setTrackerState(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load state', e);
    }
    setIsLoaded(true);
  }, []);

  const saveState = (newState: TrackerState) => {
    setTrackerState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  };

  const handlePlanSelect = (planId: string) => {
    saveState({ ...trackerState, planId });
  };

  const handleNextStep = () => {
    if (trackerState.step === 1 && trackerState.planId) {
      saveState({ ...trackerState, step: 2 });
    } else if (trackerState.step === 2) {
      saveState({ ...trackerState, step: 3 });
    } else if (trackerState.step === 3) {
      saveState({ ...trackerState, step: 4, startTime: Date.now() });
    }
  };

  const handleRestart = () => {
    saveState(INITIAL_STATE);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-hidden">
      <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">FedTrack <span className="text-slate-400 font-normal hidden sm:inline">| Tracking Console</span></span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            System Ready
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 flex flex-col items-center">
        {trackerState.step === 1 && (
          <PlanSelector 
            selectedPlanId={trackerState.planId} 
            onSelect={handlePlanSelect} 
            onStart={handleNextStep} 
          />
        )}
        {trackerState.step === 2 && (
          <PaymentScreen onContinue={handleNextStep} />
        )}
        {trackerState.step === 3 && (
          <ReceiptUpload onContinue={handleNextStep} />
        )}
        {trackerState.step === 4 && (
          <TrackerDashboard state={trackerState} onRestart={handleRestart} />
        )}
      </main>

      <footer className="h-10 bg-slate-100 border-t border-slate-200 px-4 md:px-6 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
        <div className="hidden sm:block">Internal Tracking ID: SYS-99X-ALFA</div>
        <div className="flex gap-2 md:gap-4 uppercase font-bold tracking-tighter">
          <span>No External API</span>
          <span className="text-slate-300">|</span>
          <span>Secure Connection</span>
        </div>
        <div className="hidden sm:block">Latency: 12ms</div>
      </footer>
    </div>
  );
}
