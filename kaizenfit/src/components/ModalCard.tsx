
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeightEntry {
  date: string;
  weight: number;
}

interface ModalCardProps {
  isOpen: boolean;
  onClose: () => void;
  viewType: 'WEIGHT' | 'CALORIE' | 'WATER';
  data: WeightEntry[];
}

const ModalCard: React.FC<ModalCardProps> = ({ isOpen, onClose, viewType, data }) => {
  if (!isOpen) return null;

  // Prepare chart data
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: viewType,
        data: data.map(entry => entry.weight),
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  // Split data into two columns
  const midPoint = Math.ceil(data.length / 2);
  const leftColumn = data.slice(0, midPoint);
  const rightColumn = data.slice(midPoint);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-green-400 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">VIEW: {viewType}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:bg-green-500 rounded px-3 py-1 transition-colors"
          >
            X
          </button>
        </div>

        {/* Chart */}
        <div className="p-6 bg-gray-50">
          <div className="h-48 bg-white rounded">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Data Table */}
        <div className="px-6 pb-6 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="grid grid-cols-2 gap-4 font-semibold mb-2 pb-2 border-b-2 border-black">
                <div>DATE</div>
                <div>{viewType}</div>
              </div>
              {leftColumn.map((entry, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 py-1">
                  <div>{entry.date}</div>
                  <div>{entry.weight}</div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div>
              <div className="grid grid-cols-2 gap-4 font-semibold mb-2 pb-2 border-b-2 border-black">
                <div>DATE</div>
                <div>{viewType}</div>
              </div>
              {rightColumn.map((entry, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 py-1">
                  <div>{entry.date}</div>
                  <div>{entry.weight}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
