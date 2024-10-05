// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CommunityRegistry {
    struct Community {
        string name;
        string location;
        address owner;
        uint256 membersCount;
        uint256 reputationScore;
    }

    mapping(uint256 => Community) public communities;
    uint256 public communityCount;

    event CommunityRegistered(uint256 indexed id, string name, address owner, string location, uint256 membersCount);
    event MemberAdded(uint256 indexed id, uint256 newMembersCount);
    event ReputationUpdated(uint256 indexed id, uint256 newReputationScore);

    // Function to register a new community
    function registerCommunity(string memory _name, string memory _location) external {
        communityCount++;
        communities[communityCount] = Community(_name, _location, msg.sender, 1, 0); // Initialize reputationScore to 0
        emit CommunityRegistered(communityCount, _name, msg.sender, _location, 1);
    }

    // Function to get community details by ID
    function getCommunity(uint256 _id) external view returns (Community memory) {
        return communities[_id];
    }

    // Function to add a member to the selected community
    function addMember(uint256 _communityId) external {
        Community storage community = communities[_communityId]; // Access the community by ID
        community.membersCount += 1; // Increment the members count
        emit MemberAdded(_communityId, community.membersCount); // Emit an event to track the new members count
    }

    // Function to update the reputation score of a community (only owner can call this)
    function updateReputationScore(uint256 _communityId, int256 _change) external {
        Community storage community = communities[_communityId];
        require(msg.sender == community.owner, "Only the community owner can update the reputation score");

        if (_change < 0) {
            uint256 deduction = uint256(-_change); // Convert negative input to positive for subtraction
            require(community.reputationScore >= deduction, "Reputation score cannot be negative");
            community.reputationScore -= deduction;
        } else {
            community.reputationScore += uint256(_change); // Add the positive input
        }

        emit ReputationUpdated(_communityId, community.reputationScore); // Emit an event to track reputation score changes
    }
}
