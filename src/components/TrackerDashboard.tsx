import React, { useEffect, useState } from 'react';
import { TrackerState } from '../types';
import { PLANS } from '../constants';
import { formatTime, getStatus } from '../utils';
import { RouteVisualizer } from './RouteVisualizer';
import { CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrackerDashboardProps {
  state: TrackerState;
  onRestart: () => void;
}

export function TrackerDashboard({ state, onRestart }: TrackerDashboardProps) {
  const [now, setNow] = useState(Date.now());
  const plan = PLANS.find(p => p.id === state.planId);

  useEffect(() => {
    if (!plan) return;

    // Use requestAnimationFrame for smoother high-precision progress updates
    let animationFrameId: number;
    let lastUpdate = Date.now();

    const updateTime = () => {
      const currentTime = Date.now();
      // Update UI if at least 100ms has passed to save react renders, 
      // but we could also do it faster if we want smoother % display.
      // 50ms (20fps) is a good balance for text updates.
      if (currentTime - lastUpdate > 50) {
        setNow(currentTime);
        lastUpdate = currentTime;
      }
      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);

    return () => cancelAnimationFrame(animationFrameId);
  }, [plan]);

  if (!plan) return null;

  const elapsedMs = Math.max(0, now - state.startTime);
  const remainingMs = Math.max(0, plan.durationMs - elapsedMs);
  const rawProgress = (elapsedMs / plan.durationMs) * 100;
  const progress = Math.min(100, Math.max(0, rawProgress));
  const isComplete = progress >= 100;
  const status = getStatus(progress);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8 flex-1 flex flex-col w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Federal Funds Tracker</h1>
          <p className="text-slate-500 text-sm mt-1">Tracking asset routing through federal clearing channels | Plan: {plan.title}</p>
        </div>
        
        <div className="text-left sm:text-right">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Tracking Status</div>
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-600 font-semibold flex items-center justify-start sm:justify-end gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Funds tracking Complete</span>
              </motion.div>
            ) : (
              <motion.div 
                key="running"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-indigo-600 font-semibold flex items-center justify-start sm:justify-end gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                <span>{status}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <RouteVisualizer progress={progress} />

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Current Progress</div>
          <div className="text-xl font-bold text-slate-800">{progress.toFixed(2)}%</div>
          <div className="w-full bg-slate-200 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Elapsed Time</div>
          <div className="text-xl font-bold text-slate-800">{formatTime(elapsedMs)}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Remaining</div>
          <div className="text-xl font-bold text-slate-800">{formatTime(remainingMs)}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg. Velocity</div>
          <div className="text-xl font-bold text-slate-800 text-emerald-600">High</div>
        </div>
      </div>

      <div className="mt-8 flex justify-end pt-6 border-t border-slate-100">
        <button
          onClick={onRestart}
          className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Restart Tracking
        </button>
      </div>
    </div>
  );
}
