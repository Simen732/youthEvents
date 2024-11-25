import CreateEventTime from "../components/CreateEventTime/CreateEventTime";

export default function CreateEvent() {
    return(
        <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Event Details</h1>
      <CreateEventTime />
    </div>
    )
}