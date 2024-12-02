import { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,
            { username, email, password, repeatPassword }
        ).then((response) => {
            console.log(response);
            navigate("/events")
        }).catch((error) => {
            console.log("error", error);
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
                <div className="text-center">
                    <h1 className="font-oranienbaum text-5xl text-primary">Hello</h1>
                    <h3 className="mt-2 font-poppins text-xl text-gray-600">Create a new user</h3>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField label="Username" type="text" value={username} onChange={setUsername} />
                    <InputField label="Email" type="email" value={email} onChange={setEmail} />
                    <InputField label="Password" type="password" value={password} onChange={setPassword} />
                    <InputField label="Repeat Password" type="password" value={repeatPassword} onChange={setRepeatPassword} />
                    
                    <button className="w-full py-3 font-lato text-white bg-primary rounded-lg hover:bg-primary-dark transition duration-300">
                        Register User
                    </button>
                </form>
                <p className="text-center font-lato text-sm">
                    Already have an account? <a href="login" className="text-primary hover:underline">Log In</a>
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