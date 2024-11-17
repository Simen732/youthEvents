import "../Navbar/Navbar.css";
import UserAvatar from "../UserAvatar/UserAvatar";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 smooth-gradient backdrop-blur-sm">
      <div className="m-2 flex justify-between items-center">
        <a className="font-oranienbaum text-4xl text-white" href="/">YouthMeet</a>
        <div className="flex items-center space-x-4 text-white">
          <a href="/login" className="px-2 text-xl">Login</a>
          <a href="/signUp" className="px-2 text-xl">Sign Up</a>
          <a href="/userPage" className="flex items-center overflow-visible">
            <UserAvatar name="Lukasz Brzozowski" />
          </a>
        </div>
      </div>
    </nav>
  );
}