import Web3 from "web3";
import AIGCNFT from '../../abi/OraAIGC.json';
const AIGCNFTABI = AIGCNFT.abi;
const web3 = new Web3(window.ethereum);

const contractAddress = '0xfD32a168D02Ce01A28180d4679f18a8db021279C'; // Replace with your actual contract address

// Initialize Web3 provider and contract
const contract = new web3.eth.Contract(AIGCNFTABI, contractAddress);

export const getAIGCData = async (prompt) => {
    try {
        const promptBytes = web3.utils.asciiToHex(prompt);
        const aigcData = await contract.methods.aigcData(promptBytes).call();
        
        // Log the entire AIGC data for debugging
        console.log('Raw AIGC Data:', aigcData);

        // Check if AIGC data exists
        if (aigcData.author === '0x0000000000000000000000000000000000000000') {
            throw new Error('AIGC data not found for this prompt.');
        }

        // Return the AIGC data
        return {
            fortune: web3.utils.hexToUtf8(aigcData.fortune),
            imageCID: web3.utils.hexToUtf8(aigcData.imageCID),
            author: aigcData.author
        };
    } catch (error) {
        console.error('Error fetching AIGC data:', error);
        throw error;
    }
};


// Example usage
(async () => {
    const prompt = 'Your prompt here'; // Replace with your prompt
    try {
        const data = await getAIGCData(prompt);
        console.log('AIGC Data:', data);
    } catch (error) {
        console.error(error.message);
    }
})();
