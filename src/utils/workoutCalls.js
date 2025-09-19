import apiCall from "./apiCalls"

export async function fetchUserWorkouts() {
    try {
        const { data } = await apiCall.get("/api/workouts/user-workouts")
        return data
    } catch (error) {
        console.error("Error fetching workouts:", error)
        throw error.response?.data ?? error
    }
}

export async function fetchWorkout(workoutId) {
    try {
        const { data } = await apiCall.get(`/api/workouts/user-workouts/${workoutId}`)
        return data
    } catch (error) {
        console.error("Error fetching workout:", error)
        throw error.response?.data ?? error
    }
}

export async function createWorkout(payload) {
    try {
        const { data } = await apiCall.post("/api/workouts/create-workout", payload)
        return data
    } catch (error) {
        console.error("Error creating workout:", error)
        throw error.response?.data ?? error
    }
}

export async function deleteWorkout(workoutId) {
    try {
        const { data } = await apiCall.delete(`/api/workouts/delete-workout/${workoutId}`)
        return data
    } catch (error) {
        console.error("Error deleting workout:", error)
        throw error.response?.data ?? error
    }
}
