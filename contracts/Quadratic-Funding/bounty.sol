pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BountyContract {
    struct Bounty {
        string title;
        uint256 amount;
        address creator;
        address claimedBy;
        bool isClaimed;
    }

    IERC20 public token;
    mapping(uint256 => Bounty) public bounties;
    uint256 public bountyCount;

    event BountyCreated(uint256 indexed id, string title, uint256 amount, address creator);
    event BountyClaimed(uint256 indexed id, address claimedBy);

    constructor(IERC20 _token) {
        token = _token;
    }

    function createBounty(string memory _title, uint256 _amount) external {
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        bountyCount++;
        bounties[bountyCount] = Bounty(_title, _amount, msg.sender, address(0), false);
        emit BountyCreated(bountyCount, _title, _amount, msg.sender);
    }

    function claimBounty(uint256 _id) external {
        Bounty storage bounty = bounties[_id];
        require(!bounty.isClaimed, "Bounty already claimed");
        bounty.isClaimed = true;
        bounty.claimedBy = msg.sender;
        require(token.transfer(msg.sender, bounty.amount), "Transfer failed");
        emit BountyClaimed(_id, msg.sender);
    }
}