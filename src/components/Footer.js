import React from 'react'
import { makeStyles } from '@material-ui/core'
const footerStyles = makeStyles(()=> ({
  title:{
    padding:12,
    color:"#4290f5",
    fontFamily:"Rubik",
    fontWeight:400,
    flexDirection: "column",
    textAlign: "center",
    width:"100%",
    backgroundColor:'rgba(255, 255, 255, 0.07)',
  },
  menu:{
    color:"#4290f5",
    fontFamily:"Rubik",
    fontWeight:"bold",
  }
}))

const Footer = () => {
  const classes = footerStyles();
  return (
    <div className={classes.title}>
© 2023 Copyright: Coins-World ©<br/><br/>
But I Don't Care

    </div>
  )
}

export default Footer