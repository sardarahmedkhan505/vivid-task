// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UniSwapEthUsdc {
    address private constant UNISWAP_ROUTER_ADDRESS = 0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008;
    address private constant WETH_ADDRESS = 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14; // Sepolia Wrapped ETH contract address
    address private constant USDC_ADDRESS = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238; // Sepolia USDC contract address

    IUniswapV2Router02 private uniswapRouter;

    event SwapInitiated(address indexed user, uint256 ethAmount, uint256 usdcAmount);

    constructor() {
        uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
    }

    function swapEthForUsdc(uint256 amountOutMin) external payable {
        require(msg.value > 0, "Insufficient ETH amount");

        address[] memory path = new address[](2);
        path[0] = WETH_ADDRESS;
        path[1] = USDC_ADDRESS;

        uint256 deadline = block.timestamp + 1 minutes; // Set deadline to 15 minutes from now

        uniswapRouter.swapExactETHForTokens{value: msg.value}(amountOutMin, path, msg.sender, deadline);

        emit SwapInitiated(msg.sender, msg.value, IERC20(USDC_ADDRESS).balanceOf(msg.sender));
    }
}
