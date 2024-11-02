import "../Navbar/Navbar.css"

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signUp">Sign Up</a></li>
            </ul>
        </nav>
    )
}