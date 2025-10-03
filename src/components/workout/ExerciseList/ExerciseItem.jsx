import { Badge, Button, Card } from "react-bootstrap"
import PropTypes from "prop-types"

export default function ExerciseItem({
    exercise,
    onDelete,
    onExerciseSelect,
    isDeleting,
}) {
    return (
        <Card className="shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-start gap-3">
                <div>
                    <Card.Title className="h5 mb-1">{exercise.name}</Card.Title>
                    <div className="mb-2 d-flex gap-2">
                        <Badge bg="secondary">{exercise.liftType}</Badge>
                        <Badge bg="secondary">{exercise.equipmentType}</Badge>
                    </div>
                    <Card.Text className="mb-0 small">
                        {exercise.instructions}
                    </Card.Text>
                </div>
                <div className="d-flex flex-column gap-2 align-items-end">
                    {onExerciseSelect && (
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => onExerciseSelect(exercise)}
                        >
                            View
                        </Button>
                    )}
                    <Button
                        variant="outline-danger"
                        size="sm"
                        disabled={isDeleting}
                        onClick={() => onDelete(exercise._id)}
                    >
                        {isDeleting ? "Removing..." : "Delete"}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

ExerciseItem.propTypes = {
    exercise: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        liftType: PropTypes.string.isRequired,
        equipmentType: PropTypes.string.isRequired,
        instructions: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onExerciseSelect: PropTypes.func,
    isDeleting: PropTypes.bool,
}

ExerciseItem.defaultProps = {
    isDeleting: false,
}