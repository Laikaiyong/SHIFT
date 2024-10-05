// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./event-management.sol"; // Import the EventHubManagement contract

contract QuadraticFunding {
    using SafeMath for uint256;

    IERC20 public token;
    uint256 public matchingPoolAmount;
    mapping(address => mapping(uint256 => uint256)) public contributions; // Contributions per project per event
    mapping(uint256 => address[]) public projectsByEvent; // Projects associated with an event
    EventHubManagement public eventHub; // Reference to EventHubManagement contract

    constructor(IERC20 _token, uint256 _matchingPoolAmount, EventHubManagement _eventHub) {
        token = _token;
        matchingPoolAmount = _matchingPoolAmount;
        eventHub = _eventHub;
    }

    // Contribute to a project for a specific event
    function contribute(uint256 _eventId, address _project, uint256 _amount) external {
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        require(eventHub.events(_eventId).isApproved, "Event is not approved");

        contributions[_project][_eventId] = contributions[_project][_eventId].add(_amount);

        if (!projectExists(_eventId, _project)) {
            projectsByEvent[_eventId].push(_project);
        }
    }

    // Calculate allocation for a specific event
    function calculateAllocation(uint256 _eventId) public view returns (uint256[] memory) {
        uint256[] memory allocations = new uint256[](projectsByEvent[_eventId].length);
        uint256 totalSqrtSum = 0;

        for (uint256 i = 0; i < projectsByEvent[_eventId].length; i++) {
            uint256 sqrtContribution = sqrt(contributions[projectsByEvent[_eventId][i]][_eventId]);
            totalSqrtSum = totalSqrtSum.add(sqrtContribution);
        }

        for (uint256 i = 0; i < projectsByEvent[_eventId].length; i++) {
            uint256 sqrtContribution = sqrt(contributions[projectsByEvent[_eventId][i]][_eventId]);
            allocations[i] = matchingPoolAmount.mul(sqrtContribution).div(totalSqrtSum);
        }

        return allocations;
    }

    // Distribute funds for a specific event
    function distributefunds(uint256 _eventId) external {
        require(eventHub.events(_eventId).isApproved, "Event is not approved");
        uint256[] memory allocations = calculateAllocation(_eventId);
        for (uint256 i = 0; i < projectsByEvent[_eventId].length; i++) {
            require(token.transfer(projectsByEvent[_eventId][i], allocations[i]), "Transfer failed");
        }
    }

    // Check if a project exists for a specific event
    function projectExists(uint256 _eventId, address _project) internal view returns (bool) {
        address[] memory projects = projectsByEvent[_eventId];
        for (uint256 i = 0; i < projects.length; i++) {
            if (projects[i] == _project) {
                return true;
            }
        }
        return false;
    }

    // Calculate square root (for quadratic funding)
    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
