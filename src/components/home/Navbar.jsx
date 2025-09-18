import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext.jsx'

function Navigation() {
    const { currentUser, logout } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <Navbar bg="primary" data-bs-theme="dark" className="mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    GetActive
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/user/workouts">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user/workouts/:workoutId">
                        Workout
                    </Nav.Link>
                </Nav>
                <Nav className="gap-2 align-items-center">
                    {currentUser ? (
                        <Button variant="outline-light" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Button variant="light" size="sm" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation
