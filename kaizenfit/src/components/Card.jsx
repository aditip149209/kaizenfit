const Card = ({ title, value }) => {
    return (
      <div className="p-6 bg-card rounded-xl shadow-lg text-white">
        <h2 className="text-lg">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    );
  };
  
  export default Card;
  