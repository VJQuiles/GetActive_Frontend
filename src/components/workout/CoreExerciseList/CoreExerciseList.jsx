import { useMemo } from "react"
import { Stack } from "react-bootstrap"
import CoreExerciseItem from "./CoreExerciseItem"
import PropTypes from "prop-types"

export default function CoreExerciseList({ exercises, onAdd, addingId }) {
    const groupedCoreExercises = useMemo(() => {
        return exercises.reduce((acc, core) => {
            const key = core.liftType ?? "Other"
            if (!acc[key]) acc[key] = []
            acc[key].push(core)
            return acc
        }, {})
    }, [exercises])

    return (
        <Stack gap={3}>
            {Object.entries(groupedCoreExercises).map(([liftType, items]) => (
                <div key={liftType}>
                    <h3 className="h6 text-uppercase text-muted">{liftType}</h3>
                    <Stack gap={2}>
                        {items.map((exercise) => (
                            <CoreExerciseItem
                                key={exercise._id}
                                exercise={exercise}
                                onAdd={onAdd}
                                isAdding={addingId === exercise._id}
                            />
                        ))}
                    </Stack>
                </div>
            ))}
        </Stack>
    )
}

CoreExerciseList.propTypes = {
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onAdd: PropTypes.func.isRequired,
    addingId: PropTypes.string,
}

CoreExerciseList.defaultProps = {
    addingId: null,
}