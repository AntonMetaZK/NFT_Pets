// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract NFTGenetics {
    struct NFT {
        uint256 dna;
        uint8 breedingCount;
    }

    NFT[] public nfts;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Создание нового NFT с заданной ДНК
    function mint(uint256 _dna) public {
        require(msg.sender == owner, "Only the owner can mint new NFTs");
        NFT memory newNFT = NFT({dna: _dna, breedingCount: 0});
        nfts.push(newNFT);
    }

    // Функция скрещивания двух NFT
    function breed(uint256 _nft1Id, uint256 _nft2Id) public {
        require(
            _nft1Id < nfts.length && _nft2Id < nfts.length,
            "Invalid NFT IDs"
        );
        NFT storage nft1 = nfts[_nft1Id];
        NFT storage nft2 = nfts[_nft2Id];

        // Проверка ограничений на скрещивание
        require(
            nft1.breedingCount < 5 && nft2.breedingCount < 5,
            "NFT has reached breeding limit"
        );

        // Простая логика комбинации ДНК (в реальности это будет сложнее)
        uint256 childDna = (nft1.dna + nft2.dna) / 2;

        NFT memory childNFT = NFT({dna: childDna, breedingCount: 0});
        nfts.push(childNFT);

        // Увеличиваем счетчик скрещиваний для родителей
        nft1.breedingCount++;
        nft2.breedingCount++;
    }
}
