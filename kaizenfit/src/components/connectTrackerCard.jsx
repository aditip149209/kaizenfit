import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';

const ConnectTrackerCard = () => {
  const navigate = useNavigate();

  const handleConnect = () => {
    navigate('/connect-tracker');
  };

  return (
    <div className="bg-gray-800 text-white rounded-2xl p-5 shadow-lg w-full max-w-md items-center justify-center">
      <h4 className="text-lg font-semibold mb-2 text-center flex">
        <FaLink className="mr-2" /> Connect Your Tracker
      </h4>
      <p className="text-sm text-gray-300 mt-1 text-center">
        Sync data from your smartwatch or fitness tracker.
      </p>
      <button
        onClick={handleConnect}
        className="mt-4 w-full bg-cyan-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all items-center justify-center"
      >
        Connect Now
      </button>
    </div>
  );
};

export default ConnectTrackerCard;


