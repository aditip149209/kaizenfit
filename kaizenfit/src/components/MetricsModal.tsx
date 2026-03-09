import React, { useState } from 'react';

export interface MetricsData {
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  waist?: number;
  chest?: number;
  arms?: number;
  thighs?: number;
  notes?: string;
}

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: MetricsData) => void;
}

export default function MetricsModal({ isOpen, onClose, onConfirm }: MetricsModalProps) {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [waist, setWaist] = useState('');
  const [chest, setChest] = useState('');
  const [arms, setArms] = useState('');
  const [thighs, setThighs] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      weight: parseFloat(weight),
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      muscleMass: muscleMass ? parseFloat(muscleMass) : undefined,
      waist: waist ? parseFloat(waist) : undefined,
      chest: chest ? parseFloat(chest) : undefined,
      arms: arms ? parseFloat(arms) : undefined,
      thighs: thighs ? parseFloat(thighs) : undefined,
      notes: notes || undefined,
    });
    // Reset form
    setWeight('');
    setBodyFat('');
    setMuscleMass('');
    setWaist('');
    setChest('');
    setArms('');
    setThighs('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 border-b-4 border-black">
          <h2 className="font-heading text-xl uppercase text-center">LOG METRICS</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Weight (Required) */}
          <div>
            <label className="block font-heading uppercase text-sm mb-2">
              Weight (KG) *
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono"
              placeholder="72.4"
              required
            />
          </div>

          {/* Body Composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-heading uppercase text-sm mb-2">
                Body Fat (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="15.5"
              />
            </div>

            <div>
              <label className="block font-heading uppercase text-sm mb-2">
                Muscle Mass (KG)
              </label>
              <input
                type="number"
                step="0.1"
                value={muscleMass}
                onChange={(e) => setMuscleMass(e.target.value)}
                className="w-full border-2 border-black p-2 font-mono"
                placeholder="55.0"
              />
            </div>
          </div>

          {/* Measurements Section */}
          <div className="border-t-2 border-gray-300 pt-4">
            <h3 className="font-heading uppercase text-sm mb-4 text-gray-700">
              Body Measurements (CM)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-heading uppercase text-xs mb-2">
                  Waist
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full border-2 border-black p-2 font-mono"
                  placeholder="80.0"
                />
              </div>

              <div>
                <label className="block font-heading uppercase text-xs mb-2">
                  Chest
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={chest}
                  onChange={(e) => setChest(e.target.value)}
                  className="w-full border-2 border-black p-2 font-mono"
                  placeholder="95.0"
                />
              </div>

              <div>
                <label className="block font-heading uppercase text-xs mb-2">
                  Arms
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={arms}
                  onChange={(e) => setArms(e.target.value)}
                  className="w-full border-2 border-black p-2 font-mono"
                  placeholder="35.0"
                />
              </div>

              <div>
                <label className="block font-heading uppercase text-xs mb-2">
                  Thighs
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={thighs}
                  onChange={(e) => setThighs(e.target.value)}
                  className="w-full border-2 border-black p-2 font-mono"
                  placeholder="58.0"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-heading uppercase text-sm mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono resize-none"
              rows={3}
              placeholder="How are you feeling today? Any observations..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border-2 border-black py-2 px-4 font-heading uppercase hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 bg-kaizen-green text-black border-2 border-black py-2 px-4 font-heading uppercase hover:bg-kaizen-mint transition-colors"
            >
              LOG METRICS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
