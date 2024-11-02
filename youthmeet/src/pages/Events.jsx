import EventBox from "../components/EventBox/EventBox"
import EventSearch from "../components/EventSearch/EventSearch"

export default function Events() {

    return (
        <div className="flex items-center flex-col mb-12">
            <EventSearch />
            <div className="max-sm:mx-2 sm:mx-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                <EventBox />
            </div>
        </div>
    )
}