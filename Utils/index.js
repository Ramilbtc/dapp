import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
    TOKEN_ADDRESS,
    TOKEN_ABI,
    TOKEN_SALE_ABI,
    TOKEN_SALE_ADDRESS
} from "../Context/constants";

export const CheckIfWalletConnected = async () => {
    try {
        if (!window.ethereum) {
            console.log('не подключился к кошельку');
        }

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error, "чек иф воллет")
    }
};

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            console.log('инсталл метамаск');
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })

        const firstAccount = accounts[0];
        window.location.reload();
        return firstAccount;
    } catch (error) {
        console.log(error, "чек иф коннектволлет")
    }
};


const fetchTokenContract = (signerOrProvider) => new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signerOrProvider);


export const connectingTOKENCONTRACT = async () => {
    try {
        const web3modal = new Web3Modal();
        const connecting = web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connecting);
        const signer = provider.getSigner();
        const contract = fetchTokenContract(signer);
        return contract;

    } catch (error) {
        console.log(error, "чек иф коннекbyuволлет");
    }
};


export const getBalance = async () => {
    try {
        const web3modal = new Web3Modal();
        const connecting = web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connecting);
        const signer = provider.getSigner();
        return await signer.getBalance();

    } catch (error) {
        console.log(error, "чек иф коннекbyuволлет");
    }
};


const fetchToken_SALE_Contract = (signerOrProvider) => new ethers.Contract(TOKEN_SALE_ADDRESS, TOKEN_SALE_ABI, signerOrProvider);

export const connectingTOKENSALECONTRACT = async () => {
    try {
        const web3modal = new Web3Modal();
        const connecting = web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connecting);
        const signer = provider.getSigner();
        const contract = fetchToken_SALE_Contract(signer);
        return contract;

    } catch (error) {
        console.log(error, "чек иф коннекbyuволлет");
    }
};
