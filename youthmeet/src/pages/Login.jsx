import { useState } from "react"
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = ((e) => {
        e.preventDefault();
        console.log(email);
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
            {
                email,
                password
            }, {withCredentials: true}).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log("error", error);
            })
    })

    return (
        <>
            
            <div className="flex flex-col items-center justify-center my-16 max-sm:my-16 ">
                <div className="flex flex-col items-center justify-center shadow-2xl rounded-3xl p-4 max-sm:w-full max-sm:rounded-none sm:p-16 max-sm:shadow-none">
                    <h1 className="font-poppins text-6xl">Hello</h1> 
                    <h3 className="font-poppins text-xl">Login</h3>
                    <form className="flex flex-col items-center justify-center children:p-2 *:*:flex max-sm:w-5/6 max-sm:*:w-full max-sm:*:*:*:w-full *:*:*:w-64" onSubmit={handleSubmit} action="">
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
                        
                        <button className="font-lato rounded-xl self-center m-4 bg-primary px-16 py-3" >Register User</button>
                    </form>
                </div>
               
            </div>
            
        </>
    )
}