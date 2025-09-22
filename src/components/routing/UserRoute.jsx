import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import UserContext from '../../contexts/UserContext.jsx'

// User route to enable protection. Uses location to tell react what page route we are on
export default function UserRoute({ children }) {
    const { currentUser } = useContext(UserContext)
    const location = useLocation()

    if (!currentUser) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return children
}
