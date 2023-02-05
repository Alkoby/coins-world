import { useEffect, useState } from 'react'
import { CoinState } from '../ChoosenCurrency';
import { makeStyles } from "@material-ui/core/styles";
import createTheme from '@material-ui/core/styles/createTheme';
import {
    Container,TableCell,LinearProgress,ThemeProvider,
    Typography,TextField,TableBody,TableRow,
    TableHead,TableContainer,Table,Paper,
  } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import Pagination from "@material-ui/lab/Pagination";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";

// Function to shorten a number by adding "Thousand,Million,Billion"
// (found in stackoverflow)
export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

// function to add commas to number, also found in stackoverflow 
export function numberWithCommas(x) {
    new Intl.NumberFormat();
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  export default function WatchlistTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { symbol, coins, loading, watchlist,user } = CoinState();
  
    const useStyles = makeStyles({
      //for every row in table
      cell:{
        cursor: "pointer",
        fontFamily: "Rubik", 
        fontWeight: 300,
        padding:8,
      },
      row: {
        backgroundColor: "#131417",
        
        
        "&:hover": {
          backgroundColor: "#000000",
        },
        fontFamily: "Rubik",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "#7BA5EE",
        },
      },
    });
  
    const classes = useStyles();
    const history = useHistory();
    const darkTheme = createTheme({
      palette: {
        primary: {
          main: "#fff",
        },
        type: "dark",
      },
    });
  
    const removeFromWatchlist = async (coin) => {
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
  
   
  
    //serach option
    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.id.toLowerCase().includes(search) ||   // name lower case
            coin.symbol.toLowerCase().includes(search) || // short name lower case
            coin.id.toUpperCase().includes(search) ||     // name upper case
            coin.symbol.toUpperCase().includes(search) ||   // short name upper case
            coin.id.includes(search)                    // exact name
  
        );
      };
  
    return (
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Rubik", fontWeight:"300", fontSize:24}}
          >
           {user?.email.split('@')[0]} Watch List
          </Typography>
          <TextField
            label="Search For a Coin.."
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "cornflowerblue" }} />
            ) : (
              <Table >
                <TableHead style={{ backgroundColor: "#7BA5EE" }}>
                  <TableRow>
                    {["Coin", "Market Cap", "Price","Delete"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "800",
                          fontFamily:"Rubik",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody >
                  {handleSearch()
                   .map((row) => {
                            if (watchlist.includes(row.id)){

                            
                      //profit to set design red/green
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow  
                          className={classes.row}
                          key={row.name}
                        >


                          <TableCell onClick={() => history.push(`/coin/${row.id}`)}
                            component="th"
                            scope="row"
                            className={classes.cell}
                            style={{
                              display: "flex",
                              gap: 12,
                              fontFamily: "Rubik",
                              fontWeight: 300
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right" className={classes.cell} onClick={() => history.push(`/coin/${row.id}`)}>
                          <div class="hovertext" data-hover={numberWithCommas(row.market_cap + symbol)}
                              style={{display:"inline-flex",flexDirection: "column", textAlign:"center" }}>
                            {symbol}{""}
                            {}
                            {nFormatter(row.market_cap,1)}
                            </div>
                          </TableCell>                        
                          <TableCell align="right" className={classes.cell} onClick={() => history.push(`/coin/${row.id}`)}>
                          <div class="hovertext" data-hover={numberWithCommas(row.current_price+ symbol)}
                              style={{display:"inline-flex",flexDirection: "column", textAlign:"center" }}>
                            
                            <span>
                            {symbol}{""}
                            {row.current_price > 1000 ? 
                            nFormatter(row.current_price,2)
                            :numberWithCommas(row.current_price.toFixed(2))
                    }
                            {}
                            
                            </span>
                            <span 
                            style={{
                              fontSize:14,
                              color:profit > 0 ? "rgb(108, 207, 89)" : "rgb(255, 77, 77)",
                              fontWeight: 600,
                              borderRadius: 5,
                              padding: 5,
                              
                              fontFamily: "Rubik",
                              backgroundColor:profit > 0 ? "rgb(1, 28, 12)" : "rgb(26, 7, 7)",

                            }}>
                                {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                            </span>
                            </div>
                               
                          </TableCell>
                          <TableCell style={{textAlign:'center',}}>
                          <AiFillDelete
                              style={{ cursor: "pointer",
                                }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(row)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    }})}
                </TableBody>
              </Table>
            )}
          </TableContainer>
  
        </Container>
      </ThemeProvider>
    );
  }