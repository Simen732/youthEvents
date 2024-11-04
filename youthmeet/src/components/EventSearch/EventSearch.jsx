

export default function EventSearch() {


    return (
        <div className="w-full flex-col items-center justify-center">
            <input className="w-2/3" type="text" placeholder="Search for event..."/>
            <div>
                <input type="date" name="" id="" placeholder={new Date().getFullYear()}/>
                <input type="text" name="" id="" placeholder=""/>
                <input type="text" name="" id="" placeholder=""/>
            </div>
        </div>
    )
}