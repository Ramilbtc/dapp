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
            setBalance(balance);
            setAddress(account);

            const TOKEN_CONTRACT = await connectingTOKENCONTRACT();
            let tokenBalance;
            if (account) {
                tokenBalance = await TOKEN_CONTRACT.balanceOf(account);
            } else {
                tokenBalance = 0;
            };

            const tokenName = await TOKEN_CONTRACT.name();
            const tokenSymbol = await TOKEN_CONTRACT.symbol();
            const tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
            const tokenStandard = await TOKEN_CONTRACT.standard();
            const tokenHolders = await TOKEN_CONTRACT._useId();
            const tokenOwnerOfContract = await TOKEN_CONTRACT.ownerOfContract();
            const tokenAddress = await TOKEN_CONTRACT.address;

            const nativeToken = {
                tokenAddress: tokenAddress,
                tokenName: tokenName,
                tokenSymbol: tokenSymbol,
                tokenOwnerOfContract: tokenOwnerOfContract,
                tokenStandard: tokenStandard,
                tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply.toString()),
                tokenBalance: ethers.utils.formatEther(tokenBalance.toString()),
                tokenHolders: tokenHolders.toNumber()
            };

            setNativeToken(nativeToken);

            const getTokenHolder = await TOKEN_CONTRACT.getTokenHolder();
            setTokenHolders(getTokenHolder);

            if (account) {
                const getTokenHolderData = await TOKEN_CONTRACT.getTokenHolderData(account);
            }

            const currentHolder = {
                tokenId: getTokenHolderData[0].toNumber(),
                from: getTokenHolderData[1],
                to: getTokenHolderData[2],
                totalToken: ethers.utils.formatEther(getTokenHolderData[3].toString()),
                from: getTokenHolderData[4],
            }

            setCurrentHolder(currentHolder);

            // TOKEN SALE CONTRACT

            const TOKEN_SALE_CONTRACT = await connectingTOKENSALECONTRACT();
            const tokenPrice = await TOKEN_SALE_CONTRACT.tokenPrice();
            const tokensSold = await TOKEN_SALE_CONTRACT.tokensSold();
            const tokenSaleBalance = await TOKEN_CONTRACT.balanceOf("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

            const tokenSale = {
                tokenPrice: ethers.utils.formatEther(tokenPrice.toString()),
                tokenSold: tokensSold.toNumber(),
                tokenSaleBalance: ethers.utils.formatEther(tokenSaleBalance.toString()),
            };

            setTokenSale(tokenSale);
            console.log(tokenSale);
            console.log(currentHolder);
            console.log(nativeToken);

        } catch (error) {
            console.log(error, "context")
        }
    };

    useEffect(() => {
        fetchInitialData()
    }, [])

    const buyToken = async (nToken) => {
        try {
            const amount = ethers.utils.parseUnits(nToken.toString(), "ether");
            const contract = await connectingTOKENSALECONTRACT();
            const buying = await contract.buyToken(nToken, {
                value: amount.toString(),
            });

            await buying.wait();
            console.log(buying);
            window.location.reload();
        } catch (error) {
            console.log(error, "buy tokenssss")
        }
    };

    const transferNativeToken = async () => {
        try {
            const TOKEN_SALE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
            const TOKEN_AMOUNT = 500;
            const tokens = TOKEN_AMOUNT.toString();
            const transferAmount = ethers.utils.parseEther(tokens);

            const contract = await connectingTOKENCONTRACT();
            const transaction = await contract.transfer(
                TOKEN_SALE_ADDRESS,
                transferAmount
            );

            await transaction.wait();
            window.location.reload();
            console.log(contract, "cosssssss")
        } catch (error) {
            console.log(error);
        }
    };


    return (<StateContext.Provider value={{
        TOKEN_ICO,
        transferNativeToken,
        buyToken,
        connectWallet,
        setAddress,
        currentHolder,
        tokenSale,
        tokenHolders,
        nativeToken,
        balance,
        address
    }}>
        {children}
    </StateContext.Provider>)
}

export const useStateContext = () => useContext(StateContext);