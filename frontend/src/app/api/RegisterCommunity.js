import abi from "../../abi/RegisterCommunity.json";  // replace with your contract's ABI
import Web3 from "web3";

// Initialize Web3
let web3;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window?.ethereum);
} else {
  web3 = new Web3(); // Fallback for Web3 if window.ethereum is not available
}

const contractAddress = "0x37bEFb162cBacbe012f86c4f4BcDa67Ae31F584F";  // replace with your contract's address
const signer = typeof window !== 'undefined' ? window.ethereum.selectedAddress : null;
const contract = new web3.eth.Contract(abi, contractAddress);

// Ensure MetaMask connection
const ensureMetaMaskConnection = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    await window?.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    throw new Error('MetaMask is not available.');
  }
};

// Register a community
export const registerCommunity = async (name, location) => {
  try {
    await ensureMetaMaskConnection();
    const tx = await contract.methods.registerCommunity(name, location).send({ from: signer });
    console.log('Community registered successfully:', tx);
  } catch (error) {
    console.error('Error registering community:', error);
  }
};

// Add a member to a community
export const addMember = async (communityId) => {
  try {
    await ensureMetaMaskConnection();
    const tx = await contract.methods.addMember(communityId).send({ from: signer });
    console.log('Member added successfully:', tx);
  } catch (error) {
    console.error('Error adding member:', error);
  }
};

// Update the reputation score of a community
export const updateReputationScore = async (communityId, change) => {
  try {
    await ensureMetaMaskConnection();
    const tx = await contract.methods.updateReputationScore(communityId, change).send({ from: signer });
    console.log('Reputation updated successfully:', tx);
  } catch (error) {
    console.error('Error updating reputation score:', error);
  }
};

// Get community details by ID
export const getCommunity = async (communityId) => {
  try {
    await ensureMetaMaskConnection();
    const communityDetails = await contract.methods.getCommunity(communityId).call();
    console.log('Community details:', communityDetails);
    return communityDetails;
  } catch (error) {
    console.error('Error fetching community details:', error);
  }
};

// Get the total number of communities
export const getCommunityCount = async () => {
  try {
    await ensureMetaMaskConnection();
    const count = await contract.methods.communityCount().call();
    console.log('Total community count:', count);
    return count;
  } catch (error) {
    console.error('Error fetching community count:', error);
  }
};

// Example additional utility: Check if a user has voted (if required for your use case)
export const hasVoted = async (communityId, voterAddress) => {
  try {
    await ensureMetaMaskConnection();
    const hasVoted = await contract.methods.hasVoted(communityId, voterAddress).call();
    console.log('Has voted:', hasVoted);
    return hasVoted;
  } catch (error) {
    console.error('Error checking vote status:', error);
  }
};
