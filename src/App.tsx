/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TrackerState, IncidentInfo } from './types';
import { InfoForm } from './components/InfoForm';
import { PlanSelector } from './components/PlanSelector';
import { PaymentScreen } from './components/PaymentScreen';
import { ReceiptUpload } from './components/ReceiptUpload';
import { TrackerDashboard } from './components/TrackerDashboard';
import { ShieldCheck, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'federal_funds_tracker_state';

const INITIAL_STATE: TrackerState = {
  step: 0,
  incidentInfo: undefined,
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
        if (typeof parsed.step === 'number') {
          setTrackerState(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load saved state', e);
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

  const handleInfoContinue = (info: IncidentInfo) => {
    saveState({
      ...trackerState,
      incidentInfo: info,
      step: 1
    });
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

  const handleBackToInfo = () => {
    saveState({ ...trackerState, step: 0 });
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
          <span className="font-bold text-xl tracking-tight text-slate-800">
            FedTrack <span className="text-slate-400 font-normal hidden sm:inline">| Tracking Console</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            System Active
          </div>
          {trackerState.step > 0 && (
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              title="Reset Tracker Session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 flex flex-col items-center">
        {trackerState.step === 0 && (
          <InfoForm
            initialData={trackerState.incidentInfo}
            onContinue={handleInfoContinue}
            onCancel={handleRestart}
          />
        )}
        {trackerState.step === 1 && (
          <PlanSelector 
            selectedPlanId={trackerState.planId} 
            onSelect={handlePlanSelect} 
            onStart={handleNextStep}
            onBack={handleBackToInfo}
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
          <span>Persistent Session</span>
          <span className="text-slate-300">|</span>
          <span>Secure Storage</span>
        </div>
        <div className="hidden sm:block">Latency: 12ms</div>
      </footer>
    </div>
  );
}

