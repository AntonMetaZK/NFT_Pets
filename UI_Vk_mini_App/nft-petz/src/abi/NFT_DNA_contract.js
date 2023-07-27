import defaultProvider from "./defaultProvider";
import { Contract } from "ethers";
import { abi } from "./NFT_DNA_abi";

export const nftDna = new Contract(
    "0xEc4A8471524581Ac2847F37f4dcB9765C9bF9E49",
    abi,
    defaultProvider
)