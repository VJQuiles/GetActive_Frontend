import Navigation from "../components/home/Navbar"
import { useEffect, useMemo, useState } from "react"
import { getCoreExercises } from "../utils/getCoreExercises"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import heroImage from "../assets/Hero-Image.jpg"

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

    const groupedExercises = useMemo(() => {
        return exercises.reduce((acc, exercise) => {
            const key = exercise.liftType ?? "Other"
            if (!acc[key]) acc[key] = []
            acc[key].push(exercise)
            return acc
        }, {})
    }, [exercises])

    return (
        <>
            <Navigation />
            <section
                className="home-hero d-flex align-items-center text-white text-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="home-hero__overlay">
                    <div className="container py-5">
                        <h1 className="display-5 fw-bold mb-3">Let's get better. One movement at a time.</h1>
                        <p className="lead mb-0">
                            Hello! The point of this application, aside from showcasing the ability to write programs, is to try and give the people around me a tool they use in their fitness. Its a way of getting some of the advice i like to give, even if I am not with you in the gym. You can also build your workouts and design your own exercises. And as I time goes, i plan to continue to provide the essential information you need to make the most efficient workouts FOR YOU. And with that, I'll leave this important reminder. It is always about being better than you were the day before. And that comes in many different ways. One thing i want to stress, is to balance grace and accountability. As long as you learn, strive to be better, and do, no matter how much or how little, that means you're headed in the right direction. Let's get active!
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-5 container">
                <header className="text-center mb-4">
                    <h2 className="mb-2">Core Exercises</h2>
                    <p className="text-muted mb-0">
                        Explore foundational movements you can add into any workout plan.
                    </p>
                </header>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error.error ?? "Failed to load exercises"}</p>
                ) : (
                    <Accordion alwaysOpen>
                        {Object.entries(groupedExercises).map(([liftType, items], index) => (
                            <Accordion.Item eventKey={String(index)} key={liftType}>
                                <Accordion.Header>{liftType}</Accordion.Header>
                                <Accordion.Body>
                                    <div className="row g-3">
                                        {items.map((exercise) => (
                                            <div className="col-12 col-md-6" key={exercise._id}>
                                                <Card className="h-100 shadow-sm text-start">
                                                    <Card.Body>
                                                        <Card.Title className="h5 mb-2">{exercise.name}</Card.Title>
                                                        <Card.Subtitle className="text-muted mb-2">
                                                            {exercise.equipmentType}
                                                        </Card.Subtitle>
                                                        <Card.Text className="mb-0">{exercise.instructions}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                )}
            </section>
        </>
    )
}
