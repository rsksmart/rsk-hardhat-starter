// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

interface IRskStarterLogs {
    function count() external view returns (uint256);

    function doTheThing(bool isLoud, string memory text) external;
}

contract RskStarterLogs is IRskStarterLogs {
    uint256 public override count;

    event RskStarterLog(
        address indexed source,
        bool indexed isLoud,
        string text
    );

    function doTheThing(bool isLoud, string memory text) external override {
        count += 1;
        emit RskStarterLog(msg.sender, isLoud, text);
    }
}
