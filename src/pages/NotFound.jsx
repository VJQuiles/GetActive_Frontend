import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <>
            <h1>404 - Woah the big empty</h1>
            <p>"The universe is a pretty big place. If it's just us, seems like an awful waste of space." - Carl Sagan</p>
            <Link to="/">Go back to where it doesn't feel so existential</Link>
        </>
    )
}