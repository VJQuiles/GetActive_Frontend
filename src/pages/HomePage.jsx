import Navigation from "../components/home/Navbar"
import { useEffect, useState } from 'react'
import { getCoreExercises } from '../utils/getCoreExercises'
import Card from 'react-bootstrap/Card'

export default function HomePage() {
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getCoreExercises()
            .then(setExercises)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Loading…</p>
    if (error) return <p className="text-danger">{error.error ?? 'Failed to load exercises'}</p>


    return (
        <>
            <Navigation />
            <h2>Home Page</h2>
            <ul className="list-unstyled">
                {exercises.map((exercise) => (
                    <li key={exercise._id}>
                        <Card className="mb-2">{exercise.name}: {exercise.instructions}</Card>
                    </li>
                ))}
            </ul>
        </>
    )
}