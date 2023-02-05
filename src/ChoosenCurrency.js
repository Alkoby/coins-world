import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { CoinList } from './data/geckoApi';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import axios from "axios";
import { onSnapshot, doc } from "firebase/firestore";

const Coins = createContext();

const ChoosenCurrency = ({children}) => {
    const [currency,setCurrency] = useState("ILS");
    const [symbol,setSymbol] = useState("₪");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    useEffect(() => {
        if(currency==="ILS") setSymbol("₪");
        else if (currency==="USD") setSymbol("$");
        else if (currency==="EUR") setSymbol("€");
        fetchCoins();
    },[currency]);
 
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        else setUser(null);
      });
    }, []);

    useEffect(() => {
      if (user) {
        const coinRef = doc(db, "watchlist", user?.uid);
        var unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {
            console.log(coin.data().coins);
            setWatchlist(coin.data().coins);
          } else {
            console.log("No Items in Watchlist");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
    }, [user]);

    //get info from API gecko
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
        setCoins(data);
        setLoading(false);
      };

    return (
    <Coins.Provider value={{currency,
      setCurrency,
      symbol,
      user,
      coins,
      loading,watchlist,}}>{children}</Coins.Provider>
  )
};

export default ChoosenCurrency;

export const CoinState = () =>{
    return useContext(Coins)
}