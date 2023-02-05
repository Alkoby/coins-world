import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Tab, Tabs, AppBar, Box } from "@material-ui/core";
import { useState } from "react";
import SignIn from './SignIn';
import SignUp from './SignUp';
import { CoinState } from '../ChoosenCurrency';
import GoogleButton from "react-google-button"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
const useStyles = makeStyles((theme) => ({

  modal: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    width:"80%",
    borderRadius:15,
  },
  LoginBtn:{
    fontSize:15,
    width:"92",
    height:40,
    backgroundColor:"#7BA5EE",
    color:"black",
    fontWeight:400,
    fontFamily:"Rubik"
  },
  appBarStyle:{
    background:"transparent", 
    color:"white",
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));


export default function LoginAuth() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.LoginBtn}
        onClick={handleOpen}
      >
        login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar 
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs  
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
                
              >
                <Tab label="Sign in" style={{fontFamily:"Rubik"}} />
                <Tab label="Sign Up" style={{fontFamily:"Rubik"}}/>
              </Tabs>
            </AppBar>
            {value === 0 && <SignIn handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box className={classes.google}>

              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}