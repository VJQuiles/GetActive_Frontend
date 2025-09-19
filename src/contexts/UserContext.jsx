import { createContext, useMemo, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_SERVER_ORIGIN ?? 'http://localhost:3000'

const UserContext = createContext({
    currentUser: null,
    login: () => Promise.resolve(),
    logout: () => { },
})

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const stored = localStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    });

    const login = async (credentials) => {
        const { data } = await axios.post(`${API_BASE}/api/users/login`, credentials, {
            headers: { 'Content-Type': 'application/json' },
        })

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setCurrentUser(data.user)
        return data.user
    };

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setCurrentUser(null)
    };

    const value = useMemo(() => ({ currentUser, login, logout }), [currentUser])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext
