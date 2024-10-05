import { ethers } from 'ethers';

import abi from "../../abi/EventHubManagement.json"

const contractAddress = "0xeBdF352B7A61Dc246D415D9A964C81c6522fF640";
const signer = ethereum.selectedAddress;
const contract = new ethers.Contract(contractAddress, abi, signer);

// Submit an event
//Data Type
//name: String
//startDateTime: unix timestamp
//endDat
async function submitEvent(name, startDateTime, endDateTime) {
    const tx = await contract.submitEvent(name, startDateTime, endDateTime);
    await tx.wait();
}

// Approve an event
async function approveEvent(id) {
    const tx = await contract.approveEvent(id);
    await tx.wait();
}

// Vote for an event
async function voteForEvent(eventId) {
    const tx = await contract.voteForEvent(eventId);
    await tx.wait();
}

// Get event details
async function getEvent(id) {
    const eventDetails = await contract.getEvent(id);
    console.log(eventDetails);
}

// Get the total number of events
async function getEventCount() {
    const count = await contract.eventCount();
    console.log(count);
}

// Check if an address has voted
async function checkHasVoted(eventId, voterAddress) {
    const hasVoted = await contract.hasVoted(eventId, voterAddress);
    console.log(hasVoted);
}
