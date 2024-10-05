// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "OAO/contracts/interfaces/IAIOracle.sol";
import "OAO/contracts/AIOracleCallbackReceiver.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @notice Contract that uses OAO for image generation
/// @dev PromptWithCallbackData implements AI generated NFT collection
/// @dev Stable Diffusion model generates metadata for ERC721 tokens
contract PromptWithCallbackData is AIOracleCallbackReceiver, ERC721 {

    event promptsUpdated(
        uint256 requestId,
        uint256 modelId,
        string input,
        string output,
        bytes callbackData
    );

    event promptRequest(
        uint256 requestId,
        address sender, 
        uint256 modelId,
        string prompt
    );

    struct AIOracleRequest {
        address sender;
        uint256 modelId;
        bytes input;
        bytes output;
    }

    struct TokenMetadata {
        string image;
        string prompt;
    }

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    uint256 private nextTokenId;

    // tokenId => metamdata
    mapping(uint256 => TokenMetadata) public metadataStorage;

    // requestId => AIOracleRequest
    mapping(uint256 => AIOracleRequest) public requests;

    // modelId => callback gasLimit
    mapping(uint256 => uint64) public callbackGasLimit;

    /// @notice Initialize the contract, binding it to a specified AIOracle.
    constructor(IAIOracle _aiOracle) AIOracleCallbackReceiver(_aiOracle) ERC721("On-chain AI Oracle", "OAO"){
        owner = msg.sender;
        callbackGasLimit[50] = 500_000; // Stable Diffusion
        callbackGasLimit[11] = 5_000_000; // Llama
    }

    /// @notice sets the callback gas limit for a model
    /// @dev only owner can set the gas limit
    function setCallbackGasLimit(uint256 modelId, uint64 gasLimit) external onlyOwner {
        callbackGasLimit[modelId] = gasLimit;
    }

    // uint256: modelID => (string: prompt => string: output)
    mapping(uint256 => mapping(string => string)) public prompts;

    /// @notice returns the output for the specified model and prompt
    function getAIResult(uint256 modelId, string calldata prompt) external view returns (string memory) {
        return prompts[modelId][prompt];
    }

    /// @notice OAO executes this method after it finishes with computation
    /// @param requestId id of the request 
    /// @param output result of the OAO computation
    /// @param callbackData callback data is id of the ERC721 token. OAO will generate image and assign it to the token.
    function aiOracleCallback(uint256 requestId, bytes calldata output, bytes calldata callbackData) external override onlyAIOracleCallback() {
        AIOracleRequest storage request = requests[requestId];
        require(request.sender != address(0), "request not exists");
        request.output = output;
        prompts[request.modelId][string(request.input)] = string(output);
        
        uint256 tokenId = abi.decode(callbackData, (uint256));
        metadataStorage[tokenId].image = string(output);

        emit promptsUpdated(requestId, request.modelId, string(request.input), string(output), callbackData);
    }

    /// @notice estimating fee that is spent by OAO
    function estimateFee(uint256 modelId) public view returns (uint256) {
        return aiOracle.estimateFee(modelId, callbackGasLimit[modelId]);
    }

    /// @notice minting a token without metadata
    /// @dev called when ineracting with OAO
    function mint() internal {
        nextTokenId++;
        _safeMint(msg.sender, nextTokenId);
    }

    /// @notice function that interacts with OAO
    /// @dev tokenId of the minted token is sent as a callback data to requestCallback function
    function calculateAIResult(uint256 modelId, string calldata prompt) payable external returns (uint256, uint256) {
        bytes memory input = bytes(prompt);
        mint();

        metadataStorage[nextTokenId].prompt = prompt;

        uint256 requestId = aiOracle.requestCallback{value: msg.value}(
            modelId, input, address(this), callbackGasLimit[modelId], abi.encode(nextTokenId)
        );
        
        AIOracleRequest storage request = requests[requestId];
        request.input = input;
        request.sender = msg.sender;
        request.modelId = modelId;

        emit promptRequest(requestId, msg.sender, modelId, prompt);
        return (requestId, nextTokenId);
    }
}