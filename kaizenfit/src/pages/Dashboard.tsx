import DashboardMain from "../components/DashboardMain"
import  SideBar  from "../components/SideBar"

export const Dashboard = () => {
    return(
        <div className="">
            <SideBar />
            <div className="">
                <DashboardMain />
            </div>
        </div>
    )
}