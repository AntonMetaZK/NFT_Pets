import walletProvider from "./walletProvider";
import { nftDna } from "./NFT_DNA_contract";

export const getNftDnaWithSigner = async () =>{
    const signer = await walletProvider.getSigner()
    const nftDnaWithSigner = nftDna.connect(signer)
    return nftDnaWithSigner;
}