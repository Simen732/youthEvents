import "../Navbar/Navbar.css"
import UserAvatar from "../UserAvatar/UserAvatar"

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 smooth-gradient">
            <div className="m-2 flex justify-between *:text-2xl items-center">
                <div><a href="/userPage"><UserAvatar name="Lukasz Brzozowski"/></a></div>
                <div className="flex justify-between *:px-4 *:text-white">
                    <div><a href="/">Home</a></div>
                    <div><a href="/login">Login</a></div>
                    <div><a href="/signUp">Sign Up</a></div>
                </div>
            </div>
        </nav>
    )
}