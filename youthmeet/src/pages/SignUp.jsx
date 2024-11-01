import { useState } from "react"
import axios from "axios";

export default function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();

    const handleSubmit = ((e) => {
        e.preventDefault();
        console.log(email);
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/user`,
            {
                email,
                password, 
                repeatPassword
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log("error", error);
            })
    })

    return (
        <>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit} action="">
                <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}></input>
                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}></input>
                <input type="password" placeholder="Repeat password" onChange={(e) => {setRepeatPassword(e.target.value)}}></input>
                <button>Register User</button>
            </form>
        </>
    )
}