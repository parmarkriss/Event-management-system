import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../EventContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faImage } from '@fortawesome/free-solid-svg-icons';

const EditEvent = () => {
  const { id } = useParams();
  const { events, addEvent, updateEvent } = useContext(EventContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    if (id) {
      const event = events.find(event => event.id === id);
      if (event) {
        setFormData(event);
        setImagePreview(event.image || '');
      }
    }
  }, [id, events]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateEvent({ ...formData, id });
    } else {
      addEvent(formData);
    }
    alert("Event Successfully Updated");
    navigate('/view-event');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{id ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">Event Title</label>
          <input
            type="text"
            id="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="description" className="text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white flex-grow">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-2" />
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border-none rounded-md text-gray-800"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white flex-grow">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mr-2" />
            <input
              type="text"
              id="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border-none rounded-md text-gray-800"
            />
          </div>
        </div>
        <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
          <FontAwesomeIcon icon={faImage} className="text-gray-500 mr-2" />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border-none rounded-md text-gray-800"
          />
        </div>
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-auto my-4" />}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-1 flex-grow">
            <label htmlFor="maxAttendees" className="text-lg font-medium text-gray-700">Max Attendees</label>
            <input
              type="number"
              id="maxAttendees"
              placeholder="Max Attendees"
              value={formData.maxAttendees}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1 flex-grow">
            <label htmlFor="eventType" className="text-lg font-medium text-gray-700">Event Type</label>
            <select
              id="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Event Type</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Meetup">Meetup</option>
            </select>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          {id ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
