import ProgramsMain from "../components/ProgramsMain"
import SideBar from "../components/SideBar"

export const Program = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <ProgramsMain />
        </div>
    )
}
