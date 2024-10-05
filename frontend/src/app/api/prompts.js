import { ethers } from 'ethers';
import PromptContract from "../../abi/Prompt.json";

const contractAddress = "0x9e8550203C66A2665b007a1f6Bcff1b25E148403"; // Replace with your contract address

// Initialize ethers provider and contract
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const aiOracleContract = new ethers.Contract(contractAddress, PromptContract, signer);

export const getPrompt = async (requestId) => {
  return await aiOracleContract.methods.prompts(requestId).call();
};

export const getAIResult = async (modelId) => {
  return await aiOracleContract.methods.getAIResult(modelId).call();
};

export const isFinalized = async (requestId) => {
  return await aiOracleContract.methods.isFinalized(requestId).call();
};
