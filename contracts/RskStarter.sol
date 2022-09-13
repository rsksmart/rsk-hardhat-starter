// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

import {IRskStarterLogs} from './RskStarterLogs.sol';

contract RskStarter {
    IRskStarterLogs private rskStarterLogs;

    constructor(address rskStarterLogsAddress) {
        rskStarterLogs = IRskStarterLogs(rskStarterLogsAddress);
    }

    function speak(string memory text) external {
        rskStarterLogs.doTheThing(false, text);
    }

    function shout(string memory text) external {
        rskStarterLogs.doTheThing(true, text);
    }
}
