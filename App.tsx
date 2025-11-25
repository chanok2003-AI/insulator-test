import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import AnalysisCard from './components/AnalysisCard';
import { AnalysisState } from './types';
import { analyzeInsulatorImage, fileToBase64 } from './services/geminiService';
import { Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    result: null,
    imagePreview: null,
  });

  const handleImageSelect = async (file: File) => {
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    setState({
      isLoading: true,
      error: null,
      result: null,
      imagePreview: previewUrl,
    });

    try {
      // Convert to base64
      const base64 = await fileToBase64(file);
      
      // Call Gemini Service
      const result = await analyzeInsulatorImage(base64, file.type);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        result: result,
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "เกิดข้อผิดพลาดที่ไม่คาดคิด",
      }));
    }
  };

  const handleReset = () => {
    if (state.imagePreview) {
      URL.revokeObjectURL(state.imagePreview);
    }
    setState({
      isLoading: false,
      error: null,
      result: null,
      imagePreview: null,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      <Header />

      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* Loading State Overlay */}
        {state.isLoading && (
           <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
             <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-slate-800">กำลังวิเคราะห์ภาพ...</h3>
                <p className="text-slate-500 mt-2 text-center max-w-xs">กำลังตรวจสอบรอยไหม้ ความเสียหาย และสภาพผิวของลูกถ้วย</p>
             </div>
           </div>
        )}

        {/* Initial Input State */}
        {!state.result && !state.isLoading && (
          <div className="w-full">
            {state.error && (
              <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start text-red-700">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">การวิเคราะห์ล้มเหลว</p>
                  <p className="text-sm">{state.error}</p>
                </div>
              </div>
            )}
            <InputSection onImageSelected={handleImageSelect} isLoading={state.isLoading} />
          </div>
        )}

        {/* Result State */}
        {state.result && state.imagePreview && (
          <AnalysisCard 
            result={state.result} 
            imagePreview={state.imagePreview} 
            onReset={handleReset} 
          />
        )}

      </main>
    </div>
  );
};

export default App;