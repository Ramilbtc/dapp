import React from "react";

import { useStateContext } from "../Context";

const index = () => {
  const {
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
  } = useStateContext();
  return (
    <div>
      <h1>{TOKEN_ICO}</h1>
      <button onClick={() => transferNativeToken()}>TRANSFER</button>
    </div>);
};

export default index;
