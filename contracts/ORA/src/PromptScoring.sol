// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IAIOracle} from "OAO/contracts/interfaces/IAIOracle.sol";
import {AIOracleCallbackReceiver} from "OAO/contracts/AIOracleCallbackReceiver.sol";

/// @notice User interfacing contract that interacts with OAO
/// @dev PromptScoring contract inherits AIOracleCallbackReceiver, so that OPML nodes can callback with the result.
contract PromptScoring is AIOracleCallbackReceiver {
    event promptsUpdated(
        uint256 requestId,
        uint256 modelId,
        string input,
        string output,
        bytes callbackData
    );

    event ScoreUpdated(address indexed user, uint8 newScore);

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

    address public owner;

    string private systemPrompt =
        "7007 protocol tokenizes AI outputs as unique inference  assets, each representing a specific AI-generated data piece. This protocol makes AI inferences verifiable, immutable, and non-fungible, securing data and computation integrity on the blockchain. You are rating community members engagement with and potential to improve a crypto project. Rate replies based on: 0-1: The reply does not contribute value or is unclear/incomplete/short. 2-5: The member only wants financial incentive only but provides insufficient details to introduce their potential contribution. 6-9: The member could potentially improve the project and explains their plans and contribution convincingly. 10: The reply shows special passion and benefits for the project. You must output only the score in the format:";

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    /// @dev requestId => AIOracleRequest
    mapping(uint256 => AIOracleRequest) public requests;

    /// @dev modelId => callback gasLimit
    mapping(uint256 => uint64) public callbackGasLimit;

    // @dev address => score
    mapping(address => uint8) public addressScore;

    address[] public scoredAddresses;

    mapping(address => bool) public isAddressScored;

    /// @notice Initialize the contract, binding it to a specified AIOracle.
    constructor(IAIOracle _aiOracle) AIOracleCallbackReceiver(_aiOracle) {
        owner = msg.sender;
        callbackGasLimit[14] = 2_500_000; // score checking
    }

    /// @notice sets the callback gas limit for a model
    /// @dev only owner can set the gas limit
    function setCallbackGasLimit(
        uint256 modelId,
        uint64 gasLimit
    ) external onlyOwner {
        callbackGasLimit[modelId] = gasLimit;
    }

    /// @dev uint256: modelID => (string: prompt => string: output)
    mapping(uint256 => mapping(string => string)) public prompts;

    /// @notice returns the output for the specified model and prompt
    function getAIResult(
        uint256 modelId,
        string calldata prompt
    ) external view returns (string memory) {
        string memory input = string(
            abi.encodePacked(
                '{"instruction":"',
                systemPrompt,
                '",',
                '"input": "',
                prompt,
                '"}'
            )
        );
        return prompts[modelId][input];
    }

    /// @notice OAO executes this method after it finishes with computation
    /// @param requestId id of the request
    /// @param output result of the OAO computation
    /// @param callbackData optional data that is executed in the callback
    function aiOracleCallback(
        uint256 requestId,
        bytes calldata output,
        bytes calldata callbackData
    ) external override onlyAIOracleCallback {
        // since we do not set the callbackData in this example, the callbackData should be empty
        AIOracleRequest storage request = requests[requestId];
        require(request.sender != address(0), "request does not exist");
        request.output = output;
        prompts[request.modelId][string(request.input)] = string(output);

        uint8 outputScore = safelyConvertToScore(output);
        address sender = request.sender;
        uint8 currentScore = addressScore[sender];
        if (outputScore > currentScore) {
            addressScore[sender] = outputScore;
            emit ScoreUpdated(sender, outputScore);

            if (!isAddressScored[sender]) {
                scoredAddresses.push(sender);
                isAddressScored[sender] = true;
            }
        }

        emit promptsUpdated(
            requestId,
            request.modelId,
            string(request.input),
            string(output),
            callbackData
        );
    }

    function safelyConvertToScore(bytes memory b) public pure returns (uint8) {
        if (b.length == 0) return 5;

        for (uint i = 0; i < b.length; i++) {
            uint8 currentByte = uint8(b[i]);

            if (currentByte >= 48 && currentByte <= 57) {
                uint8 digit = currentByte - 48;

                if (digit >= 1 && digit <= 10) {
                    return digit;
                } else if (digit == 0 && i + 1 < b.length) {
                    uint8 nextByte = uint8(b[i + 1]);
                    if (nextByte == 48) {
                        return 10;
                    }
                }
            }
        }

        return 5;
    }

    function getWhitelist() public view returns (address[] memory) {
        return scoredAddresses;
    }

    function getWhitelistLength() public view returns (uint256) {
        return scoredAddresses.length;
    }

    /// @notice estimating fee that is spent by OAO
    function estimateFee(uint256 modelId) public view returns (uint256) {
        return aiOracle.estimateFee(modelId, callbackGasLimit[modelId]);
    }

    function setSystemPrompt(string calldata _systemPrompt) external onlyOwner {
        systemPrompt = _systemPrompt;
    }

    /// @notice main point of interaction with OAO
    /// @dev aiOracle.requestCallback sends request to OAO
    function calculateAIResult(
        uint256 modelId,
        string calldata prompt
    ) external payable returns (uint256) {
        bytes memory input = bytes(
            abi.encodePacked(
                '{"instruction":"',
                systemPrompt,
                '",',
                '"input": "',
                prompt,
                '"}'
            )
        );
        uint256 requestId = aiOracle.requestCallback{value: msg.value}(
            modelId,
            input,
            address(this),
            callbackGasLimit[modelId],
            ""
        );
        AIOracleRequest storage request = requests[requestId];
        request.input = input;
        request.sender = msg.sender;
        request.modelId = modelId;
        emit promptRequest(requestId, msg.sender, modelId, prompt);
        return requestId;
    }
}
