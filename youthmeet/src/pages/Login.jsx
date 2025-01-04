import { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUsername } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
          { email, password },
          { withCredentials: true }
        ).then((response) => {
          console.log(response);
          setIsAuthenticated(true);
          setUsername(response.data.username); // Assuming the API returns the username
          navigate("/events");
          window.location.reload();
        }).catch((error) => {
          console.log("error", error);
        });
      };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
                <div className="text-center">
                    <h1 className="font-oranienbaum text-5xl text-primary">Welcome Back</h1>
                    <h3 className="mt-2 font-poppins text-xl text-gray-600">Login to your account</h3>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField label="Email" type="email" value={email} onChange={setEmail} />
                    <InputField label="Password" type="password" value={password} onChange={setPassword} />
                    
                    <button className="w-full py-3 font-lato text-white bg-primary rounded-lg hover:bg-primary-dark transition duration-300">
                        Log In
                    </button>
                </form>
                <p className="text-center font-lato text-sm">
                    Don't have an account yet? <a href="signup" className="text-primary hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    )
}

const InputField = ({ label, type, value, onChange }) => (
    <div>
        <label className="block font-lato text-sm font-medium text-gray-700" htmlFor={label.toLowerCase()}>
            {label}
        </label>
        <input
            className="w-full px-3 py-2 mt-1 font-lato text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            name={label.toLowerCase()}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        />
    </div>
)