import React, { useState } from 'react';
import { UploadCloud, FileImage, X } from 'lucide-react';

interface ReceiptUploadProps {
  onContinue: () => void;
}

export function ReceiptUpload({ onContinue }: ReceiptUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 flex-1 flex flex-col w-full max-w-2xl mx-auto mt-8">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Receipt Upload</h2>
        <p className="text-slate-500 text-sm">Upload a receipt image to continue the demonstration. Uploaded files are used only to demonstrate the interface and are not verified.</p>
      </div>

      <div className="flex flex-col gap-6">
        {!previewUrl ? (
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <UploadCloud className="w-10 h-10 text-slate-400 mb-4" />
            <span className="text-slate-700 font-semibold mb-1">Click to upload an image</span>
            <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">or drag and drop</span>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col items-center relative overflow-hidden">
            <button 
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-slate-600 hover:text-red-500 shadow-sm transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-full flex justify-center mb-4 rounded-lg overflow-hidden border border-slate-200 bg-white">
              <img src={previewUrl} alt="Receipt preview" className="max-h-64 object-contain" />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <FileImage className="w-4 h-4 text-emerald-500" />
              Image successfully loaded (demo)
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onContinue}
            disabled={!previewUrl}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
