import EventBox from "../components/EventBox/EventBox"
import EventSearch from "../components/EventSearch/EventSearch"

export default function Events() {

    return (
        <div className="flex items-center flex-col mb-12 pt-16">
            <h1 className="text-8xl font-oranienbaum">Events</h1>
            <EventSearch />
            <div className="w-5/6 sm:mx-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <EventBox 
        event={{
            title: "DnD Meeting",
            dateTime: "2024-11-02T14:14:00",
            address: "Brendsrudveien 22, 1383 Asker",
            interested: 49,
            price: 0,
            imageUrl: "https://placehold.co/600x300"
        }}
        /><EventBox 
        event={{
            title: "DnD Meeting",
            dateTime: "2024-11-02T14:14:00",
            address: "Brendsrudveien 22, 1383 Asker",
            interested: 49,
            price: 0,
            imageUrl: "https://placehold.co/600x300"
        }}
        /><EventBox 
        event={{
            title: "DnD Meeting",
            dateTime: "2024-11-02T14:14:00",
            address: "Brendsrudveien 22, 1383 Asker",
            interested: 49,
            price: 0,
            imageUrl: "https://placehold.co/600x300"
        }}
        /><EventBox 
        event={{
            title: "DnD Meeting",
            dateTime: "2024-11-02T14:14:00",
            address: "Brendsrudveien 22, 1383 Asker",
            interested: 49,
            price: 0,
            imageUrl: "https://placehold.co/600x300"
        }}
        /><EventBox 
        event={{
            title: "DnD Meeting",
            dateTime: "2024-11-02T14:14:00",
            address: "Brendsrudveien 22, 1383 Asker",
            interested: 49,
            price: 0,
            imageUrl: "https://placehold.co/600x300"
        }}
/>
            </div>
        </div>
        
    )
}