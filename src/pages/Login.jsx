import { useContext, useEffect, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/home/Navbar'
import UserContext from '../contexts/UserContext.jsx'

export default function Login() {
    const navigate = useNavigate()
    const { login, currentUser } = useContext(UserContext)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (currentUser) {
            navigate('/user/workouts', { replace: true })
        }
    }, [currentUser, navigate])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        try {
            setIsSubmitting(true)
            await login(formData)
            navigate('/user/workouts')
        } catch (submitError) {
            const message =
                submitError.response?.data?.error ??
                submitError.response?.data?.message ??
                'Login failed. Please try again.'
            setError(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="auth-page">
            <Navigation />
            <main className="auth-page__body d-flex justify-content-center align-items-center">
                <Card className="shadow-sm border-0 w-100" style={{ maxWidth: '420px' }}>
                    <Card.Body className="p-4">
                        <Card.Title className="mb-4 text-center">Welcome Back</Card.Title>
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error}
                            </Alert>
                        )}
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="loginEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    autoComplete="email"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="loginPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing In...' : 'Login'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </main>
        </div>
    )
}
