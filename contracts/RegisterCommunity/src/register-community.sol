// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract CommunityRegistry {
    struct Community {
        string name;
        string location;
        address owner;
        uint256 membersCount;
    }

    mapping(uint256 => Community) public communities;
    uint256 public communityCount;

    event CommunityRegistered(uint256 indexed id, string name, address owner, string location, uint256 membersCount);
    event MemberAdded(uint256 indexed id, uint256 newMembersCount);

    // Function to register a new community
    function registerCommunity(string memory _name, string memory _location) external {
        communityCount++;
        communities[communityCount] = Community(_name, _location, msg.sender, 1);
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
}
