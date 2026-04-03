import React, { useState, useEffect } from 'react';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (exercise: ExerciseData) => void;
  initialName?: string;
}

export interface ExerciseData {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ isOpen, onClose, onConfirm, initialName = '' }) => {
  const [formData, setFormData] = useState<ExerciseData>({
    name: '',
    sets: 3,
    reps: 10,
    weight: 0,
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: initialName, sets: 3, reps: 10, weight: 0, notes: '' });
    }
  }, [isOpen, initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-3 border-black shadow-neo w-full max-w-md">
        
        <div className="bg-black text-white p-4 border-b-3 border-black flex justify-between items-center">
          <h2 className="font-heading uppercase text-xl text-kaizen-green tracking-wider">
            Create Exercise_
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-500 font-bold text-xl transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Exercise Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
              placeholder="e.g., Bench Press"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Sets</label>
              <input 
                type="number" 
                value={formData.sets}
                onChange={(e) => setFormData({...formData, sets: Number(e.target.value)})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
                min="1"
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Reps</label>
              <input 
                type="number" 
                value={formData.reps}
                onChange={(e) => setFormData({...formData, reps: Number(e.target.value)})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
                min="1"
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Weight (kg)</label>
              <input 
                type="number" 
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Notes (Optional)</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none resize-none"
              rows={3}
              placeholder="Form cues, tempo, etc."
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-black text-white border-3 border-black py-3 font-heading uppercase text-sm shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-kaizen-green hover:text-black"
            >
              Create Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseModal;
