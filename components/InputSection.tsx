import React, { useRef } from 'react';
import { Camera, Upload, ImageIcon } from 'lucide-react';

interface InputSectionProps {
  onImageSelected: (file: File) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onImageSelected, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
        <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">เริ่มการตรวจสอบ</h2>
        <p className="text-slate-500 mb-8">ถ่ายภาพลูกถ้วยไฟฟ้าให้ชัดเจน หรืออัปโหลดรูปภาพที่มีอยู่จากแกลเลอรี</p>

        <div className="space-y-4">
          {/* Camera Button - Triggers input capture="environment" */}
          <button 
            disabled={isLoading}
            onClick={() => cameraInputRef.current?.click()}
            className="w-full flex items-center justify-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl shadow-lg shadow-purple-200 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Camera className="w-6 h-6" />
            <span className="font-semibold text-lg">ถ่ายภาพ</span>
          </button>
          
          {/* Upload Button */}
          <button 
             disabled={isLoading}
             onClick={() => fileInputRef.current?.click()}
             className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 p-4 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-6 h-6" />
            <span className="font-semibold text-lg">อัปโหลดรูปภาพ</span>
          </button>
        </div>

        {/* Hidden Inputs */}
        <input
          type="file"
          accept="image/*"
          capture="environment" 
          ref={cameraInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      <div className="text-center text-xs text-slate-400">
        <p>รองรับไฟล์: JPG, PNG, WEBP</p>
      </div>
    </div>
  );
};

export default InputSection;