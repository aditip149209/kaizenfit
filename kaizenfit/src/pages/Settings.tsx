import SettingsMain from "../components/SettingsMain"
import SideBar from "../components/SideBar"

export const Settings = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <SettingsMain />
        </div>
    )
}
