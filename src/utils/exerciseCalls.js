import apiCall from "./apiCalls"

export async function fetchExercises(workoutId) {
    try {
        const { data } = await apiCall.get(`/api/workouts/${workoutId}/exercises`)
        return data
    } catch (error) {
        console.error("Error fetching exercises:", error)
        throw error.response?.data ?? error
    }
}

export async function createExercise(workoutId, payload) {
    try {
        const { data } = await apiCall.post(`/api/workouts/${workoutId}/exercises`, payload)
        return data
    } catch (error) {
        console.error("Error creating exercise:", error)
        throw error.response?.data ?? error
    }
}

export async function deleteExercise(workoutId, exerciseId) {
    try {
        const { data } = await apiCall.delete(`/api/workouts/${workoutId}/exercises/${exerciseId}`)
        return data
    } catch (error) {
        console.error("Error deleting exercise:", error)
        throw error.response?.data ?? error
    }
}
