pragma solidity ^0.8.0;

contract EventHub {
    struct Event {
        string name;
        uint256 startTime;
        uint256 endTime;
        address organizer;
    }

    mapping(uint256 => Event) public events;
    uint256 public eventCount;

    event EventScheduled(uint256 indexed id, string name, uint256 startTime, uint256 endTime, address organizer);

    function scheduleEvent(string memory _name, uint256 _startTime, uint256 _endTime) external {
        require(_startTime < _endTime, "Invalid time range");
        require(!hasConflict(_startTime, _endTime), "Time slot conflict");

        eventCount++;
        events[eventCount] = Event(_name, _startTime, _endTime, msg.sender);
        emit EventScheduled(eventCount, _name, _startTime, _endTime, msg.sender);
    }

    function hasConflict(uint256 _startTime, uint256 _endTime) internal view returns (bool) {
        for (uint256 i = 1; i <= eventCount; i++) {
            Event storage existingEvent = events[i];
            if ((_startTime >= existingEvent.startTime && _startTime < existingEvent.endTime) ||
                (_endTime > existingEvent.startTime && _endTime <= existingEvent.endTime) ||
                (_startTime <= existingEvent.startTime && _endTime >= existingEvent.endTime)) {
                return true;
            }
        }
        return false;
    }
}