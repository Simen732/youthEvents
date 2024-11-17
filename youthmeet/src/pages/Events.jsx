import EventBox from "../components/EventBox/EventBox"
import EventSearch from "../components/EventSearch/EventSearch"

export default function Events() {

    return (
        <div className="flex items-center flex-col mb-12 pt-16">
            <h1 className="text-8xl font-oranienbaum">Events</h1>
            <EventSearch />
            <div className="w-5/6 sm:mx-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <EventBox />
                <EventBox />
                <EventBox />
                <EventBox />
                <EventBox />
                <EventBox />
                <EventBox />
                <EventBox />
                <EventBox />
                <EventBox />
            </div>
        </div>
        
    )
}