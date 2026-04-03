import React, { useState, useEffect } from 'react';

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (routine: RoutineData) => void;
  availableExercises: Array<{ id: string; name: string }>;
  onOpenAddExercise: (prefillName: string) => void;
}

export interface RoutineData {
  name: string;
  description: string;
  duration: number;
  exercises: string[];
}

const RoutineModal: React.FC<RoutineModalProps> = ({ isOpen, onClose, onConfirm, availableExercises, onOpenAddExercise }) => {
  const [formData, setFormData] = useState<RoutineData>({
    name: '',
    description: '',
    duration: 45,
    exercises: []
  });

  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [debouncedExerciseSearch, setDebouncedExerciseSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', description: '', duration: 45, exercises: [] });
      setSelectedExerciseId('');
      setExerciseSearch('');
      setDebouncedExerciseSearch('');
    }
  }, [isOpen, availableExercises]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedExerciseSearch(exerciseSearch.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [exerciseSearch, isOpen]);

  const filteredExercises = debouncedExerciseSearch
    ? availableExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(debouncedExerciseSearch.toLowerCase())
      )
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  const addExercise = () => {
    const selectedExercise = availableExercises.find((exercise) => exercise.id === selectedExerciseId);

    if (!selectedExercise) {
      return;
    }

    setFormData((prev) => {
      if (prev.exercises.includes(selectedExercise.name)) {
        return prev;
      }

      return { ...prev, exercises: [...prev.exercises, selectedExercise.name] };
    });
  };

  const removeExercise = (index: number) => {
    setFormData((prev) => ({ ...prev, exercises: prev.exercises.filter((_, i) => i !== index) }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-3 border-black shadow-neo w-full max-w-md max-h-[90vh] overflow-y-auto">
        
        <div className="bg-black text-white p-4 border-b-3 border-black flex justify-between items-center sticky top-0">
          <h2 className="font-heading uppercase text-xl text-kaizen-green tracking-wider">
            Create Routine_
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-500 font-bold text-xl transition-colors">
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
            <label className="block font-heading uppercase text-xs mb-1 font-bold">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border-3 border-black p-3 font-mono focus:bg-kaizen-lightgreen focus:outline-none resize-none"
              rows={2}
              placeholder="Brief description of routine..."
            />
          </div>

          <div className="border-t-2 border-gray-300 pt-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <label className="block font-heading uppercase text-xs font-bold">Exercises</label>
              <span className="font-mono text-[10px] uppercase text-gray-500">Use + to add</span>
            </div>

            <div className="space-y-2 mb-2">
              <input
                type="text"
                value={exerciseSearch}
                onChange={(e) => {
                  setExerciseSearch(e.target.value);
                  setSelectedExerciseId('');
                }}
                className="w-full border-3 border-black p-3 font-mono text-sm focus:bg-kaizen-lightgreen focus:outline-none"
                placeholder="Search exercise"
              />

              <div className="border-2 border-black bg-white max-h-28 overflow-y-auto">
                {!debouncedExerciseSearch ? (
                  <p className="font-mono text-xs p-2 uppercase text-gray-600">Type to search exercises.</p>
                ) : filteredExercises.length > 0 ? (
                  filteredExercises.map((exercise) => (
                    <button
                      key={exercise.id}
                      type="button"
                      onClick={() => {
                        setSelectedExerciseId(exercise.id);
                        setExerciseSearch(exercise.name);
                      }}
                      className="w-full text-left px-3 py-2 border-b border-black/20 last:border-b-0 hover:bg-kaizen-lightgreen/60 font-mono text-sm"
                    >
                      {exercise.name}
                    </button>
                  ))
                ) : (
                  <p className="font-mono text-xs p-2 uppercase text-gray-600">No matches.</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => onOpenAddExercise(exerciseSearch.trim())}
                className="w-full border-2 border-black bg-kaizen-lightgreen px-3 py-2 font-heading text-xs uppercase hover:bg-kaizen-mint"
              >
                + Add New Exercise
              </button>
            </div>

            <div className="flex gap-2 mb-2">
              <button 
                type="button"
                onClick={addExercise}
                className="bg-black text-white px-4 py-2 border-3 border-black font-heading text-sm hover:bg-kaizen-green hover:text-black"
              >
                Add Selected
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

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-black text-white border-3 border-black py-3 font-heading uppercase text-sm shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-kaizen-green hover:text-black"
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
