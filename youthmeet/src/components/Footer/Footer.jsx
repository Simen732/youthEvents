

export default function Footer() {

return(
    <div className="w-full bg-secondary bottom-0">
        <div>
            <h2 className="font-oranienbaum">YouthMeet</h2>
            <div>
                <p>Sign up for our <b>Newsletter</b></p>
                <div className="bg-primary rounded-xl flex w-56 justify-center items-center ">
                    <input className="rounded-md" type="text" />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <hr className="w-5/6"/>
        <div>
            <div>
                <h3><b>Find your way</b></h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signUp">Sign Up</a></li>
                </ul>
            </div>
        </div>

    </div>
)


}