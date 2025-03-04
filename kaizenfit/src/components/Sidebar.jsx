const Sidebar = () => {
    return (
      <div className="w-20 h-screen bg-background text-primary flex flex-col items-center p-4 space-y-6">
        <div className="text-xl font-bold">⚡</div>
        <nav className="flex flex-col space-y-4">
          <button className="p-2 rounded-lg bg-card hover:bg-primary hover:text-black">🏠</button>
          <button className="p-2 rounded-lg bg-card hover:bg-primary hover:text-black">📊</button>
          <button className="p-2 rounded-lg bg-card hover:bg-primary hover:text-black">⚙️</button>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
  