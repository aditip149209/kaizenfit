import NutritionSection from "../components/NutritionSection"
import  SideBar  from "../components/SideBar"

export const Nutrition = () => {
    return(
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <NutritionSection />
        </div>
    )
}