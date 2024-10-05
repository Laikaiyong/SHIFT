import { ethers } from 'ethers';
import abi from '../../abi/EventHubManagement.json';

const contractAddress = "0xeBdF352B7A61Dc246D415D9A964C81c6522fF640";

// Initialize ethers provider and contract
const signer = ethereum.selectedAddress;
const contract = new ethers.Contract(contractAddress, abi, signer);

// Submit an event
async function submitEvent(name, startDateTime, endDateTime) {
    try {
        const tx = await contract.submitEvent(name, startDateTime, endDateTime);
        await tx.wait();
        console.log(`Event submitted: ${name}`);
    } catch (error) {
        console.error('Error submitting event:', error);
    }
}

// Approve an event
async function approveEvent(id) {
    try {
        const tx = await contract.approveEvent(id);
        await tx.wait();
        console.log(`Event with ID ${id} approved`);
    } catch (error) {
        console.error('Error approving event:', error);
    }
}

// Vote for an event
async function voteForEvent(eventId) {
    try {
        const tx = await contract.voteForEvent(eventId);
        await tx.wait();
        console.log(`Voted for event ID ${eventId}`);
    } catch (error) {
        console.error('Error voting for event:', error);
    }
}

// Get event details
async function getEvent(id) {
    try {
        const eventDetails = await contract.getEvent(id);
        console.log('Event Details:', eventDetails);
        return eventDetails; // Return event details for further use if needed
    } catch (error) {
        console.error('Error fetching event details:', error);
    }
}

// Get the total number of events
async function getEventCount() {
    try {
        const count = await contract.eventCount();
        console.log(`Total events count: ${count}`);
        return count; // Return count for further use if needed
    } catch (error) {
        console.error('Error fetching event count:', error);
    }
}

// Check if an address has voted
async function checkHasVoted(eventId, voterAddress) {
    try {
        const hasVoted = await contract.hasVoted(eventId, voterAddress);
        console.log(`Has voter ${voterAddress} voted for event ID ${eventId}?`, hasVoted);
        return hasVoted; // Return the result for further use if needed
    } catch (error) {
        console.error('Error checking voting status:', error);
    }
}

// Export the functions for use in your application
export {
    submitEvent,
    approveEvent,
    voteForEvent,
    getEvent,
    getEventCount,
    checkHasVoted,
};
