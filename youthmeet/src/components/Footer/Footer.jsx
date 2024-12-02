

export default function Footer() {

    return(
        <div className="w-full bg-secondary bottom-0">
            <div className="flex max-sm:flex-col sm:flex-col md:flex-row justify-between p-4">
                <h2 className="font-oranienbaum text-6xl p-4">YouthMeet</h2>
                <div className="p-2">
                    <p className="font-poppins m-1">Sign up for our <b>Newsletter</b></p>
                    <form className="bg-white rounded-xl flex w-56 justify-center items-center self-end m-1" action="" method="POST">
                        <input name="newsletterMail" className=" text-zinc-500 rounded-md font-oranienbaum p-2 focus:outline-none focus:text-zinc-800 hover:text-zinc-800" type="text" placeholder="Enter your email" />
                        <button className="bg-white p-1 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex justify-center">
                <hr className="border-none w-5/6 bg-black p-[1px] "/>
            </div>
            <div className="flex max-sm:flex-col sm:flex-col md:flex-row">
                <div className="p-12 max-sm:p-8 sm:p-8">
                    <h3 className="font-oranienbaum text-2xl"><b>Find your way</b></h3>
                    <ul className="font-poppins">
                        <li><a href="/">Home</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signUp">Sign Up</a></li>
                        <li><a href="/createEvent">Create Event</a></li>
                    </ul>
                </div>
                <div className="p-12 max-sm:p-8 sm:p-8">
                    <h3 className="font-oranienbaum text-2xl"><b>Find your way</b></h3>
                    <ul className="font-poppins">
                        <li><a href="/">Home</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signUp">Sign Up</a></li>
                        <li><a href="/createEvent">Create Event</a></li>
                    </ul>
                </div>
                <div className="p-12 max-sm:p-8 sm:p-8">
                    <h3 className="font-oranienbaum text-2xl"><b>Find your way</b></h3>
                    <ul className="font-poppins">
                        <li><a href="/">Home</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signUp">Sign Up</a></li>
                        <li><a href="/createEvent">Create Event</a></li>
                    </ul>
                </div>
            </div>
            <p className="text-center my-8">&copy; YouthMeet {new Date().getFullYear()}. All rights reserved</p>
        </div>
    )


}