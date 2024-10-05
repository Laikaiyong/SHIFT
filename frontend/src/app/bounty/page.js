"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Image from 'next/image';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

// Bounty Card Component
const BountyCard = ({ logo, title, organization, type, deadline, applicants, reward, status }) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow">
    <Image src={logo} alt={organization} width={48} height={48} className="mr-4 rounded" />
    <div className="flex-grow">
      <h3 className="text-black font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{organization}</p>
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <span className="mr-3">{type}</span>
        <span className="mr-3">{deadline}</span>
        <span className="mr-3">👤 {applicants}</span>
        <span className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
      </div>
    </div>
    {reward && (
      <div className="text-right">
        <span className="text-blue-600 font-semibold">{reward} USDC</span>
      </div>
    )}
    <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
      Apply Now
    </button>
  </div>
);

// Bounty Page Component
export default function BountyPage() {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Use useDisclosure for modal control
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        dueDate: '',
        bountyMoney: ''
  });

  const bounties = [
    {
      logo: "https://pbs.twimg.com/profile_images/1738526306437148672/Zdqy1l8f_400x400.jpg",
      title: "Improve ETHKL Website",
      organization: "Nic",
      type: "Project",
      deadline: "Due in 1d",
      applicants: 7,
      reward: 300,
      status: 'active'
    },
    {
      logo: "https://pbs.twimg.com/profile_images/1738526306437148672/Zdqy1l8f_400x400.jpg",
      title: "Organize ETHKL 2025",
      organization: "Teck Yuan",
      type: "Project",
      deadline: "Due in 1month",
      applicants: 7,
      reward: 2000,
      status: 'active'
    },
    {
      logo: "https://pbs.twimg.com/profile_images/1738526306437148672/Zdqy1l8f_400x400.jpg",
      title: "Design ETHKL Meetup Poster",
      organization: "Harith",
      type: "Bounty",
      deadline: "Due in 6d",
      applicants: 7,
      reward: 50,
      status: 'active'
    },
    {
      logo: "https://pbs.twimg.com/profile_images/1738526306437148672/Zdqy1l8f_400x400.jpg",
      title: "Organize ETHKL Meetup",
      organization: "Kim",
      type: "Project",
      deadline: "By March 2025",
      applicants: 10,
      reward: 300,
      status: 'active'
    }
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log(formData);
    // Reset form and close modal
    setFormData({
      title: '',
      name: '',
      dueDate: '',
      bountyMoney: ''
    });
    onClose(); // Close modal
  };

  return (
    <>
      {/* Modal for Creating Bounty */}
      <Modal className="bg-white my-auto mx-auto text-black" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              {/* Modal Header */}
              <ModalHeader className="flex flex-col gap-1">Create Bounty</ModalHeader>

              {/* Modal Body with form */}
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="title">Title</label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Bounty Title"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="name">Name</label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="Description">Description</label>
                    <Input
                      type="text"
                      id="Description"
                      name="Description"
                      value={formData.desc}
                      onChange={handleChange}
                      placeholder="Bounty Desc"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="dueDate">Due Date</label>
                    <Input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="bountyMoney">Bounty Money (USDC)</label>
                    <Input
                      type="number"
                      id="bountyMoney"
                      name="bountyMoney"
                      value={formData.bountyMoney}
                      onChange={handleChange}
                      placeholder="Amount"
                    />
                  </div>
                </form>
                
                
                <p className="mt-4">There will be no turning back once this is created</p>
              </ModalBody>

              {/* Modal Footer with actions */}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-[#166434]" onPress={handleSubmit}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center text-black">
            <span className="mr-2">💼</span> ETH KL Bounties
          </h1>
          <button className="text-blue-600 hover:underline">View All</button>
        </div>

        <div className="my-4 relative">
          <Input 
            type="text" 
            placeholder="Search bounties..." 
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Create Bounty Button */}
        <button 
          onClick={onOpen}  // Open the modal using onOpen from useDisclosure
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Create Bounty
        </button>

        {/* Bounty Cards */}
        <div className="space-y-4">
          {bounties.map((bounty, index) => (
            <BountyCard key={index} {...bounty} />
          ))}
        </div>
      </div>
    </>
  );
}
