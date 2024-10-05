// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract EventHubManagement {
    struct Event {
        string name;
        uint256 startDateTime; // Unix timestamp for event start
        uint256 endDateTime;   // Unix timestamp for event end
        address organizer;
        bool isApproved;
        uint256 numbersOfVote;
    }

    mapping(uint256 => Event) public events;
    uint256 public eventCount;

    // Mapping to track if a user has voted for a specific event
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event EventSubmitted(uint256 indexed id, string name, uint256 startDateTime, uint256 endDateTime, address organizer);
    event EventApproved(uint256 indexed id);
    event VotedForEvent(uint256 indexed eventId, address voter);

    // Function to submit and schedule an event in one step
    function submitEvent(string memory _name, uint256 _startDateTime, uint256 _endDateTime) external {
        require(_startDateTime < _endDateTime, "Invalid time range");
        require(!hasConflict(_startDateTime, _endDateTime), "Time slot conflict");

        eventCount++;
        events[eventCount] = Event(_name, _startDateTime, _endDateTime, msg.sender, false, 0);

        emit EventSubmitted(eventCount, _name, _startDateTime, _endDateTime, msg.sender);
    }

    // Function to approve an event
    function approveEvent(uint256 _id) external {
        require(!events[_id].isApproved, "Event already approved");
        events[_id].isApproved = true;
        emit EventApproved(_id);
    }

    // Function to vote for an event
    function voteForEvent(uint256 _eventId) external {
        require(events[_eventId].isApproved, "Event is not approved");
        require(!hasVoted[_eventId][msg.sender], "You have already voted for this event");

        // Mark that the user has voted
        hasVoted[_eventId][msg.sender] = true;

        // Increment the number of votes
        events[_eventId].numbersOfVote++;

        emit VotedForEvent(_eventId, msg.sender);
    }

    // Function to check if there are any conflicts with existing events
    function hasConflict(uint256 _startDateTime, uint256 _endDateTime) internal view returns (bool) {
        for (uint256 i = 1; i <= eventCount; i++) {
            Event storage existingEvent = events[i];
            if (existingEvent.isApproved && existingEvent.startDateTime > 0) { // Only check scheduled events
                if ((_startDateTime >= existingEvent.startDateTime && _startDateTime < existingEvent.endDateTime) ||
                    (_endDateTime > existingEvent.startDateTime && _endDateTime <= existingEvent.endDateTime) ||
                    (_startDateTime <= existingEvent.startDateTime && _endDateTime >= existingEvent.endDateTime)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Function to get event details
    function getEvent(uint256 _id) external view returns (Event memory) {
        return events[_id];
    }
}
