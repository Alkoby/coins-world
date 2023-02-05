import React from 'react'
import { Box, Button, TextField, } from "@material-ui/core";
import { Alert} from '@material-ui/lab';
import { useState } from "react";
import { CoinState } from "../ChoosenCurrency";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const SignIn = (handleClose) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) {
          //DO SOMETHING
          setError("Please fill up fields")
          return;
        }
    
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
            //DO message: `Sign Up Successful. Welcome ${result.user.email}`,
          console.log(result)
          handleClose();
        } catch (error) {
          setError("Password and email not math")
          return;
        }
      };
    
      return (
        <Box
          p={3}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            variant="outlined"
            type="email"
            label="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField 
            variant="outlined"
            label="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            style={{ backgroundColor: "#7BA5EE",fontFamily:"Rubik", fontWeight:800}}
          >
            Login
          </Button>
          
          {error ? <Alert severity="error">{error}</Alert>:<div></div> }
      
        </Box>
      );
    };
    
export default SignIn