import abi from "../../abi/EventHubManagement.json"
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

// Submit an event
//Data Type
//name: String
//startDateTime: unix timestamp
//endDateTime: unix Timestamp
export const submitEvent = async(name, startDateTime, endDateTime) => {
    const tx = await contract.methods.submitEvent(name, startDateTime, endDateTime);
    await tx.wait();
}

// Approve an event
//Data Type
//id: int
export const approveEvent = async(id) => {
    const tx = await contract.approveEvent(id);
    await tx.wait();
}

// Vote for an event
//Data Type
//id: int
export const voteForEvent = async (eventId) => {
    try {
        // Ensure the user is connected with MetaMask and authorized
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            await window?.ethereum.request({ method: "eth_requestAccounts" });
        } else {
            throw new Error('MetaMask is not available.');
        }

        // Sending the transaction to MetaMask and waiting for confirmation
        const tx = await contract.methods.voteForEvent(eventId).send({ from: signer });

        // Log the transaction receipt after the transaction has been confirmed
        console.log('Transaction successful:', tx);
    } catch (error) {
        console.error('Error submitting vote:', error);
    }
};

// Get event details
//Data Type
//id: int
export const getEvent = async(id) => {
    const eventDetails = await contract.getEvent(id);
    console.log(eventDetails);
}

// Get the total number of events
export const getEventCount = async() => {
    const count = await contract.eventCount();
    console.log(count);
}

// Check if an address has voted
//Data Type
//id: int
//voterAddress: address
export const checkHasVoted = async(eventId, voterAddress)=> {
    const hasVoted = await contract.hasVoted(eventId, voterAddress);
    console.log(hasVoted);
}
