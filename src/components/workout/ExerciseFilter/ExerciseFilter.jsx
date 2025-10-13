import { Form } from "react-bootstrap"
import PropTypes from "prop-types"

export default function ExerciseFilter({
    liftTypes,
    currentType,
    onTypeChange,
}) {
    return (
        <Form className="mb-3">
            <Form.Group controlId="exerciseFilter">
                <Form.Label className="text-muted small">Filter by lift type</Form.Label>
                <Form.Select
                    aria-label="Filter exercises by lift type"
                    value={currentType}
                    onChange={(e) => onTypeChange(e.target.value)}
                >
                    <option value="All">All Lift Types</option>
                    {liftTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    )
}

ExerciseFilter.propTypes = {
    liftTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentType: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
}
