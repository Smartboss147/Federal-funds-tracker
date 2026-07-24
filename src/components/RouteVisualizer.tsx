import React from 'react';
import { motion } from 'motion/react';

interface RouteVisualizerProps {
  progress: number;
}

export function RouteVisualizer({ progress }: RouteVisualizerProps) {
  return (
    <div className="relative flex-1 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-8 md:p-12 overflow-hidden w-full min-h-[200px] mt-6">
      {/* Connection Line */}
      <div className="absolute w-[calc(100%-8rem)] md:w-[calc(100%-12rem)] h-[2px] bg-slate-200 z-0"></div>
      
      {/* Active track */}
      <div className="absolute w-[calc(100%-8rem)] md:w-[calc(100%-12rem)] h-[2px] z-0 flex justify-start items-center">
        <motion.div 
          className="h-full bg-indigo-500 origin-left"
          style={{ width: '100%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.5, ease: "linear" }}
        />
      </div>
      
      <div className="relative w-full max-w-2xl flex justify-between items-center z-10 px-4 md:px-12 mx-auto">
        {/* Origin Node */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center shadow-md">
            <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          </div>
          <div className="text-center">
            <div className="font-bold text-sm text-slate-800">Treasury Node</div>
            <div className="text-[10px] text-slate-400 uppercase">D.C. Hub</div>
          </div>
        </div>

        {/* Animated Indicator (Simulated Mid-point) */}
        <div className="absolute left-4 right-4 md:left-12 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 -ml-4 flex flex-col items-center gap-2"
            initial={{ left: '0%' }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.5, ease: "linear" }}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-45">
              <svg className="w-4 h-4 text-white -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded font-bold whitespace-nowrap -mb-10 absolute top-10 transform -rotate-45">ID: TR-88219</div>
          </motion.div>
        </div>

        {/* Destination Node */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
          </div>
          <div className="text-center text-slate-400">
            <div className="font-bold text-sm text-slate-800">Recipient Node</div>
            <div className="text-[10px] uppercase">Verified Entry</div>
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
    </div>
  );
}
