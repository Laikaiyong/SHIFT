"use client";

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function EventCreationForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);

    if (startHour >= 9 && endHour <= 17) {
      onOpen();
    } else {
      // Handle case when time is outside the 9-5 range
    }
    console.log('Event created:', { eventName, startDate, startTime, endDate, endTime, location, description, requireApproval });
  };

  return (
    <>
      <Modal className="my-auto mx-auto bg-white text-black" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Title</ModalHeader>
              <ModalBody>
                <p>The event time clashes with the main event. Are you sure you want to create the event?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                <Button className="bg-green-600" onPress={onClose}>Yes</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="max-w-2xl mx-auto mt-12 p-4 bg-white text-gray-900 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Create Event</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-4 p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-gray-700">Start</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="time"
                  className="p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded w-full"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">End</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded w-full"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <input
                  type="time"
                  className="p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded w-full"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <input
            className="w-full mb-4 p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded"
            placeholder="Add Event Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            className="w-full p-2 mb-4 bg-gray-100 text-gray-900 border border-gray-300 rounded"
            placeholder="Add Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />

          <div className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded">
            <h3 className="font-semibold mb-2 text-gray-700">Event Options</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Tickets</span>
              <span className="text-gray-900">Free</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Require Approval</span>
              <input
                type="checkbox"
                checked={requireApproval}
                onChange={() => setRequireApproval(!requireApproval)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Capacity</span>
              <span className="text-gray-900">Unlimited</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create Event
          </button>
        </form>
      </div>
    </>
  );
}
