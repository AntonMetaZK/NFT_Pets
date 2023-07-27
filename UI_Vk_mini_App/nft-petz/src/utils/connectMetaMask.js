const connectMetaMask = async ()=>{
    if(!window?.ethereum){
        throw new Error("MetaMask is not installed");
    }

    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x1b198",
            rpcUrls: ["https://rpc.test.siberium.net"],
            chainName: "Siberium Test Network",
            nativeCurrency: {
                name: "SIBR",
                symbol: "SIBR",
                decimals: 18
            },
            blockExplorerUrls: ["https://explorer.test.siberium.net/"]
        }]
    });

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [], 
    });
    return accounts[0];
}

export default connectMetaMask;