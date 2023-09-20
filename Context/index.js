import React, { useState, useEffect, createContext, useContext } from 'react'
import { ethers } from "ethers";

import {
    CheckIfWalletConnected,
    connectWallet,
    connectingTOKENCONTRACT,
    getBalance,
    connectingTOKENSALECONTRACT
} from '../Utils';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const TOKEN_ICO = "TOKEN SALE DAPP";

    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [nativeToken, setNativeToken] = useState("");
    const [tokenHolders, setTokenHolders] = useState([]);
    const [tokenSale, setTokenSale] = useState("");
    const [currentHolder, setCurrentHolder] = useState("");


    const fetchInitialData = async () => {
        try {
            const account = await CheckIfWalletConnected();
            const balance = await getBalance();
            setBalance(ethers.utils.formatEther(balance.toString()));
            setAddress(account);

            const TOKEN_CONTRACT = await connectingTOKENCONTRACT();
            let tokenbalance;
            if (account) {
                tokenbalance = await TOKEN_CONTRACT.balanceOf(account);
            } else {
                tokenbalance = 0;
            };

            const tokenName = await TOKEN_CONTRACT.name();
            const tokenSymbol = await TOKEN_CONTRACT.symbol();
            const tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
            const tokenStandard = await TOKEN_CONTRACT.standard();
            const tokenHolders = await TOKEN_CONTRACT._useId();
            const tokenOwnerOfContract = await TOKEN_CONTRACT.ownerOfContract();
            const tokenAddress = await TOKEN_CONTRACT.address;

        } catch (error) {
            console.log(error, "context")
        }
    }


    return (<StateContext.Provider value={{ TOKEN_ICO }}>
        {children}
    </StateContext.Provider>)
}

export const useStateContext = () => useContext(StateContext);