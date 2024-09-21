import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from './EventContext';

const EditEvent = () => {
  const { id } = useParams();
  const { events, updateEvent } = useContext(EventContext);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
      title: '',
      description: '',
      date: '',
      location: '',
      maxAttendees: '',
      eventType: '',
      image: null,
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
      const eventToEdit = events.find(event => event.id === id);
      if (eventToEdit) {
          setEventData(eventToEdit);
          setImagePreview(eventToEdit.image);
      }
  }, [events, id]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setEventData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setEventData(prevData => ({ ...prevData, image: file }));
          const reader = new FileReader();
          reader.onloadend = () => setImagePreview(reader.result);
          reader.readAsDataURL(file);
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const updatedEvent = { ...eventData, id };
      if (eventData.image) {
          updatedEvent.image = imagePreview;
      }
      updateEvent(updatedEvent);
      navigate('/view-event');
  };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-950 text-center">Edit Event</h1>
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
                        Update Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;
