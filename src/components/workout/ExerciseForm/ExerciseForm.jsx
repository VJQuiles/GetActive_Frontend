import { Button, Card, Col, Form, Row } from "react-bootstrap"
import PropTypes from "prop-types"

export default function ExerciseForm({
    formData,
    onChange,
    onSubmit,
    isCreating,
    liftTypes,
    equipmentTypes,
}) {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title className="h5 mb-3">Create custom exercise</Card.Title>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="customExerciseName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={formData.name}
                            onChange={onChange}
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
                            value={formData.instructions}
                            onChange={onChange}
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
                                    value={formData.liftType}
                                    onChange={onChange}
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
                                    value={formData.equipmentType}
                                    onChange={onChange}
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
                        disabled={isCreating}
                    >
                        {isCreating ? "Saving..." : "Add Exercise"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

ExerciseForm.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        instructions: PropTypes.string.isRequired,
        liftType: PropTypes.string.isRequired,
        equipmentType: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isCreating: PropTypes.bool,
    liftTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    equipmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

ExerciseForm.defaultProps = {
    isCreating: false,
}
