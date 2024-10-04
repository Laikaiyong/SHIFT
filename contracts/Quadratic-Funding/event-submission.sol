pragma solidity ^0.8.0;

contract EventManagement {
    struct Event {
        string name;
        uint256 date;
        address organizer;
        bool isApproved;
    }

    mapping(uint256 => Event) public events;
    uint256 public eventCount;

    event EventSubmitted(uint256 indexed id, string name, uint256 date, address organizer);
    event EventApproved(uint256 indexed id);

    function submitEvent(string memory _name, uint256 _date) external {
        eventCount++;
        events[eventCount] = Event(_name, _date, msg.sender, false);
        emit EventSubmitted(eventCount, _name, _date, msg.sender);
    }

    function approveEvent(uint256 _id) external {
        require(!events[_id].isApproved, "Event already approved");
        events[_id].isApproved = true;
        emit EventApproved(_id);
    }

    function getEvent(uint256 _id) external view returns (Event memory) {
        return events[_id];
    }
}