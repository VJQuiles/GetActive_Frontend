import Navigation from "../components/home/Navbar"
import WorkoutDashboard from '../components/user/WorkoutDashboard'

export default function User() {
    return (
        <div className="dashboard-page">
            <Navigation />
            <main className="dashboard-page__body container py-4">
                <WorkoutDashboard />
            </main>
        </div>
    )
}
