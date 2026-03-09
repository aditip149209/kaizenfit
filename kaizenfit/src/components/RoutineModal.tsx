import React, { useState, useEffect } from 'react';

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (routine: RoutineData) => void;
}

export interface RoutineData {
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  exercises: string[];
}

const RoutineModal: React.FC<RoutineModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState<RoutineData>({
    name: '',
    description: '',
    duration: 45,
    difficulty: 'intermediate',
    exercises: []
  });

  const [exerciseInput, setExerciseInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', description: '', duration: 45, difficulty: 'intermediate', exercises: [] });
      setExerciseInput('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  const addExercise = () => {
    if (exerciseInput.trim()) {
      setFormData({...formData, exercises: [...formData.exercises, exerciseInput.trim()]});
      setExerciseInput('');
    }
  };

  const removeExercise = (index: number) => {
    setFormData({...formData, exercises: formData.exercises.filter((_, i) => i !== index)});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-3 border-black shadow-neo w-full max-w-md max-h-[90vh] overflow-y-auto">
        
        <div className="bg-black text-white p-4 border-b-3 border-black flex justify-between items-center sticky top-0">
          <h2 className="font-heading uppercase text-xl text-kaizen-green tracking-wider">
            Create Routine_
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-500 font-bold text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Routine Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
              placeholder="e.g., Upper Body Burn"
              required
            />
          </div>

          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none resize-none"
              rows={2}
              placeholder="Brief description of routine..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Duration (min)</label>
              <input 
                type="number" 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
                min="5"
              />
            </div>
            <div>
              <label className="block font-heading uppercase text-xs mb-1 font-bold">Difficulty</label>
              <select 
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Exercises</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={exerciseInput}
                onChange={(e) => setExerciseInput(e.target.value)}
                className="flex-1 border-3 border-black p-2 font-mono text-sm focus:bg-kaizen-lightgreen focus:outline-none"
                placeholder="Add exercise..."
              />
              <button 
                type="button"
                onClick={addExercise}
                className="bg-black text-white px-4 py-2 border-3 border-black font-heading text-sm hover:bg-kaizen-green hover:text-black"
              >
                +
              </button>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {formData.exercises.map((ex, i) => (
                <div key={i} className="flex items-center justify-between bg-kaizen-lightgreen border-2 border-black p-2">
                  <span className="font-mono text-sm">{ex}</span>
                  <button 
                    type="button"
                    onClick={() => removeExercise(i)}
                    className="text-red-600 font-bold hover:bg-red-100 px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 bg-white text-black border-3 border-black py-3 font-heading uppercase text-sm hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-black text-white border-3 border-black py-3 font-heading uppercase text-sm shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-kaizen-green hover:text-black"
            >
              Create Routine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoutineModal;
