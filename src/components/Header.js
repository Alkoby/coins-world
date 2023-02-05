import { AppBar, Container, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography,createTheme } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { CoinState } from '../CoinsData'

const headerStyles = makeStyles(()=> ({
  title:{
    flex:1,
    color:"#4290f5",
    fontFamilit:"Unbounded",
    fontWeight:"bold",
    cursor:"pointer",
  }
}))



const Header = () => {
  const classes = headerStyles();
  
  const history = useHistory();
  
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main:"#fff",
      }
    },
  });

  const { currency, setCurrency} = CoinState();
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography onClick={()=>history.push("/")}
                      className={classes.title}>
            Coins World
          </Typography >
          <Select variant="outlined"
          style={{
            width:120,
            height:40,
            marginRight:15,
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}>
            <MenuItem value={"NIS"}>ILS</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem> 
            <MenuItem value={"EUR"}>EUR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header