import { ethers } from 'ethers';
import PromptContract from "../../abi/Prompt.json";

const contractAddress = "0x9e8550203C66A2665b007a1f6Bcff1b25E148403"; // Replace with your contract address

// Initialize ethers provider and contract
const signer = typeof window !== 'undefined' ? window.ethereum.selectedAddress : null;
const aiOracleContract = new ethers.Contract(contractAddress, PromptContract, signer);

export const getRequest = async (requestId) => {
  return await aiOracleContract.methods.requests(requestId).call();
};

export const promptRequestEvent = (callback) => {
  aiOracleContract.events.promptRequest({ fromBlock: 0 }, (error, event) => {
    if (error) console.error(error);
    else callback(event);
  });
};

export const promptsUpdatedEvent = (callback) => {
  aiOracleContract.events.promptsUpdated({ fromBlock: 0 }, (error, event) => {
    if (error) console.error(error);
    else callback(event);
  });
};
