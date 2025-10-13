import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Col, Row, Spinner, Stack } from "react-bootstrap"
import { fetchWorkout } from "../../../utils/workoutCalls"
import { fetchExercises, createExercise, deleteExercise } from "../../../utils/exerciseCalls"
import { getCoreExercises } from "../../../utils/getCoreExercises"
import ExerciseList from "../ExerciseList/ExerciseList"
import CoreExerciseList from "../CoreExerciseList/CoreExerciseList"
import ExerciseFilter from "../ExerciseFilter/ExerciseFilter"
import ExerciseForm from "../ExerciseForm/ExerciseForm"


// Enums to help ease adding values to the drop down menus. Same setup as on the backend. 
const liftTypes = ["Compound", "Accessory"]
const equipmentTypes = ["Barbell", "Dumbbell", "Machine"]

const initialCustomForm = {
    name: "",
    instructions: "",
    liftType: liftTypes[0],
    equipmentType: equipmentTypes[0],
}

// Dashboard for exercises that attach to workouts. 
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
    const [liftTypeFilter, setLiftTypeFilter] = useState("All")

    // This function checks for a workout id, redirects if there isnt one. If there is, loading starts, and old errors are cleared. Workout details are fetched, along with its exercises, and any core exercises attached to it. If there is an error, the appropiate one is sent back, and then the loading is stopped. 
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

    // Function to handle addition of core exercises. Exisiting errors are cleared. addingCoreId state is then setto the exercise being added. createExercise called with workoutId and coreExercise details. If successful, the new exercise is prepended(for efficiency, prepending saves having to cycle through the list). Appropiate error is chosen and displayed. addingCOreId is then set to null.
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

    // Function to handle input changes for the exercise form. Takes the values put in via event.target, updates the form state, and dynamically sets the input values as the new values.
    const handleCustomChange = (event) => {
        const { name, value } = event.target
        setCustomForm((prev) => ({ ...prev, [name]: value }))
    }

    //
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

    const handleFilterChange = (newType) => {
        setLiftTypeFilter(newType)
    }

    const filteredExercises = exercises.filter(
        (exercise) =>
            liftTypeFilter === "All" || exercise.liftType === liftTypeFilter
    )

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
                            <h2 className="h5 mb-1">Current Exercises</h2>
                            <p className="text-muted mb-0">Exercises in this workout.</p>
                        </header>
                        <ExerciseFilter
                            liftTypes={liftTypes}
                            currentType={liftTypeFilter}
                            onTypeChange={handleFilterChange}
                        />
                        {filteredExercises.length === 0 ? (
                            <Card className="shadow-sm border-0">
                                <Card.Body className="text-center text-muted">No exercises added yet.</Card.Body>
                            </Card>
                        ) : (
                            <ExerciseList
                                exercises={filteredExercises}
                                onDelete={handleDeleteExercise}
                                deletingId={deletingExerciseId}
                            />
                        )}
                    </Stack>
                </Col>

                <Col xs={12} xl={6}>
                    <Stack gap={4}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="h5 mb-3">Add a core exercise</Card.Title>
                                <CoreExerciseList
                                    exercises={coreExercises}
                                    onAdd={handleAddCoreExercise}
                                    addingId={addingCoreId}
                                />
                            </Card.Body>
                        </Card>

                        <ExerciseForm
                            formData={customForm}
                            onChange={handleCustomChange}
                            onSubmit={handleCustomSubmit}
                            isCreating={creatingCustom}
                            liftTypes={liftTypes}
                            equipmentTypes={equipmentTypes}
                        />
                    </Stack>
                </Col>
            </Row>
        </Stack>
    )
}
