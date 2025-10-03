import { Badge, Button, Card } from "react-bootstrap"
import PropTypes from "prop-types"

export default function CoreExerciseItem({ exercise, onAdd, isAdding }) {
    return (
        <Card className="shadow-sm border">
            <Card.Body className="d-flex justify-content-between align-items-start gap-3">
                <div>
                    <Card.Title className="h6 mb-1">{exercise.name}</Card.Title>
                    <Card.Text className="small mb-2">
                        {exercise.instructions}
                    </Card.Text>
                    <div className="mb-2 d-flex gap-2">
                        <Badge bg="secondary">{exercise.liftType}</Badge>
                        <Badge bg="secondary">{exercise.equipmentType}</Badge>
                    </div>
                </div>
                <Button
                    variant="outline-primary"
                    size="sm"
                    disabled={isAdding}
                    onClick={() => onAdd(exercise)}
                >
                    {isAdding ? "Adding..." : "Add"}
                </Button>
            </Card.Body>
        </Card>
    )
}

CoreExerciseItem.propTypes = {
    exercise: PropTypes.shape({
        name: PropTypes.string.isRequired,
        liftType: PropTypes.string.isRequired,
        equipmentType: PropTypes.string.isRequired,
        instructions: PropTypes.string.isRequired,
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
    isAdding: PropTypes.bool,
}

CoreExerciseItem.defaultProps = {
    isAdding: false,
}