import React, { useContext, useState } from 'react';
import { EventContext } from './EventContext';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const ViewEvent = () => {
    const { events, deleteEvent, setEvents } = useContext(EventContext);
    const { currentUser } = useContext(UserContext);
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [eventType, setEventType] = useState('');

    const userEvents = currentUser ? events.filter(event => {
        const matchesUser = event.userId === currentUser.id;
        const matchesLocation = location ? event.location.toLowerCase().includes(location.toLowerCase()) : true;
        const matchesDate = date ? new Date(event.date).toLocaleDateString() === new Date(date).toLocaleDateString() : true;
        const matchesType = eventType ? event.eventType === eventType : true;

        return matchesUser && matchesLocation && matchesDate && matchesType;
    }) : [];

    const handleDelete = (eventId) => {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents)); 
        alert('Event deleted successfully.'); // Alert message after deletion
    };

    const handleRSVP = (eventId) => {
        const updatedEvents = events.map(event => {
            if (event.id === eventId) {
                const rsvpList = event.rsvpList || [];
                if (currentUser && !rsvpList.includes(currentUser.id) && rsvpList.length < event.maxAttendees) {
                    alert(`RSVP successful for event: ${event.title}`);
                    return {
                        ...event,
                        rsvpList: [...rsvpList, currentUser.id] // Add user to RSVP list
                    };
                } else if (rsvpList.includes(currentUser.id)) {
                    alert('You have already RSVPed for this event.');
                } else if (rsvpList.length >= event.maxAttendees) {
                    alert('Sorry, the event has reached the maximum number of attendees.');
                }
            }
            return event;
        });

        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save updated events to localStorage
    };

    const handleReset = () => {
        setLocation('');
        setDate('');
        setEventType('');
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-950 text-center">Your Events</h1>

        {/* Search Filters */}
        <div className="mb-4 flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>
            <div className="flex-1">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>
            <div className="flex-1">
                <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                    <option value="">Select Event Type</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Meetup">Meetup</option>
                </select>
            </div>
            <div className="flex items-center justify-center md:w-auto">
                <button onClick={handleReset} className="bg-red-500 text-white rounded p-2">Reset</button>
            </div>
        </div>

        <div>
            <Link to={'/create-event'}>
                <button className='btn btn-info mb-2'>Add New Event</button>
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userEvents.length > 0 ? (
                userEvents.map((event) => (
                    <div key={event.id} className="bg-white border rounded-lg shadow-md p-4">
                        {event.image && (
                            <img src={event.image} alt="Event" className="w-full h-40 object-cover rounded mt-2" />
                        )}
                        <h2 className="text-xl font-semibold mb-2 mt-2">{event.title}</h2>
                        <p className="text-gray-700">{event.description}</p>
                        <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-gray-500">Location: {event.location}</p>
                        <p className="text-gray-500">Max Attendees: {event.maxAttendees}</p>
                        <button
                            type="button"
                            className="btn btn-primary me-2"
                            onClick={() => handleRSVP(event.id)}
                            disabled={!currentUser || event.rsvpList?.includes(currentUser.id) || (event.rsvpList?.length >= event.maxAttendees)}
                        >
                            {event.rsvpList?.includes(currentUser?.id) ? "RSVP'd" : "RSVP"}
                        </button>
                        <Link to={`/edit-event/${event.id}`}>
                            <button
                                type='button'
                                className='btn btn-info me-2'
                            >
                                Edit
                            </button>
                        </Link>
                        <button
                            type='button'
                            className='btn btn-danger'
                            onClick={() => handleDelete(event.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center">
                    {currentUser ? 'No events to display.' : 'Please log in to view your events.'}
                </p>
            )}
        </div>
    </div>
    );
};

export default ViewEvent;
