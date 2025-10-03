import { Stack } from "react-bootstrap"
import ExerciseItem from "./ExerciseItem"
import PropTypes from "prop-types"

export default function ExerciseList({
    exercises,
    onDelete,
    onExerciseSelect,
    deletingId,

}) {
    return (
        <Stack gap={3}>
            {exercises.map((exercise) => (
                <ExerciseItem
                    key={exercise._id}
                    exercise={exercise}
                    onDelete={onDelete}
                    onExerciseSelect={onExerciseSelect}
                    isDeleting={deletingId === exercise._id}
                />
            ))}
        </Stack>
    )
}

ExerciseList.propTypes = {
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onExerciseSelect: PropTypes.func,
    deletingId: PropTypes.string,
}   