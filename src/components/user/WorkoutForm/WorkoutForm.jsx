import { Col, Button, Card, Spinner, Form } from "react-bootstrap"

import PropTypes from "prop-types"

export default function WorkoutForm({
    formData,
    workoutTypes,
    onSubmit,
    onChange,
    saving,
    error,
}) {
    return (
        <Col xs={12} lg={4}>
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title className="h5">Create Workout</Card.Title>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="dashboardWorkoutName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                placeholder="Leg Day"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dashboardWorkoutDescription">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                            >
                                {workoutTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {error && <p className="text-danger small mb-3">{error}</p>}
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
    )
}

WorkoutForm.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    workoutTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired,
    error: PropTypes.string,
}