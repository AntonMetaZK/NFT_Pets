import './App.css'
import { useAppContext } from './hooks/useAppContext'
import defaultProvider from './api/defaultProvider';
import connectMetaMask from './utils/connectMetaMask';

function App() {
  const {contextState, updateContextState} = useAppContext();
  const currentAccount = contextState?.currentAccount;

  const handleConnectWalletClick = async () => {
    const accountMM = await connectMetaMask();
    updateContextState({currentAccount: accountMM});
    console.log(accountMM);
  }

  return (
    <>
         <button onClick={() =>{handleConnectWalletClick()}} id="connectWallet">Подключить MetaMask</button>

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

          {currentAccount && (
                      <div id="walletInfo">
                      <strong>Адрес кошелька: {currentAccount.substring(0,6)}...{currentAccount.substring(38)}</strong>
                      <br></br>
                      <strong>Сеть: Siberium Testnet</strong> 
                    </div>
          )}


          <h2>Ваши NFT</h2>
          <div id="userNFTs">Загрузка...</div>
    </>
  )
}

export default App
