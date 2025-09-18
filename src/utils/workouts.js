import apiCall from './apiCalls'

export async function fetchUserWorkouts() {
    try {
        const { data } = await apiCall.get('/api/workouts/user-workouts')
        return data
    } catch (error) {
        console.error('Error fetching workouts:', error)
        throw error.response?.data ?? error
    }
}

export async function createWorkout(payload) {
    try {
        const { data } = await apiCall.post('/api/workouts/create-workout', payload)
        return data
    } catch (error) {
        console.error('Error creating workout:', error)
        throw error.response?.data ?? error
    }
}
