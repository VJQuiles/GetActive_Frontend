import { useEffect, useState } from "react"
import { Button, Card, Col, Form, Row, Spinner, Stack } from "react-bootstrap"
import { fetchUserWorkouts, createWorkout } from "../../utils/workouts"

const WORKOUT_TYPES = ["Full Body", "Upper", "Lower", "Push", "Pull", "Leg"]

export default function WorkoutDashboard({ onWorkoutSelect }) {
    const [workouts, setWorkouts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({ name: "", description: WORKOUT_TYPES[0] })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchUserWorkouts()
            .then(setWorkouts)
            .catch((fetchError) => setError(fetchError.error ?? fetchError.message ?? "Failed to load workouts."))
            .finally(() => setLoading(false))
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            setSaving(true)
            const newWorkout = await createWorkout(formData)
            setWorkouts((prev) => [newWorkout, ...prev])
            setFormData({ name: "", description: WORKOUT_TYPES[0] })
        } catch (submitError) {
            const message =
                submitError.response?.data?.error ??
                submitError.response?.data?.message ??
                submitError.error ??
                submitError.message ??
                "Unable to create workout."
            setError(message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <Row className="gy-4">
            <Col xs={12} lg={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className="h5">Create Workout</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="dashboardWorkoutName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Leg Day"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="dashboardWorkoutDescription">
                                <Form.Label>Type</Form.Label>
                                <Form.Select
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                >
                                    {WORKOUT_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {error && (
                                <p className="text-danger small mb-3">{error}</p>
                            )}
                            <Button type="submit" variant="primary" className="w-100" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Workout"
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} lg={8}>
                <Stack gap={3}>
                    <header>
                        <h2 className="h4 mb-1">Your Workouts</h2>
                        <p className="text-muted mb-0">View and manage the workouts you've created.</p>
                    </header>
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" role="status" />
                        </div>
                    ) : workouts.length === 0 ? (
                        <Card className="shadow-sm">
                            <Card.Body className="text-center text-muted">
                                You haven't added any workouts yet.
                            </Card.Body>
                        </Card>
                    ) : (
                        workouts.map((workout) => (
                            <Card key={workout._id} className="shadow-sm">
                                <Card.Body className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <Card.Title className="h5 mb-1">{workout.name}</Card.Title>
                                        <Card.Subtitle className="text-muted">
                                            {workout.description}
                                        </Card.Subtitle>
                                    </div>
                                    <Button variant="outline-primary" size="sm" onClick={() => onWorkoutSelect?.(workout)}>
                                        View
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Stack>
            </Col>
        </Row>
    )
}
