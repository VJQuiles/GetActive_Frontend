import { Form } from "react-bootstrap"
import PropTypes from "prop-types"

export default function WorkoutFilter({
    workoutTypes,
    currentType,
    onTypeChange,
}) {
    return (
        <Form className="mb-3">
            <Form.Group controlId="workoutFilter">
                <Form.Label className="text-muted small">Filter by type</Form.Label>
                <Form.Select
                    aria-label="Filter workouts by type"
                    value={currentType}
                    onChange={(e) => onTypeChange(e.target.value)}
                >
                    <option value="All">All Workouts</option>
                    {workoutTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    )
}

WorkoutFilter.propTypes = {
    workoutTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentType: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
}