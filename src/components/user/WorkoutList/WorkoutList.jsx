import Stack from "react-bootstrap/Stack"
import WorkoutItem from "./WorkoutItem"
import PropTypes from "prop-types"

export default function WorkoutList({
    workouts,
    onDelete,
    onWorkoutSelect,
    deletingId,
}) {
    return (
        <Stack gap={3}>
            {workouts.map((workout) => (
                <WorkoutItem
                    key={workout._id}
                    workout={workout}
                    onDelete={onDelete}
                    onWorkoutSelect={onWorkoutSelect}
                    isDeleting={deletingId === workout._id}
                />
            ))}
        </Stack>
    )
}

WorkoutList.propTypes = {
    workouts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onWorkoutSelect: PropTypes.func,
    deletingId: PropTypes.string,
}