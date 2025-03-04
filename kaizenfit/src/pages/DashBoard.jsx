import Sidebar from "../components/Sidebar";
import NavbarDashboard from "../components/NavbarDashboard";
import DashboardGrid from "../components/DashboardGrid";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <NavbarDashboard />
        <DashboardGrid />
      </div>
    </div>
  );
};

export default Dashboard;
