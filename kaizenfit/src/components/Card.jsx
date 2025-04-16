import React from "react";

const Card = ({ userName }) => {
  const today = new Date().toLocaleDateString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-800 shadow-md border border-gray-700 p-5 rounded-xl transition duration-300 hover:shadow-lg hover:border-gray-500">
      <h2 className="text-lg font-semibold text-white">👋 Welcome, {userName || 'Guest'}!</h2>
      <p className="text-sm text-gray-400 mt-1">Today is {today}</p>
    </div>
  );
};

export default Card;

