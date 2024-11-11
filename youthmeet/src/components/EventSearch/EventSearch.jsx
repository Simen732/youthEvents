

export default function EventSearch() {


    return (
        <div className="w-full flex flex-col items-center justify-center py-12">
            <input className="font-lato transition border-2 outline-none hover:border-slate-500 focus:border-slate-500 rounded-xl p-2 mt-2 w-2/3 max-w-[900px]" name="username" type="text" placeholder="Username" />
            <div className="flex max-sm:flex-col">
                <input className="font-lato transition border-2 outline-none hover:border-slate-500 focus:border-slate-500 rounded-xl p-2 mt-2 w-2/3"  type="date" name="" id="" placeholder={new Date().getFullYear()}/>
                <input className="font-lato transition border-2 outline-none hover:border-slate-500 focus:border-slate-500 rounded-xl p-2 mt-2 w-2/3"  type="text" name="" id="" placeholder="Area"/>
                <input className="font-lato transition border-2 outline-none hover:border-slate-500 focus:border-slate-500 rounded-xl p-2 mt-2 w-2/3"  type="text" name="" id="" placeholder="Tag"/>
            </div>
        </div>
    )
}