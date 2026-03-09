import React, { useState, useEffect } from 'react';

// Define Props Interface
interface WaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'LOG' | 'GOAL';
  currentLevel: number;
  currentGoal: number;
  onConfirm: (value: number) => void;
}

const WaterModal: React.FC<WaterModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  currentLevel, 
  onConfirm 
}) => {
  // Local state for the input
  const [inputValue, setInputValue] = useState<number>(0);

  // Reset/Preset input when modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      setInputValue(mode === 'LOG' ? 250 : 3000); // Default add 250ml or set goal to 3000
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-3 border-black shadow-neo w-full max-w-md animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-black text-white p-4 border-b-3 border-black flex justify-between items-center">
          <h2 className="font-heading uppercase text-xl text-kaizen-green tracking-wider">
            {mode === 'LOG' ? 'Hydration Log_' : 'Set Target_'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-red-500 font-bold text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {mode === 'LOG' ? (
            <>
              {/* LOG MODE: Visuals & Quick Add */}
              <div className="text-center mb-4">
                <span className="font-mono text-xs text-gray-500 uppercase font-bold">Current Level</span>
                <div className="font-heading text-5xl mt-1">{currentLevel}<span className="text-lg text-gray-400">ml</span></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {[250, 500, 1000].map(amt => (
                  <button 
                    key={amt}
                    onClick={() => setInputValue(amt)}
                    className={`py-3 border-3 border-black font-heading text-xs hover:bg-black hover:text-white transition-all uppercase ${inputValue === amt ? 'bg-kaizen-green' : 'bg-white'}`}
                  >
                    +{amt}ml
                  </button>
                ))}
              </div>

              <div className="relative pt-2">
                <label className="block font-heading uppercase text-xs mb-1 font-bold">Custom Amount (ml)</label>
                <input 
                  type="number" 
                  value={inputValue}
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  className="w-full border-3 border-black p-3 font-mono text-lg font-bold focus:bg-kaizen-lightgreen focus:outline-none transition-colors"
                />
              </div>
            </>
          ) : (
            <>
              {/* GOAL MODE: Set Target */}
              <div className="bg-kaizen-lightgreen border-3 border-black p-4 text-center mb-4">
                <p className="font-heading text-sm uppercase mb-1">Recommended Target</p>
                <p className="font-mono text-xs">Based on activity level: <strong>3000ml - 4000ml</strong></p>
              </div>

              <div>
                <label className="block font-heading uppercase text-xs mb-1 font-bold">Daily Goal (ml)</label>
                <input 
                  type="number" 
                  value={inputValue}
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  className="w-full border-3 border-black p-3 font-mono text-lg font-bold focus:bg-kaizen-green focus:outline-none transition-colors"
                />
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t-3 border-black bg-gray-50 flex gap-4">
          <button 
            onClick={onClose} 
            className="flex-1 bg-white text-black border-3 border-black py-3 font-heading uppercase text-sm hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm(inputValue)} 
            className="flex-1 bg-black text-white border-3 border-black py-3 font-heading uppercase text-sm shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-kaizen-green hover:text-black transition-all"
          >
            {mode === 'LOG' ? 'ADD ENTRY' : 'UPDATE GOAL'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default WaterModal;