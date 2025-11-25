import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-900 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-purple-500 p-2 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Patrol AI</h1>
            <p className="text-xs text-purple-200">ระบบตรวจวิเคราะห์ลูกถ้วยไฟฟ้า</p>
          </div>
        </div>
        <div className="text-xs bg-purple-800 px-2 py-1 rounded border border-purple-700">
          v1.0
        </div>
      </div>
    </header>
  );
};

export default Header;