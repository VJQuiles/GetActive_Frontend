import Navigation from "../components/home/Navbar"
import { useEffect, useState } from 'react'
import { getCoreExercises } from '../utils/getCoreExercises'
import Card from 'react-bootstrap/Card'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getCoreExercises()
            .then(setExercises)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-danger">{error.error ?? 'Failed to load exercises'}</p>

    return (
        <>
            <Navigation />
            <section className="py-4 text-center">
                <h2 className="mb-3">Welcome to GetActive</h2>
                <p className="text-muted mb-4">Start building your workouts by creating an account or logging back in.</p>
                <ButtonGroup>
                    <Button variant="primary" onClick={() => navigate('/register')}>
                        Create Account
                    </Button>
                    <Button variant="outline-primary" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </ButtonGroup>
            </section>
            <ul className="list-unstyled">
                {exercises.map((exercise) => (
                    <li key={exercise._id}>
                        <Card className="mb-2">
                            <Card.Body>
                                <Card.Title className="h5 mb-1">{exercise.name}</Card.Title>
                                <Card.Text className="mb-0">{exercise.instructions}</Card.Text>
                            </Card.Body>
                        </Card>
                    </li>
                ))}
            </ul>
        </>
    )
}
