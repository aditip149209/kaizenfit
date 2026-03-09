import DashboardMain from "../components/DashboardMain"
import  SideBar  from "../components/SideBar"

export const Dashboard = () => {
    return(
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <DashboardMain />
        </div>
    )
}