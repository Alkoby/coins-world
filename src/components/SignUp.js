import { Box, Button, TextField, } from "@material-ui/core";
import { Alert} from '@material-ui/lab';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { CoinState } from "../ChoosenCurrency";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError] = useState("");


  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Password and Confrim Password not match")
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      handleClose();
    } catch (error) {
      console.log(error)
      setError("Invalid Email")
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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button 
        variant="contained"
        size="large"
        style={{ backgroundColor: "#7BA5EE",fontFamily:"Rubik", fontWeight:800 }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      {error ? <Alert severity="error">{error}</Alert>:<div></div> }
    </Box>
  );
};


export default SignUp;