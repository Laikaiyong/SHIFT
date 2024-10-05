import Web3 from "web3";
import BountyContractABI from '../../abi/BountyContract.json';

const contractAddress = "0x824c942238165f7F82BBb48FEEA4Ef597392824e"; // Replace with your actual contract address

// Initialize ethers provider and contract
const signer = ethereum.selectedAddress;
const contract = new web3.eth.Contract(BountyContractABI, contractAddress);

// Create a bounty
//Data Type
//title: string
//amount: int
export const createBounty = async (title, amount) => {
    try {
        const tx = await bountyContract.createBounty(title, amount);
        await tx.wait(); // Wait for the transaction to be mined
        console.log(`Bounty "${title}" created with an amount of ${amount}`);
    } catch (error) {
        console.error('Error creating bounty:', error);
    }
};

// Claim a bounty by its ID
//Data Type
//id: int
export const claimBounty = async (id) => {
    try {
        const tx = await bountyContract.claimBounty(id);
        await tx.wait(); // Wait for the transaction to be mined
        console.log(`Bounty with ID ${id} claimed.`);
    } catch (error) {
        console.error('Error claiming bounty:', error);
    }
};

// Get details of a specific bounty by its ID
//Data Type
//id: int
export const getBountyDetails = async (id) => {
    try {
        const bounty = await bountyContract.bounties(id);
        console.log('Bounty Details:', bounty);
        return bounty; // Return bounty details if needed elsewhere
    } catch (error) {
        console.error('Error fetching bounty details:', error);
    }
};

// Get the total number of bounties
export const getBountyCount = async () => {
    try {
        const count = await bountyContract.bountyCount();
        console.log(`Total number of bounties: ${count}`);
        return count;
    } catch (error) {
        console.error('Error fetching bounty count:', error);
    }
};

// Event listener for BountyCreated
export const listenForBountyCreated = () => {
    bountyContract.on('BountyCreated', (id, title, amount, creator) => {
        console.log(`New bounty created: ID=${id}, Title="${title}", Amount=${amount}, Creator=${creator}`);
    });
};

// Event listener for BountyClaimed
export const listenForBountyClaimed = () => {
    bountyContract.on('BountyClaimed', (id, claimedBy) => {
        console.log(`Bounty claimed: ID=${id}, Claimed by=${claimedBy}`);
    });
};
