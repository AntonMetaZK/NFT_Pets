import './App.css'

function App() {

  return (
    <>
         <button id="connectWallet">Подключить MetaMask</button>

          <h2>Создание NFT</h2>
          <input
            type="number"
            id="dnaInput"
            placeholder="Введите ДНК (например, 123456)"
          />
          <button id="mintButton">Создать NFT</button>

          <h2>Скрещивание NFT</h2>
          <input type="number" id="nft1Id" placeholder="ID первого NFT" />
          <input type="number" id="nft2Id" placeholder="ID второго NFT" />
          <button id="breedButton">Скрестить NFT</button>

          <h2>Информация о NFT</h2>
          <input type="number" id="nftInfoId" placeholder="ID NFT" />
          <button id="getInfoButton">Получить информацию</button>
          <div id="nftInfo"></div>

          <script src="ethers.min.js"></script>
          <script src="app.js"></script>

          <div id="walletInfo">
            <strong>Адрес кошелька:</strong>
            <span id="walletAddress">Не подключен</span><br />
            <strong>Сеть:</strong> <span id="network">Не подключен</span>
          </div>

          <h2>Ваши NFT</h2>
          <div id="userNFTs">Загрузка...</div>
    </>
  )
}

export default App
