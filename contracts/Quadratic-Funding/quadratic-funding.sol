pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract QuadraticFunding {
    using SafeMath for uint256;

    IERC20 public token;
    uint256 public matchingPoolAmount;
    mapping(address => uint256) public contributions;
    address[] public projects;

    constructor(IERC20 _token, uint256 _matchingPoolAmount) {
        token = _token;
        matchingPoolAmount = _matchingPoolAmount;
    }

    function contribute(address _project, uint256 _amount) external {
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        contributions[_project] = contributions[_project].add(_amount);
        if (!projectExists(_project)) {
            projects.push(_project);
        }
    }

    function calculateAllocation() public view returns (uint256[] memory) {
        uint256[] memory allocations = new uint256[](projects.length);
        uint256 totalSqrtSum = 0;

        for (uint256 i = 0; i < projects.length; i++) {
            uint256 sqrtContribution = sqrt(contributions[projects[i]]);
            totalSqrtSum = totalSqrtSum.add(sqrtContribution);
        }

        for (uint256 i = 0; i < projects.length; i++) {
            uint256 sqrtContribution = sqrt(contributions[projects[i]]);
            allocations[i] = matchingPoolAmount.mul(sqrtContribution).div(totalSqrtSum);
        }

        return allocations;
    }

    function distributefunds() external {
        uint256[] memory allocations = calculateAllocation();
        for (uint256 i = 0; i < projects.length; i++) {
            require(token.transfer(projects[i], allocations[i]), "Transfer failed");
        }
    }

    function projectExists(address _project) internal view returns (bool) {
        for (uint256 i = 0; i < projects.length; i++) {
            if (projects[i] == _project) {
                return true;
            }
        }
        return false;
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}