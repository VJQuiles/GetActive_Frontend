import { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import Navigation from '../components/home/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_SERVER_ORIGIN ?? 'http://localhost:3000'

export default function Register() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            setIsSubmitting(true)
            const { confirmPassword, ...payload } = formData
            await axios.post(`${API_BASE}/api/users/register`, payload, {
                headers: { 'Content-Type': 'application/json' },
            })
            navigate('/login')
        } catch (submitError) {
            const message =
                submitError.response?.data?.error ??
                submitError.response?.data?.message ??
                'Registration failed. Please try again.'
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
                        <Card.Title className="mb-4 text-center">Create Account</Card.Title>
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error}
                            </Alert>
                        )}
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="registerUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    autoComplete="username"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="registerEmail">
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
                            <Form.Group className="mb-3" controlId="registerPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="registerConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    autoComplete="new-password"
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
                                {isSubmitting ? 'Creating Account...' : 'Register'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </main>
        </div>
    )
}
