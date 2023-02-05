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
  export default function CoinsTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
  
    const { symbol, coins, loading } = CoinState();
  
    const useStyles = makeStyles({
      //for every row in table
      row: {
        backgroundColor: "#131417",
        cursor: "pointer",
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
  
    
  
   
  
    //serach option
    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||   // name lower case
          coin.symbol.toLowerCase().includes(search) || // short name lower case
          coin.name.toUpperCase().includes(search) ||     // name upper case
          coin.symbol.toUpperCase().includes(search) ||   // short name upper case
          coin.name.includes(search)                    // exact name

      );
    };
  
    return (
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Rubik", fontWeight:"300", fontSize:24}}
          >
            Coins Prices by Market Cap
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
                  <TableRow >
                    {[ "Rank","Coin", "Market Cap", "Price"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "800",
                          fontFamily:"Rubik",
                          textAlign:"center"
                        }}
                        key={head}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody >
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      //profit to set design red/green
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow 
                          onClick={() => history.push(`/coin/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                          
                        >
                            <TableCell align="center" style={{fontFamily: "Rubik", padding:8,fontWeight: 300}}>
                            #{row.market_cap_rank}
                          </TableCell>

                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 12,
                              fontFamily: "Rubik",
                              fontWeight: 300,
                              paddingRight:8,
                              paddingLeft:8,
                              paddingBottom:20,
                              justifyContent:"center"
                              
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="40"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 18,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey",fontSize:12 }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="center" style={{fontFamily: "Rubik", 
                          paddingRight:6, fontWeight: 300,paddingLeft:6}}>
                          <div class="hovertext" data-hover={numberWithCommas(row.market_cap + symbol)}
                              style={{display:"inline-flex",flexDirection: "column", textAlign:"center" }}>
                            {symbol}{""}
                            {}
                            {nFormatter(row.market_cap,1)}
                            </div>
                          </TableCell>                        
                          <TableCell align="center" style={{fontFamily: "Rubik", fontWeight: 300,paddingRight:4,paddingLeft:4}}>
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
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
  
          {/* Comes from @material-ui/lab */}
          <Pagination variant="outlined" shape="rounded"
            count={(handleSearch()?.length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              //go top table after every turn a page
              window.scroll(0, 400);
            }}
          />
        </Container>
      </ThemeProvider>
    );
  }