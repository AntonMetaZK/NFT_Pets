import  './App.css'
import { useAppContext } from './hooks/useAppContext'
import defaultProvider from './abi/defaultProvider';
import connectMetaMask from './utils/connectMetaMask';
import { getNftDnaWithSigner } from './abi/getNFTDNAcontarctWitchSigner';
import { nftDna } from './abi/NFT_DNA_contract';
import { parseEther } from 'ethers';

function App() {
  const {contextState, updateContextState} = useAppContext();
  const currentAccount = contextState?.currentAccount;

  const handleConnectWalletClick = async () => {
    const accountMM = await connectMetaMask();
    updateContextState({currentAccount: accountMM});
    console.log(accountMM);
  }

  const handleMintClick = async() =>{
    try{
      const mintPrice = parseEther("0.1");
      const nftDnaWithSigner = await getNftDnaWithSigner();
      const tx = await nftDnaWithSigner.mint({value:mintPrice});
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div className='body'>
      <header>
        <h1 className='header-text'>NFT CATS</h1>
      </header>

      <div className='connection'>
        <h1 className='connection-header'>Создайте собственного NFT кота</h1>
        <p className='connection-mainText'>Подключите криптокошелёк, чтобы </p> 
        <p className='connection-mainText connection-mainText-end'> устанавливать NFT-аватары</p>
        <button onClick={() =>{handleConnectWalletClick()}} id="connectWallet">Подключить MetaMask <span>&#62;</span></button>
      </div>
      

      <div className='mint'>
        <h2 className='mintText'>Создание NFT цена 0.1 SIBR</h2> 
        {/* <div className='singleInput'> */}
        {/* <input
            name='DNA'
            type="number"
            id="dnaInput"
            placeholder="Введите ДНК (например, 123456)"
          /> */}
          <button onClick={() => handleMintClick()} className='inputButton' id="mintButton">Создать NFT</button>
        {/* </div> */}
      </div>


      <form>
        <label htmlFor='Breeding'>Скрещивание NFT</label>
        <div>
          <input name='Breeding' type="number" id="nft1Id" placeholder="ID первого NFT" />
          <input name='Breeding' type="number" id="nft2Id" placeholder="ID второго NFT" />
          <button className='inputButton' id="breedButton">Скрестить NFT</button>
        </div>
      </form>

      
      <form className='lastForm'>
        <label htmlFor='NFTInfo'>Информация о NFT</label>
        <div>
          <input name='NFTInfo' type="number" id="nftInfoId" placeholder="ID NFT" />
          <button className='inputButton' id="getInfoButton">Получить информацию</button>
        </div>

      </form>

      {/* <div id="nftInfo"></div> */}
      {currentAccount && (
          <div id="walletInfo">
            <p className='walletInfoText'><strong>Адрес кошелька:</strong> {currentAccount.substring(0,6)}...{currentAccount.substring(38)}</p>
            <p className='walletInfoText2' ><strong>Сеть:</strong> Siberium Testnet</p>
          </div>
        )}

 


      <h2>Ваши NFT</h2>
      <div id="userNFTs">Загрузка...</div>
    </div>
  )
}

export default App
