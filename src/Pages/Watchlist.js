import React from 'react'
import Banner from "../components/Banner"
import CoinsTable from '../components/CoinsTable'
import Footer from '../components/Footer'
import WatchlistTable from '../components/WatchlistTable'

const Watchlist = () => {
    return (
        <>
          <Banner/>
          <WatchlistTable/>
          <Footer/>
          {window.scroll(0,400)}
        </>
      )
    }
    


export default Watchlist