// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IAIOracle} from "OAO/contracts/interfaces/IAIOracle.sol";

contract MockOAO is IAIOracle {
    bytes4 constant public callbackFunctionSelector = 0xb0347814;
    uint256 lastRequest;
    mapping(uint256 => AICallbackRequestData) public requests;
    uint256 public gasPrice;
    address constant public server = 0xf5aeB5A4B35be7Af7dBfDb765F99bCF479c917BD;

    struct AICallbackRequestData{
        address account;
        uint256 requestId;
        uint256 modelId;
        bytes input;
        address callbackContract;
        uint64 gasLimit;
        bytes callbackData;
        bytes output;
    }

    ///@notice mock function that emulates OAO computation and calls back into the Prompt
    function requestCallback(
        uint256 modelId,
        bytes memory input,
        address callbackContract,
        uint64 gasLimit,
        bytes memory callbackData
    ) external payable returns (uint256) {
        AICallbackRequestData storage request = requests[++lastRequest];
        request.account = msg.sender;
        request.requestId = lastRequest;
        request.modelId = modelId;
        request.input = input;
        request.callbackContract = callbackContract;
        request.gasLimit = gasLimit;
        request.callbackData = callbackData;

        emit AICallbackRequest(request.account, request.requestId, modelId, input, callbackContract, gasLimit, callbackData);

        return request.requestId;
    }

    function invokeCallback(uint256 requestId, bytes calldata output) external {
        // read request of requestId
        AICallbackRequestData storage request = requests[requestId];
        
        // others can challenge if the result is incorrect!
        request.output = output;

        // invoke callback
        if(request.callbackContract != address(0)) {
            bytes memory payload = abi.encodeWithSelector(callbackFunctionSelector, request.requestId, output, request.callbackData);
            (bool success, bytes memory data) = request.callbackContract.call{gas: request.gasLimit}(payload);
            require(success, "failed to call selector");
            if (!success) {
                assembly {
                    revert(add(data, 32), mload(data))
                }
            }
        }

        emit AICallbackResult(request.account, requestId, msg.sender, output);

        gasPrice = tx.gasprice;
    }

    // call this function if the opml result is challenged and updated!
    // anyone can call it!
    function updateResult(uint256 requestId) external {
        // read request of requestId
        AICallbackRequestData storage request = requests[requestId];

        // get Latest output of request
        bytes memory output = request.output;
        require(output.length > 0, "output not uploaded");

        // invoke callback
        if(request.callbackContract != address(0)) {
            bytes memory payload = abi.encodeWithSelector(callbackFunctionSelector, request.requestId, output, request.callbackData);
            (bool success, bytes memory data) = request.callbackContract.call{gas: request.gasLimit}(payload);
            require(success, "failed to call selector");
            if (!success) {
                assembly {
                    revert(add(data, 32), mload(data))
                }
            }
        }

        emit AICallbackResult(request.account, requestId, msg.sender, output);
    }

    function isFinalized(uint256 requestId) external view returns (bool) {
        return true;
    }

    function estimateFee(uint256 modelId, uint256 gasLimit) public view returns (uint256) {
        return modelId + gasPrice * gasLimit;
    }
}