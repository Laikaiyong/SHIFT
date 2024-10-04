pragma solidity ^0.8.0;

contract CommunityRegistry {
    struct Community {
        string name;
        address owner;
        bool isActive;
    }

    mapping(uint256 => Community) public communities;
    uint256 public communityCount;

    event CommunityRegistered(uint256 indexed id, string name, address owner);
    event CommunityStatusChanged(uint256 indexed id, bool isActive);

    function registerCommunity(string memory _name) external {
        communityCount++;
        communities[communityCount] = Community(_name, msg.sender, true);
        emit CommunityRegistered(communityCount, _name, msg.sender);
    }

    function changeCommunityStatus(uint256 _id, bool _isActive) external {
        require(communities[_id].owner == msg.sender, "Not the owner");
        communities[_id].isActive = _isActive;
        emit CommunityStatusChanged(_id, _isActive);
    }

    function getCommunity(uint256 _id) external view returns (Community memory) {
        return communities[_id];
    }
}