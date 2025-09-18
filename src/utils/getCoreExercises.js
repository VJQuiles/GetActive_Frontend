// frontend/src/utils/getCoreExercises.js
import apiClient from './apiCalls';

export async function getCoreExercises() {
    try {
        const { data } = await apiClient.get('/open/core-exercises');
        return data
    } catch (error) {
        console.error('Error fetching core exercises:', error);
        throw error.response?.data ?? error;
    }
}
