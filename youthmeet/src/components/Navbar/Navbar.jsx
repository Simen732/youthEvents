import "../Navbar/Navbar.css"
import UserAvatar from "../UserAvatar/UserAvatar"

export default function Navbar() {
    return (
        <nav>
            <ul className="flex justify-evenly *:text-2xl items-center">
                <li><a href="/userPage"><UserAvatar name="Lukasz Brzozowski"/></a></li>
                <li><a href="/">Home</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signUp">Sign Up</a></li>
            </ul>
        </nav>
    )
}