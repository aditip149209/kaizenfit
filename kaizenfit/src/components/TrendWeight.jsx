import React from "react";

const TrendCard = ({ label, value }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <h3 className="text-lg font-bold">{value} lbs</h3>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    );
  };
  
  const Trends = ({ trends }) => {
    return (
      <div className="flex justify-around mt-4">
        {trends.map((trend, index) => (
          <TrendCard key={index} label={trend.label} value={trend.value} />
        ))}
      </div>
    );
  };
  
  export default Trends;
  