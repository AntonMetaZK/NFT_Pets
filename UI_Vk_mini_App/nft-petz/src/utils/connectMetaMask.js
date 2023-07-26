const connectMetaMask = async ()=>{
    if(!window?.ethereum){
        throw new Error("MetaMask is not installed");
    }
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [], 
    });
    return accounts[0];
}

export default connectMetaMask;