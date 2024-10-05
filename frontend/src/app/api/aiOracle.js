import { ethers } from 'ethers';
import PromptContract from "../../abi/Prompt.json";

const contractAddress = "0x9e8550203C66A2665b007a1f6Bcff1b25E148403"; // Replace with your contract address

// Initialize ethers provider and contract
const signer = ethereum.selectedAddress;
const aiOracleContract = new ethers.Contract(contractAddress, PromptContract, signer);

// Get AI Oracle Address
export const getAIOracleAddress = async () => {
  try {
    const address = await aiOracleContract.aiOracle();
    return address;
  } catch (error) {
    console.error('Error fetching AI Oracle address:', error);
  }
};

// Set Callback Gas Limit
export const setCallbackGasLimit = async (modelId, gasLimit) => {
  try {
    const tx = await aiOracleContract.setCallbackGasLimit(modelId, gasLimit);
    await tx.wait(); // Wait for the transaction to be mined
    console.log(`Gas limit set for model ID ${modelId}`);
  } catch (error) {
    console.error('Error setting callback gas limit:', error);
  }
};

// Estimate Fee
export const estimateFee = async (modelId) => {
  try {
    const fee = await aiOracleContract.estimateFee(modelId);
    return fee;
  } catch (error) {
    console.error('Error estimating fee:', error);
  }
};

// Calculate AI Result
export const calculateAIResult = async (modelId, prompt, amount) => {
  try {
    const tx = await aiOracleContract.calculateAIResult(modelId, prompt, { value: amount });
    await tx.wait(); // Wait for the transaction to be mined
    console.log(`AI result calculated for model ID ${modelId}`);
  } catch (error) {
    console.error('Error calculating AI result:', error);
  }
};
