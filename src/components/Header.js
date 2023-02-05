import { AppBar, Container, makeStyles, MenuItem, 
  Select, ThemeProvider, Toolbar, 
  Typography,createTheme, InputLabel,FormControl } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { CoinState } from '../ChoosenCurrency'
import logo from '../images/logo.png'
import LoginAuth from './LoginAuth'
import UserMenu from './UserMenu'
const headerStyles = makeStyles(()=> ({
  title:{
    flex:1,
    fontFamily:"Unbounded",
    fontWeight:"bold",
    cursor:"pointer",
  },
  menu:{
    fontFamily:"Unbounded",
    fontWeight:"bold",
  },
  InputLabel:{
    fontSize:13,
    paddingRight:2,
    paddingLeft:2,
    backgroundColor:"#14161A",
    border: "2px solid #14161A",
    borderRadius:10,
    fontFamily:"Rubik",
    color:"white",
    
  },
  selectField:{
    fontSize:15,
    width:92,
    height:40,
    backgroundColor:"#7BA5EE",
    color:"black",
    fontWeight:400,
    fontFamily:"Rubik"
  },
  containerStyle:{
    textAlign:"center",
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
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const { currency, setCurrency, user} = CoinState();
  return (
    <div className={classes.containerStyle}>
    <ThemeProvider theme={darkTheme} >
    <AppBar color='transparent' position='static'>
      <Container style={{paddingLeft:10,paddingRight:10}} >
        <Toolbar style={{padding:0}}>
        {user ? <UserMenu /> : <LoginAuth />}
          <Typography onClick={()=>history.push("/")}
                      className={classes.title}>
            <img src = {logo} alt="Logo"
            style={{
              height:80,
              marginBottom:10,
              marginTop:10,
            }}/>
          </Typography >
          <FormControl variant="outlined">
           <InputLabel  
           className={classes.InputLabel} id="demo-simple-select-outlined-label"> Currency </InputLabel>
          <Select 
          labelId="demo-simple-select-outlined-label"
          
          onChange={handleChange}
          label="Currency"
          value={currency}
          className={classes.selectField}
          >
            <MenuItem value={"ILS"}>₪ ILS</MenuItem>
            <MenuItem value={"USD"}>$ USD</MenuItem> 
            <MenuItem value={"EUR"}>€ EUR</MenuItem>
          </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider></div>
  )
}

export default Header