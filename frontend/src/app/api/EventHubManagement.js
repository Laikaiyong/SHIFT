import abi from "../../abi/EventHubManagement.json";
import Web3 from "web3";

let web3;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window?.ethereum);
} else {
  // Handle the case when window or window.ethereum is not defined
  web3 = new Web3();
}

const contractAddress = "0xeBdF352B7A61Dc246D415D9A964C81c6522fF640";
const signer = typeof window !== 'undefined' ? window.ethereum.selectedAddress : null;
const contract = new web3.eth.Contract(abi, contractAddress);

// Ensure user is connected to MetaMask
const ensureMetaMaskConnection = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    await window?.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    throw new Error('MetaMask is not available.');
  }
};

// Submit an event
export const submitEvent = async (name, startDateTime, endDateTime) => {
  try {
    await ensureMetaMaskConnection();
    const tx = await contract.methods.submitEvent(name, startDateTime, endDateTime).send({ from: signer });
    console.log('Event submitted successfully:', tx);
  } catch (error) {
    console.error('Error submitting event:', error);
  }
};

// Approve an event
export const approveEvent = async (id) => {
  try {
    await ensureMetaMaskConnection();
    const tx = await contract.methods.approveEvent(id).send({ from: signer });
    console.log('Event approved successfully:', tx);
  } catch (error) {
    console.error('Error approving event:', error);
  }
};

// Vote for an event
export const voteForEvent = async (eventId) => {
  try {
    await ensureMetaMaskConnection();
    const tx = await contract.methods.voteForEvent(eventId).send({ from: signer });
    console.log('Vote successful:', tx);
  } catch (error) {
    console.error('Error submitting vote:', error);
  }
};

// Get event details
export const getEvent = async (id) => {
  try {
    await ensureMetaMaskConnection();
    const eventDetails = await contract.methods.getEvent(id).call();
    console.log('Event details:', eventDetails);
  } catch (error) {
    console.error('Error fetching event details:', error);
  }
};

// Get the total number of events
export const getEventCount = async () => {
  try {
    await ensureMetaMaskConnection();
    const count = await contract.methods.eventCount().call();
    console.log('Total event count:', count);
  } catch (error) {
    console.error('Error fetching event count:', error);
  }
};

// Check if an address has voted
export const checkHasVoted = async (eventId, voterAddress) => {
  try {
    await ensureMetaMaskConnection();
    const hasVoted = await contract.methods.hasVoted(eventId, voterAddress).call();
    console.log('Has voted:', hasVoted);
  } catch (error) {
    console.error('Error checking vote status:', error);
  }
};
