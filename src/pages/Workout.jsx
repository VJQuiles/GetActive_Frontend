import { useParams } from "react-router-dom"
import Navigation from "../components/home/Navbar"
import ExerciseDashboard from "../components/workout/ExerciseDashboard"

export default function Workout() {
    const { workoutId } = useParams()

    return (
        <div className="dashboard-page">
            <Navigation />
            <main className="dashboard-page__body container py-4">
                <ExerciseDashboard workoutId={workoutId} />
            </main>
        </div>
    )
}
