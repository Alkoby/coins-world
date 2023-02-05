import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';


const Coins = createContext();

const CoinsData = ({children}) => {
    const [currency,setCurrency] = useState("NIS");
    const [symbol,setSymbol] = useState("₪");

    useEffect(() => {
        if(currency==="NIS") setSymbol("₪");
        else if (currency==="USD") setSymbol("$");
        else if (currency==="EUR") setSymbol("€");
    },[currency]);
 
    return (
    <Coins.Provider value={{currency,symbol,setCurrency}}>{children}</Coins.Provider>
  )
};

export default CoinsData;

export const CoinState = () =>{
    return useContext(Coins)
}