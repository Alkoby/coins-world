import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { CoinState } from '../ChoosenCurrency';
import { useState } from "react";
import axios from 'axios';
import { SingleCoin } from '../data/geckoApi';
import {
  LinearProgress, Typography, makeStyles, Button
} from "@material-ui/core";
import { numberWithCommas } from "../components/CoinsTable";
import CoinInfo from '../components/CoinInfo';
import Moment from 'moment';
import Footer from '../components/Footer';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist} = CoinState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  const inWatchlist = watchlist.includes(coin?.id);
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );


        //message: `${coin.name} Added to the Watchlist !`,

    } catch (error) {

        //message: error.message,

    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

        //message: `${coin.name} Removed from the Watchlist !`,

    } catch (error) {
        //message: error.message,
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop:20

    },
    heading: {
      fontWeight: "bold",
      marginBottom: 10,
      fontFamily: "Rubik",

    },
    marketData: {
      alignSelf: "start",
      paddingTop: 10,
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
      alignItems: "center",
      
    },
    coinName:{  
      fontSize:30,
      fontFamily: "Rubik",
      fontWeight: "bold",
      color:"white",
      display:"flex",
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    backGroundHead:{
      backgroundColor:'rgba(100, 149, 237, 0.1)',
      width:"100%",
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
    }
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#2596be" }} />;

  return (
      <div className={classes.container}>
        <span className={classes.backGroundHead}>
        <div className={classes.coinName}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="110"
          style={{ marginBottom: 10, marginTop:10 }}
        />
        &nbsp;&nbsp;
        {coin?.name}
        
        </div>
        
        <div className={classes.marketData}>

          {user && (
            <Button
              variant="outlined"
              style={{
                marginBottom:15,
                width:250,
                height: 40,
                fontFamily:"Rubik",
                fontSize:16,
                backgroundColor: inWatchlist ? "#ff7b7b" : "#7BA5EE",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>   
          )}
        <span style={{ display: "flex" }}>    
            <Typography variant="h5" className={classes.heading}>
              Last Update:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Rubik",
              }}
            >
             {Moment(coin?.last_updated).locale('he').format('D MMM YY |  HH:mm:ss')}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Rubik",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
            
          </span>
          
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Rubik",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          <span style={{ display: "flex" }}>    
            <Typography variant="h5" className={classes.heading}>
              24 Low:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Rubik",
              }}
            >
             {symbol}{" "}
             {numberWithCommas(coin?.market_data.low_24h[currency.toLowerCase()]
                  .toString())}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>    
            <Typography variant="h5" className={classes.heading}>
              24 High:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Rubik",
              }}
            >
             {symbol}{" "}
             {numberWithCommas(coin?.market_data.high_24h[currency.toLowerCase()]
                  .toString())}
            </Typography>
            
          </span>
          <span style={{ display: "flex" }}>    
            <Typography variant="h5" className={classes.heading}>
              24 Change:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Rubik",
              }}
            >
          
          <span style={{
                              fontSize:14,
                              color:coin?.market_data.price_change_percentage_24h > 0 ? "rgb(108, 207, 89)" : "rgb(255, 77, 77)",
                              fontWeight: 600,
                              borderRadius: 5,
                              padding: 5,
                              paddingLeft: 5,
                              paddingRight: 5,
                              fontFamily: "Rubik",
                              backgroundColor:coin?.market_data.price_change_percentage_24h > 0 ? "rgb(1, 28, 12)" : "rgb(26, 7, 7)",

                            }}>
         {coin?.market_data.price_change_percentage_24h} 
         {coin?.market_data.price_change_percentage_24h > 0? " ⇧" : " ⇩"}
         </span>
            </Typography>
          </span>
          
        </div>
        </span>
      <CoinInfo coin={coin} />
      <Footer/>
    </div>
  );
};

export default Coin