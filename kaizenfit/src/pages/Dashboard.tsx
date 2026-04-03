import DashboardMain from "../components/DashboardMain"
import  SideBar  from "../components/SideBar"

export const Dashboard = () => {
    return(
        <div className="flex h-screen w-full overflow-hidden">
            <SideBar />
            <div className="flex-1 min-w-0 basis-0 h-full overflow-y-auto">
                <DashboardMain />
            </div>
        </div>
    )
}