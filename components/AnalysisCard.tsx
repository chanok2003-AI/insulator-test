import React from 'react';
import { AnalysisResult, InsulatorStatus } from '../types';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle, Activity } from 'lucide-react';

interface AnalysisCardProps {
  result: AnalysisResult;
  imagePreview: string;
  onReset: () => void;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ result, imagePreview, onReset }) => {
  
  const getStatusConfig = (status: InsulatorStatus) => {
    switch (status) {
      case InsulatorStatus.NORMAL:
        return {
          color: 'bg-green-50 border-green-200 text-green-800',
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          title: 'สภาพปกติ',
          barColor: 'bg-green-500'
        };
      case InsulatorStatus.FLASHOVER:
        return {
          color: 'bg-orange-50 border-orange-200 text-orange-800',
          icon: <Activity className="w-12 h-12 text-orange-500" />,
          title: 'ตรวจพบ Flashover',
          barColor: 'bg-orange-500'
        };
      case InsulatorStatus.BROKEN:
        return {
          color: 'bg-red-50 border-red-200 text-red-800',
          icon: <XCircle className="w-12 h-12 text-red-600" />,
          title: 'แตกหัก / เสียหาย',
          barColor: 'bg-red-600'
        };
      default:
        return {
          color: 'bg-gray-50 border-gray-200 text-gray-800',
          icon: <HelpCircle className="w-12 h-12 text-gray-500" />,
          title: 'ไม่สามารถระบุได้',
          barColor: 'bg-gray-500'
        };
    }
  };

  const config = getStatusConfig(result.status);

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
      {/* Image Preview */}
      <div className="relative h-64 w-full bg-slate-100">
        <img 
          src={imagePreview} 
          alt="Analyzed Insulator" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent`}>
           <span className="text-white text-xs font-mono uppercase tracking-wider">ภาพต้นฉบับ</span>
        </div>
      </div>

      {/* Result Header */}
      <div className={`p-6 border-b ${config.color} border-l-4`}>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm">
            {config.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase">{config.title}</h2>
            <p className="text-sm font-medium opacity-90">{result.status}</p>
          </div>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-6 space-y-6">
        
        {/* Confidence Meter */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase">ความมั่นใจของ AI</span>
            <span className="text-sm font-bold text-slate-700">{result.confidence}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${config.barColor}`} 
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase flex items-center">
             ผลการวิเคราะห์
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
            {result.description}
          </p>
        </div>

        {/* Recommendation */}
        <div>
           <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase flex items-center">
             <AlertTriangle className="w-4 h-4 mr-1 text-slate-500" />
             ข้อแนะนำ
          </h3>
          <p className="text-slate-700 text-sm font-medium">
            {result.recommendation}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={onReset}
          className="w-full py-4 mt-4 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-all active:scale-95"
        >
          ตรวจสอบรายการใหม่
        </button>
      </div>
    </div>
  );
};

export default AnalysisCard;