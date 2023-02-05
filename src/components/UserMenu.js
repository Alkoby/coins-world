import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CoinState } from "../ChoosenCurrency";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { useHistory } from 'react-router-dom';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    
  },
})((props) => (
  <Menu style={{width:92}}
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    
  },
}))(MenuItem);

export default function UserMenu() {
  const {user} = CoinState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const logOut = () => {
    signOut(auth);
      //message: "Logout Successfull !",

  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoWatchList = () => {
    handleClose();
    history.push(`/watchlist`);
  };
  return (
    <div>
      <Button
    style={{
    fontSize:15,
    width:92,
    height:40,
    backgroundColor:"#7BA5EE",
    color:"black",
    fontWeight:400,
    fontFamily:"Rubik"
        }}
        onClick={handleClick}
      >
        {user?.email.split('@')[0]}
      </Button>
      <StyledMenu style={{textAlign:"center"}}

        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem >

          <ListItemText onClick={gotoWatchList} 
          primary="Watch List" style={{textAlign:"center"}} />
        </StyledMenuItem>
        <StyledMenuItem>


          <ListItemText onClick={logOut} primary="Log Out" style={{textAlign:"center"}}/>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}