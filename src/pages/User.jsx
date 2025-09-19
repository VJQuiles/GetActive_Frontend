import Navigation from "../components/home/Navbar"
import WorkoutDashboard from "../components/user/WorkoutDashboard"
import { useNavigate } from "react-router-dom"

export default function User() {
    const navigate = useNavigate()

    const handleWorkoutSelect = (workout) => {
        if (!workout?._id) return
        navigate(`/user/workouts/${workout._id}`)
    }

    return (
        <div className="dashboard-page">
            <Navigation />
            <main className="dashboard-page__body container py-4">
                <WorkoutDashboard onWorkoutSelect={handleWorkoutSelect} />
            </main>
        </div>
    )
}
