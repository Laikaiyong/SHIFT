// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {Script, console2} from "forge-std/Script.sol";
import {BountyContract} from "./src/bounty.sol";

contract BountyContractScript is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY"); // Fetch the private key from environment variables
        vm.startBroadcast(privateKey); // Start broadcasting the transaction using the private key
        
        // Deploy the BountyContract
        BountyContract bountyContract = new BountyContract();
        console2.log("BountyContract deployed at:", address(bountyContract));

        // Interact with the contract: create a bounty
        bountyContract.createBounty("Fix Smart Contract Bug", 100 ether);
        console2.log("Created Bounty with title 'Fix Smart Contract Bug' and amount 100 ETH");

        vm.stopBroadcast(); // Stop broadcasting
    }
}
