const Navbar = () => {
    return (
      <div className="w-full flex justify-between p-4 bg-background text-white">
        <input className="p-2 rounded-lg bg-card text-white" placeholder="Search..." />
        <div className="flex items-center space-x-4">
          <span>🔔</span>
          <span>👤</span>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  