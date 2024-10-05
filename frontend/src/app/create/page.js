"use client";

import React, { useState } from 'react';

export default function EventCreationForm() {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requireApproval, setRequireApproval] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event created:', { eventName, startDate, startTime, endDate, endTime, location, description, requireApproval });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-4 p-2 bg-gray-800 text-white rounded"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Start</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="p-2 bg-gray-800 text-white rounded w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="time"
                className="p-2 bg-gray-800 text-white rounded w-full"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">End</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="p-2 bg-gray-800 text-white rounded w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="time"
                className="p-2 bg-gray-800 text-white rounded w-full"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <input
          className="w-full mb-4 p-2 bg-gray-800 text-white rounded"
          placeholder="Add Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
          placeholder="Add Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <div className="mb-4 p-4 bg-gray-800 rounded">
          <h3 className="font-semibold mb-2">Event Options</h3>
          <div className="flex justify-between items-center mb-2">
            <span>Tickets</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Require Approval</span>
            <input
              type="checkbox"
              checked={requireApproval}
              onChange={() => setRequireApproval(!requireApproval)}
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Capacity</span>
            <span>Unlimited</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
