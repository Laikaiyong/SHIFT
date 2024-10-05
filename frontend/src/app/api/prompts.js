import Web3 from "web3";
import abi from "../../abi/Prompt.json";

const contractAddress = "0xfD32a168D02Ce01A28180d4679f18a8db021279C"; // Replace with your actual contract address

// Initialize Web3 provider and contract
const web3 = typeof window !== 'undefined' ? new Web3(window?.ethereum) : null;
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to get the address of the AI Oracle
export const getAIOracleAddress = async () => {
    return await contract.methods.aiOracle().call();
};

// Function to calculate AI result and send a request
export const calculateAIResult = async (modelId, prompt, fromAddress) => {
    const result = await contract.methods.calculateAIResult(modelId, prompt).send({ from: fromAddress });
    console.log(result);
    return result;
};

// Function to get AI result for a specific model ID
export const getAIResult = async (modelId) => {
    return await contract.methods.getAIResult(modelId).call();
};

// Function to check if a request has been finalized
export const isFinalized = async (requestId) => {
    return await contract.methods.isFinalized(requestId).call();
};

// Function to get prompts based on request ID
export const getPrompt = async (requestId) => {
    return await contract.methods.prompts(requestId).call();
};

// Function to get request details based on request ID
export const getRequestDetails = async (requestId) => {
    return await contract.methods.requests(requestId).call();
};

// Function to set callback gas limit for a specific model ID
export const setCallbackGasLimit = async (modelId, gasLimit, fromAddress) => {
    const result = await contract.methods.setCallbackGasLimit(modelId, gasLimit).send({ from: fromAddress });
    return result;
};

// Function to estimate fee for a specific model ID
export const estimateFee = async (modelId) => {
    return await contract.methods.estimateFee(modelId).call();
};

// You can also create more functions based on your needs for additional functionality
