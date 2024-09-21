import React, { useContext } from 'react';
import { EventContext } from './EventContext';
import { UserContext } from '../UserContext';

const Home = () => {
    const { events } = useContext(EventContext);
    const { currentUser } = useContext(UserContext);

    // Debugging: Log events and current user
    console.log('Current User:', currentUser);
    console.log('Events:', events);

    // Filter upcoming events for the current user
    const upcomingEvents = currentUser
        ? events.filter(event => {
            const eventDate = new Date(event.date);
            const currentDate = new Date();
            return event.userId === currentUser.id && eventDate > currentDate;
        })
        : [];

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-gray-950 text-center">Upcoming Events</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                        <div key={event.title} className="bg-white border rounded-lg shadow-md p-4">
                             {event.image && (
                                <img src={event.image} alt="Event" className="w-full h-40 object-cover rounded mt-2" />
                            )}
                            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                            <p className="text-gray-700">{event.description}</p>
                            <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p className="text-gray-500">Location: {event.location}</p>
                            <p className="text-gray-500">Max Attendees: {event.maxAttendees}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">
                        {currentUser ? 'No upcoming events to display.' : 'Please log in to see your events.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;
