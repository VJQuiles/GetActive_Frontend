import axios from 'axios'

const BASE_URL = import.meta.env.VITE_SERVER_ORIGIN ?? 'http://localhost:3000'

const client = axios.create({ baseURL: BASE_URL });

export async function getCoreExercises() {
    try {
        const { data } = await client.get('/open/core-exercises')
        return data; // array of exercises
    } catch (error) {
        console.error('Error fetching core exercises:', error)
        throw error.response?.data ?? error
    }
}
