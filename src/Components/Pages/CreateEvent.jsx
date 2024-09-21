import React, { useContext, useState } from 'react';
import { EventContext } from './EventContext';
import { UserContext } from '../UserContext';
import { v4 as uuidv4 } from 'uuid'; 

const CreateEvent = () => {
    const { addEvent } = useContext(EventContext);
    const { currentUser } = useContext(UserContext);
    const [eventData, setEventData] = useState({
        id: '', 
        title: '',
        description: '',
        date: '',
        location: '',
        maxAttendees: '0',
        eventType: '',
        image: '',
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData(prev => ({
                    ...prev,
                    image: reader.result,
                }));
                setImagePreview(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Determine the status based on the event date
        const eventDate = new Date(eventData.date);
        const currentDate = new Date();

        let status = '';
        if (eventDate < currentDate) {
            status = 'Completed'; // Past date
        } else if (eventDate.toDateString() === currentDate.toDateString()) {
            status = 'Ongoing'; // Today's date
        } else {
            status = 'Upcoming'; // Future date
        }

        const newEventData = { 
            ...eventData, 
            id: uuidv4(), // Generate a unique ID
            userId: currentUser.id, 
            status 
        };

        addEvent(newEventData);

        // Clear form and reset image and preview
        setEventData({
            id: '', // Reset id
            title: '',
            description: '',
            date: '',
            location: '',
            maxAttendees: '',
            eventType: '',
            image: '',
        });
        setImagePreview(null);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-950 text-center">Create Event</h1>
            <div className="bg-gray-100 max-w-3xl mx-auto mt-2 p-5 border rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-800">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={eventData.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800">Description:</label>
                        <textarea
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex mb-4 space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-800">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-800">Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={eventData.location}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex mb-4 space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-800">Max Attendees:</label>
                            <input
                                type="number"
                                name="maxAttendees"
                                value={eventData.maxAttendees}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                min="0" 
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-800">Event Type:</label>
                            <select
                                name="eventType"
                                value={eventData.eventType}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            >
                                <option value="">Select Event Type</option>
                                <option value="Conference">Conference</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Webinar">Webinar</option>
                                <option value="Meetup">Meetup</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800">Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    {imagePreview && (
                        <div className="mb-4">
                            <h2 className="text-gray-800">Image Preview:</h2>
                            <img
                                src={imagePreview}
                                alt="Event"
                                className="w-50 h-50 object-cover rounded mt-2"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
