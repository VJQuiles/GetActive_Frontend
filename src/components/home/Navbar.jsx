import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/">GetActive</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/user/workouts">User</Nav.Link>
                        <Nav.Link href="/user/workouts/:workoutId">Workout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;