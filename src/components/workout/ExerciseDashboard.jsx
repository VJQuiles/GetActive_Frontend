import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Col, Form, Row, Spinner, Stack, Badge } from "react-bootstrap"
import { fetchWorkout } from "../../utils/workoutCalls"
import { fetchExercises, createExercise, deleteExercise } from "../../utils/exerciseCalls"
import { getCoreExercises } from "../../utils/getCoreExercises"

const liftTypes = ["Compound", "Accessory"]
const equipmentTypes = ["Barbell", "Dumbbell", "Machine"]

const initialCustomForm = {
    name: "",
    instructions: "",
    liftType: liftTypes[0],
    equipmentType: equipmentTypes[0],
}

export default function ExerciseDashboard({ workoutId }) {
    const navigate = useNavigate()
    const [workout, setWorkout] = useState(null)
    const [exercises, setExercises] = useState([])
    const [coreExercises, setCoreExercises] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [addingCoreId, setAddingCoreId] = useState(null)
    const [deletingExerciseId, setDeletingExerciseId] = useState(null)
    const [customForm, setCustomForm] = useState(initialCustomForm)
    const [creatingCustom, setCreatingCustom] = useState(false)

    useEffect(() => {
        if (!workoutId) {
            navigate("/user/workouts")
            return
        }

        async function loadData() {
            setLoading(true)
            setError(null)
            try {
                const [workoutData, exerciseData, coreData] = await Promise.all([
                    fetchWorkout(workoutId),
                    fetchExercises(workoutId),
                    getCoreExercises(),
                ])
                setWorkout(workoutData)
                setExercises(exerciseData)
                setCoreExercises(coreData)
            } catch (loadError) {
                const message =
                    loadError.response?.data?.error ??
                    loadError.response?.data?.message ??
                    loadError.error ??
                    loadError.message ??
                    "Unable to load workout data."
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [workoutId, navigate])

    const groupedCoreExercises = useMemo(() => {
        return coreExercises.reduce((acc, core) => {
            const key = core.liftType ?? "Other"
            if (!acc[key]) acc[key] = []
            acc[key].push(core)
            return acc
        }, {})
    }, [coreExercises])

    const handleAddCoreExercise = async (coreExercise) => {
        setError(null)
        try {
            setAddingCoreId(coreExercise._id)
            const newExercise = await createExercise(workoutId, {
                name: coreExercise.name,
                instructions: coreExercise.instructions,
                liftType: coreExercise.liftType,
                equipmentType: coreExercise.equipmentType,
            })
            setExercises((prev) => [newExercise, ...prev])
        } catch (addError) {
            const message =
                addError.response?.data?.error ??
                addError.response?.data?.message ??
                addError.error ??
                addError.message ??
                "Unable to add exercise."
            setError(message)
        } finally {
            setAddingCoreId(null)
        }
    }

    const handleCustomChange = (event) => {
        const { name, value } = event.target
        setCustomForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleCustomSubmit = async (event) => {
        event.preventDefault()
        setError(null)
        try {
            setCreatingCustom(true)
            const newExercise = await createExercise(workoutId, customForm)
            setExercises((prev) => [newExercise, ...prev])
            setCustomForm(initialCustomForm)
        } catch (createError) {
            const message =
                createError.response?.data?.error ??
                createError.response?.data?.message ??
                createError.error ??
                createError.message ??
                "Unable to create exercise."
            setError(message)
        } finally {
            setCreatingCustom(false)
        }
    }

    const handleDeleteExercise = async (exerciseId) => {
        setError(null)
        try {
            setDeletingExerciseId(exerciseId)
            await deleteExercise(workoutId, exerciseId)
            setExercises((prev) => prev.filter((exercise) => exercise._id !== exerciseId))
        } catch (deleteError) {
            const message =
                deleteError.response?.data?.error ??
                deleteError.response?.data?.message ??
                deleteError.error ??
                deleteError.message ??
                "Unable to delete exercise."
            setError(message)
        } finally {
            setDeletingExerciseId(null)
        }
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status" />
            </div>
        )
    }

    if (!workout) {
        return (
            <Card className="shadow-sm">
                <Card.Body className="text-center">
                    <p className="mb-3">Workout not found.</p>
                    <Button variant="primary" onClick={() => navigate("/user/workouts")}>Go back</Button>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Stack gap={4}>
            <Card className="shadow-sm">
                <Card.Body className="d-flex justify-content-between align-items-start flex-column flex-md-row gap-3">
                    <div>
                        <Card.Title className="h4 mb-1">{workout.name}</Card.Title>
                        <Card.Subtitle className="text-muted">{workout.description}</Card.Subtitle>
                    </div>
                    <Button variant="outline-secondary" size="sm" onClick={() => navigate("/user/workouts")}>Back to workouts</Button>
                </Card.Body>
            </Card>

            {error && (
                <Card bg="danger-subtle" text="danger" className="shadow-sm">
                    <Card.Body>{error}</Card.Body>
                </Card>
            )}

            <Row className="gy-4">
                <Col xs={12} xl={6}>
                    <Stack gap={3}>
                        <header>
                            <h2 className="h5 mb-1">Exercises in this workout</h2>
                            <p className="text-muted mb-0">Remove or review exercises assigned to this routine.</p>
                        </header>
                        {exercises.length === 0 ? (
                            <Card className="shadow-sm">
                                <Card.Body className="text-center text-muted">
                                    No exercises added yet.
                                </Card.Body>
                            </Card>
                        ) : (
                            exercises.map((exercise) => {
                                const isDeleting = deletingExerciseId === exercise._id
                                return (
                                    <Card key={exercise._id} className="shadow-sm">
                                        <Card.Body className="d-flex justify-content-between align-items-start gap-3">
                                            <div>
                                                <Card.Title className="h5 mb-1">{exercise.name}</Card.Title>
                                                <div className="mb-2 d-flex gap-2">
                                                    <Badge bg="secondary">{exercise.liftType}</Badge>
                                                    <Badge bg="secondary">{exercise.equipmentType}</Badge>
                                                </div>
                                                <Card.Text className="mb-0">
                                                    {exercise.instructions}
                                                </Card.Text>
                                            </div>
                                            <div className="d-flex flex-column gap-2 align-items-end">
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    disabled={isDeleting}
                                                    onClick={() => handleDeleteExercise(exercise._id)}
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
                <Col xs={12} xl={6}>
                    <Stack gap={4}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="h5 mb-3">Add a core exercise</Card.Title>
                                <Stack gap={3}>
                                    {Object.entries(groupedCoreExercises).map(([liftType, cores]) => (
                                        <div key={liftType}>
                                            <h3 className="h6 text-uppercase text-muted">{liftType}</h3>
                                            <Stack gap={2}>
                                                {cores.map((core) => {
                                                    const isAdding = addingCoreId === core._id
                                                    return (
                                                        <Card key={core._id} className="shadow-sm border">
                                                            <Card.Body>
                                                                <div className="d-flex justify-content-between align-items-start gap-3">
                                                                    <div>
                                                                        <Card.Title className="h6 mb-1">{core.name}</Card.Title>
                                                                        <Card.Text className="small mb-2">
                                                                            {core.instructions}
                                                                        </Card.Text>
                                                                        <div className="d-flex gap-2">
                                                                            <Badge bg="secondary">{core.liftType}</Badge>
                                                                            <Badge bg="secondary">{core.equipmentType}</Badge>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        variant="outline-primary"
                                                                        size="sm"
                                                                        disabled={isAdding}
                                                                        onClick={() => handleAddCoreExercise(core)}
                                                                    >
                                                                        {isAdding ? "Adding..." : "Add"}
                                                                    </Button>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    )
                                                })}
                                            </Stack>
                                        </div>
                                    ))}
                                </Stack>
                            </Card.Body>
                        </Card>

                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="h5 mb-3">Create custom exercise</Card.Title>
                                <Form onSubmit={handleCustomSubmit}>
                                    <Form.Group className="mb-3" controlId="customExerciseName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            name="name"
                                            value={customForm.name}
                                            onChange={handleCustomChange}
                                            placeholder="Paused Bench Press"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="customExerciseInstructions">
                                        <Form.Label>Instructions</Form.Label>
                                        <Form.Control
                                            name="instructions"
                                            as="textarea"
                                            rows={3}
                                            value={customForm.instructions}
                                            onChange={handleCustomChange}
                                            placeholder="Describe the movement cues..."
                                            required
                                        />
                                    </Form.Group>
                                    <Row className="g-3">
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="customExerciseLiftType">
                                                <Form.Label>Lift Type</Form.Label>
                                                <Form.Select
                                                    name="liftType"
                                                    value={customForm.liftType}
                                                    onChange={handleCustomChange}
                                                >
                                                    {liftTypes.map((type) => (
                                                        <option key={type} value={type}>
                                                            {type}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="customExerciseEquipmentType">
                                                <Form.Label>Equipment</Form.Label>
                                                <Form.Select
                                                    name="equipmentType"
                                                    value={customForm.equipmentType}
                                                    onChange={handleCustomChange}
                                                >
                                                    {equipmentTypes.map((type) => (
                                                        <option key={type} value={type}>
                                                            {type}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100 mt-3"
                                        disabled={creatingCustom}
                                    >
                                        {creatingCustom ? "Saving..." : "Add Exercise"}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Stack>
                </Col>
            </Row>
        </Stack>
    )
}
