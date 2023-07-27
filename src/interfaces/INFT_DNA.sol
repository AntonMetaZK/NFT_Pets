// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface INFTGenetics {
    function mint() external payable;

    function breed(uint256 _nft1Id, uint256 _nft2Id) external;

    function setMintPrice(uint256 _newPrice) external;

    function withdrawBalance(address payable _to) external;

    function getGenomeByTokenId(
        uint256 _tokenId
    ) external view returns (uint256);
}
