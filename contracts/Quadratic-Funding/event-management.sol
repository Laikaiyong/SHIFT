// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract EventHubManagement {
    struct Event {
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 date;
        address organizer;
        bool isApproved;
    }

    mapping(uint256 => Event) public events;
    uint256 public eventCount;

    event EventScheduled(uint256 indexed id, string name, uint256 startTime, uint256 endTime, uint256 date, address organizer);
    event EventSubmitted(uint256 indexed id, string name, uint256 date, address organizer);
    event EventApproved(uint256 indexed id);

    // Function to submit an event
    function submitEvent(string memory _name, uint256 _date) external {
        eventCount++;
        events[eventCount] = Event(_name, 0, 0, _date, msg.sender, false);
        emit EventSubmitted(eventCount, _name, _date, msg.sender);
    }

    // Function to approve an event
    function approveEvent(uint256 _id) external {
        require(!events[_id].isApproved, "Event already approved");
        events[_id].isApproved = true;
        emit EventApproved(_id);
    }

    // Function to schedule an event once it is approved
    function scheduleEvent(uint256 _id, uint256 _startTime, uint256 _endTime) external {
        require(events[_id].isApproved, "Event must be approved before scheduling");
        require(_startTime < _endTime, "Invalid time range");
        require(!hasConflict(_startTime, _endTime), "Time slot conflict");

        Event storage eventToSchedule = events[_id];
        eventToSchedule.startTime = _startTime;
        eventToSchedule.endTime = _endTime;

        emit EventScheduled(_id, eventToSchedule.name, _startTime, _endTime, eventToSchedule.date, eventToSchedule.organizer);
    }

    // Function to check if there are any conflicts with existing events
    function hasConflict(uint256 _startTime, uint256 _endTime) internal view returns (bool) {
        for (uint256 i = 1; i <= eventCount; i++) {
            Event storage existingEvent = events[i];
            if (existingEvent.isApproved && existingEvent.startTime > 0) { // Only check scheduled events
                if ((_startTime >= existingEvent.startTime && _startTime < existingEvent.endTime) ||
                    (_endTime > existingEvent.startTime && _endTime <= existingEvent.endTime) ||
                    (_startTime <= existingEvent.startTime && _endTime >= existingEvent.endTime)) {
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
