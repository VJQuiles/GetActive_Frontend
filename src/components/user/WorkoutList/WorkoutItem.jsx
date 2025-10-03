import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import PropTypes from "prop-types"


export default function WorkoutItem({
    workout,
    onWorkoutSelect,
    isDeleting,
    onDelete,
}) {
    return (
        <Card className="shadow-sm">
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
                        onClick={() => onDelete(workout._id)}
                    >
                        {isDeleting ? "Removing..." : "Delete"}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

WorkoutItem.propTypes = {
    workout: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    onWorkoutSelect: PropTypes.func,
    isDeleting: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
}