// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract QuadraticFunding {
    using SafeMath for uint256;

    struct Event {
        string name;
        uint256 startDateTime;
        uint256 endDateTime;
        address organizer;
        bool isApproved;
    }

    IERC20 public token;
    uint256 public matchingPoolAmount;
    mapping(uint256 => Event) public events;
    uint256 public eventCount;
    mapping(address => mapping(uint256 => uint256)) public contributions;
    mapping(uint256 => address[]) public projectsByEvent;

    event EventSubmitted(uint256 indexed id, string name, uint256 startDateTime, uint256 endDateTime, address organizer);
    event EventApproved(uint256 indexed id);

    constructor( uint256 _matchingPoolAmount) {
        matchingPoolAmount = _matchingPoolAmount;
    }

    // Submit and schedule an event
    function submitEvent(string memory _name, uint256 _startDateTime, uint256 _endDateTime) external {
        require(_startDateTime < _endDateTime, "Invalid time range");
        require(!hasConflict(_startDateTime, _endDateTime), "Time slot conflict");

        eventCount++;
        events[eventCount] = Event(_name, _startDateTime, _endDateTime, msg.sender, false);

        emit EventSubmitted(eventCount, _name, _startDateTime, _endDateTime, msg.sender);
    }

    // Approve an event
    function approveEvent(uint256 _id) external {
        require(!events[_id].isApproved, "Event already approved");
        events[_id].isApproved = true;
        emit EventApproved(_id);
    }

    // Contribute to a project for a specific event
    function contribute(uint256 _eventId, address _project, uint256 _amount) external {
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        require(events[_eventId].isApproved, "Event is not approved");

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
        require(events[_eventId].isApproved, "Event is not approved");
        uint256[] memory allocations = calculateAllocation(_eventId);
        for (uint256 i = 0; i < projectsByEvent[_eventId].length; i++) {
            require(token.transfer(projectsByEvent[_eventId][i], allocations[i]), "Transfer failed");
        }
    }

    function hasConflict(uint256 _startDateTime, uint256 _endDateTime) internal view returns (bool) {
        for (uint256 i = 1; i <= eventCount; i++) {
            Event storage existingEvent = events[i];
            if (existingEvent.isApproved && existingEvent.startDateTime > 0) {
                if ((_startDateTime >= existingEvent.startDateTime && _startDateTime < existingEvent.endDateTime) ||
                    (_endDateTime > existingEvent.startDateTime && _endDateTime <= existingEvent.endDateTime) ||
                    (_startDateTime <= existingEvent.startDateTime && _endDateTime >= existingEvent.endDateTime)) {
                    return true;
                }
            }
        }
        return false;
    }

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
