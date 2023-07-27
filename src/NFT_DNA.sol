// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Импорт интерфейсов и библиотек ERC721
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTGenetics is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct NFT {
        uint256 dna;
        uint8 breedingCount;
    }

    NFT[] public nfts;
    address public owner;

    uint256 public mintPrice = 0.1 ether;

    //Функция изменения стоимости mint за 1 NFT
    function setMintPrice(uint256 _newPrice) external {
        require(
            msg.sender == owner,
            "Only the contract owner can set the mint price"
        );
        mintPrice = _newPrice;
    }

    uint256 internal constant maskLast8Bits = uint256(0xff);
    uint256 internal constant maskFirst248Bits = type(uint256).max - 0xff;

    constructor() ERC721("NFTGenetics", "NGT") {
        owner = msg.sender;
    }

    // Функция mint для создания нового NFT с уникальным геномом
    function mint() public payable {
        require(msg.value >= mintPrice, "Insufficient Ether sent");

        uint256 newDna = uint256(
            keccak256(abi.encodePacked(msg.sender, block.timestamp))
        );

        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();

        NFT memory newNFT = NFT({dna: newDna, breedingCount: 0});
        nfts.push(newNFT);
        _safeMint(msg.sender, newTokenId);

        if (msg.value > mintPrice) {
            payable(msg.sender).transfer(msg.value - mintPrice);
        }
    }

    function breed(uint256 _nft1Id, uint256 _nft2Id) public {
        require(
            _nft1Id < nfts.length && _nft2Id < nfts.length,
            "Invalid NFT IDs"
        );
        NFT storage nft1 = nfts[_nft1Id];
        NFT storage nft2 = nfts[_nft2Id];

        require(
            nft1.breedingCount < 5 && nft2.breedingCount < 5,
            "NFT has reached breeding limit"
        );

        uint256 childDna = mixGenes(nft1.dna, nft2.dna);

        NFT memory childNFT = NFT({dna: childDna, breedingCount: 0});
        nfts.push(childNFT);

        nft1.breedingCount++;
        nft2.breedingCount++;
    }

    function _sliceNumber(
        uint256 _n,
        uint256 _nbits,
        uint256 _offset
    ) private pure returns (uint256) {
        uint256 mask = uint256((2 ** _nbits) - 1) << _offset;
        return uint256((_n & mask) >> _offset);
    }

    function _get5Bits(
        uint256 _input,
        uint256 _slot
    ) internal pure returns (uint8) {
        return uint8(_sliceNumber(_input, uint256(5), _slot * 5));
    }

    function decode(uint256 _genes) public pure returns (uint8[] memory) {
        uint8[] memory traits = new uint8[](48);
        uint256 i;
        for (i = 0; i < 48; i++) {
            traits[i] = _get5Bits(_genes, i);
        }
        return traits;
    }

    function encode(
        uint8[] memory _traits
    ) public pure returns (uint256 _genes) {
        _genes = 0;
        for (uint256 i = 0; i < 48; i++) {
            _genes = _genes << 5;
            _genes = _genes | _traits[47 - i];
        }
        return _genes;
    }

    function mixGenes(
        uint256 _genes1,
        uint256 _genes2
    ) internal view returns (uint256) {
        uint256 targetBlock = block.number - 1;
        uint256 randomN = uint256(blockhash(targetBlock));
        uint256 randomIndex = 0;

        uint8[] memory genes1Array = decode(_genes1);
        uint8[] memory genes2Array = decode(_genes2);
        uint8[] memory babyArray = new uint8[](48);

        // ... [Оставшаяся логика из функции mixGenes из GeneScience для заполнения babyArray] ...

        return encode(babyArray);
    }

    function tokensOfOwner(
        address _owner
    ) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            // Возвращает пустой массив
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            for (uint256 index = 0; index < tokenCount; index++) {
                result[index] = tokenOfOwnerByIndex(_owner, index);
            }
            return result;
        }
    }

    function getGenomeByTokenId(
        uint256 _tokenId
    ) external view returns (uint256) {
        require(_tokenId < nfts.length, "NFT with this ID does not exist");
        return nfts[_tokenId].dna;
    }

    //Функция перевода всего баланса на указанный адресс
    function withdrawBalance(address payable _to) external {
        require(msg.sender == owner, "Only the contract owner can withdraw");
        require(_to != address(0), "Invalid address");

        uint256 balance = address(this).balance;
        _to.transfer(balance);
    }
}
