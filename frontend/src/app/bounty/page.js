// app/bounties/page.js
"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Image from 'next/image';

const BountyCard = ({ logo, title, organization, type, deadline, applicants, reward, status }) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow">
    <Image src={logo} alt={organization} width={48} height={48} className="mr-4 rounded" />
    <div className="flex-grow">
      <h3 className="text-lg font-semibold">{title}</h3>
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
    deadline: "By March 2025    ",
    applicants: 10,
    reward: 300,
    status: 'active'
  }
];

export default function BountyPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
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

      <div className="space-y-4">
        {bounties.map((bounty, index) => (
          <BountyCard key={index} {...bounty} />
        ))}
      </div>
    </div>
  );
}   