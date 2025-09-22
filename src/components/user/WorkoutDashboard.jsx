import { useEffect, useState } from "react"
import { Button, Card, Col, Form, Row, Spinner, Stack } from "react-bootstrap"
import { fetchUserWorkouts, createWorkout, deleteWorkout } from "../../utils/workoutCalls"

// Array for workout types, just like in the backend(enum in the model type, but the variable for it is an array). This is to help adding workout types easier in the drop down. 
const workoutTypes = ["Full Body", "Upper", "Lower", "Push", "Pull", "Leg"]

// Really should have split this up, But this is the dashboard component for the workout page. 
export default function WorkoutDashboard({ onWorkoutSelect }) {
    // Here we set the state for workouts, and the error and loading states that are needed for api calls. 
    // We also set state for for the workout form, saving the workout, and deleting the workout.  
    const [workouts, setWorkouts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({ name: "", description: workoutTypes[0] })
    const [saving, setSaving] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    // Here we fetch the workouts and set them leveraging functions from out utils folder. We also handle error and set the loading state while the data is being retrieved. 
    useEffect(() => {
        fetchUserWorkouts()
            .then(setWorkouts)
            .catch((fetchError) => setError(fetchError.error ?? fetchError.message ?? "Failed to load workouts."))
            .finally(() => setLoading(false))
    }, [])

    // Function to handle input changes for the workout form. Takes the values put in via event.target, updates the form state, and dynamically sets the input values as the new values.
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Handles submit for new workout by preventing page reload, clearing existing errors, setting the save state to true while the request is ongoing, calls createWorkout with thte form data and adds the new workout if successful. Form fields are then cleared. If an error occurs, it is sent back, and the saving state is set to false when the request is comeplete. 
    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            setSaving(true)
            const newWorkout = await createWorkout(formData)
            setWorkouts((prev) => [newWorkout, ...prev])
            setFormData({ name: "", description: workoutTypes[0] })
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

    // Handles the delete button functionality by clearinf errors, setting the sdeleted item to the workoutID passed from params, and then a new map is created omitting the work out specified. Error messages are sent back if there are any, and then the deleting state is set back to false.
    const handleDelete = async (workoutId) => {
        setError(null)
        try {
            setDeletingId(workoutId)
            await deleteWorkout(workoutId)
            setWorkouts((prev) => prev.filter((workout) => workout._id !== workoutId))
        } catch (deleteError) {
            const message =
                deleteError.response?.data?.error ??
                deleteError.response?.data?.message ??
                deleteError.error ??
                deleteError.message ??
                "Unable to delete workout."
            setError(message)
        } finally {
            setDeletingId(null)
        }
    }

    // React Bootstrap used for styling
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
                                    {workoutTypes.map((type) => (
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
                        workouts.map((workout) => {
                            const isDeleting = deletingId === workout._id
                            return (
                                <Card key={workout._id} className="shadow-sm">
                                    <Card.Body className="d-flex justify-content-between align-items-start gap-3">
                                        <div>
                                            <Card.Title className="h5 mb-1">{workout.name}</Card.Title>
                                            <Card.Subtitle className="text-muted">
                                                {workout.description}
                                            </Card.Subtitle>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <Button variant="outline-primary" size="sm" onClick={() => onWorkoutSelect?.(workout)}>
                                                View
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                disabled={isDeleting}
                                                onClick={() => handleDelete(workout._id)}
                                            >
                                                {isDeleting ? "Removing..." : "Delete"}
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    )}
                </Stack>
            </Col>
        </Row>
    )
}

