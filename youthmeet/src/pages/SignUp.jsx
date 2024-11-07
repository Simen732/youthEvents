import { useState } from "react"
import axios from "axios";

export default function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();

    const handleSubmit = ((e) => {
        e.preventDefault();
        console.log(email);
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/user`,
            {
                username,
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
            
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center shadow-2xl rounded-3xl p-4 max-sm:w-full max-sm:rounded-none sm:p-16">
                    <h1 className="font-poppins text-6xl">Hello</h1> 
                    <h3 className="font-poppins text-xl">Create a new user</h3>
                    <form className="flex flex-col items-center justify-center children:p-2 *:*:flex max-sm:w-5/6 max-sm:*:w-full max-sm:*:*:*:w-full" onSubmit={handleSubmit} action="">
                        <div>
                            <label className="font-lato" htmlFor="username">Your Username</label>
                            <div>
                                <input className="w- font-lato transition border-2 outline-none hover:border-slate-500 focus:border-slate-500 rounded-xl p-2 mt-2" name="username" type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}></input> 
                            </div>
                        </div>
                        <div>
                            <label className="font-lato" htmlFor="email">Your Email</label>
                            <div>
                                <input className="font-lato transition border-2 outline-none hover:border-slate-500 focus:border-slate-500 rounded-xl p-2 mt-2" name="email" type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}></input>
                            </div>
                        </div>
                        <div>
                            <label className="font-lato" htmlFor="password">Your Password</label>
                            <div>
                                <input className="font-lato transition border-2 outline-none hover:border-slate-500 focus:border-slate-500 rounded-xl p-2 mt-2" name="password" type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}></input>
                            </div>
                        </div>
                        <div>
                            <label className="font-lato" htmlFor="repeatPassword">Retype Password</label>
                            <div>
                                <input className="font-lato transition border-2 outline-none hover:border-slate-500 focus:border-slate-500 rounded-xl p-2 mt-2" name="repeatPassword" type="password" placeholder="Repeat password" onChange={(e) => {setRepeatPassword(e.target.value)}}></input>
                            </div>
                        </div>
                        
                        <button className="font-lato rounded-xl self-center m-4 bg-primary px-12 py-3" >Register User</button>
                    </form>
                </div>
               
            </div>
            
        </>
    )
}