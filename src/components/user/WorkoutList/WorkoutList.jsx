import { Stack } from "react-bootstrap"
import WorkoutItem from "./WorkoutItem"

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