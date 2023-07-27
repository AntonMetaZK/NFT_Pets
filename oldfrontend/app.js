// Инициализация ethers.js
let provider;
let contract;
let signer;

// Подключение MetaMask
document.getElementById("connectWallet").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    alert("Пожалуйста, установите MetaMask!");
  }
});

// Функции для взаимодействия с контрактом
async function mintNFT(dna) {
  let tx = await contract.mint(dna);
  await tx.wait();
  alert("NFT успешно создан!");
}

async function breedNFT(nft1Id, nft2Id) {
  let tx = await contract.breed(nft1Id, nft2Id);
  await tx.wait();
  alert("NFT успешно скрещены!");
}

async function getNFTInfo(nftId) {
  const nft = await contract.nfts(nftId);
  return `ДНК: ${nft.dna}, Количество скрещиваний: ${nft.breedingCount}`;
}

// Обработчики событий для кнопок
document.getElementById("mintButton").addEventListener("click", () => {
  const dna = document.getElementById("dnaInput").value;
  mintNFT(dna);
});

document.getElementById("breedButton").addEventListener("click", () => {
  const nft1Id = document.getElementById("nft1Id").value;
  const nft2Id = document.getElementById("nft2Id").value;
  breedNFT(nft1Id, nft2Id);
});

document.getElementById("getInfoButton").addEventListener("click", async () => {
  const nftId = document.getElementById("nftInfoId").value;
  const info = await getNFTInfo(nftId);
  document.getElementById("nftInfo").textContent = info;
});

// После успешного подключения кошелька обновляем информацию на странице
async function updateWalletInfo() {
  const address = await signer.getAddress();
  const network = (await provider.getNetwork()).name;

  document.getElementById("walletAddress").textContent = address;
  document.getElementById("network").textContent = network;

  updateUserNFTs(address);
}

// Функция для обновления списка NFT пользователя
// (здесь мы предполагаем, что у нашего контракта есть функция getUserNFTs, которая возвращает список NFT пользователя)
async function updateUserNFTs(address) {
  const userNFTs = await contract.getUserNFTs(address);
  const userNFTsDiv = document.getElementById("userNFTs");

  if (userNFTs.length === 0) {
    userNFTsDiv.textContent = "У вас нет NFT";
  } else {
    userNFTsDiv.innerHTML = userNFTs
      .map((nft) => `<div>ID: ${nft.id}, ДНК: ${nft.dna}</div>`)
      .join("");
  }
}
