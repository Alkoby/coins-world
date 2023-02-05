import {Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const webStyles = makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner2.png)",
        
    },
    bannerSection:{
        height:300,
        display:"flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
        
    },
    tagline:{
        display:"flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor:'rgba(255, 255, 255, 0.07)',
        width:"100%",
        height:"85%",
        borderRadius:"50%",     
    }
   
}));

const Banner = () => {
    const classes = webStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerSection}>
            <div className={classes.tagline}>
                <Typography variant ="h2"
                    style={{
                        fontWeight:"bold",
                        marginBottom:15,
                        fontFamily:"Rubik",
                    }}>
                    Coins World
                </Typography>
                <Typography variant ="subtitle1"
                    style={{
                        color:"grey",
                        fontFamily:"Rubik",
                        marginBottom:3,
                    }}>
                    The Largest Coins Tracking Website In The WORLD
                </Typography>
                <Typography variant ="subtitle2"
                    style={{
                        color:"grey",
                        fontFamily:"Rubik",
                        
                    }}>
                    by Naor Alkoby
                </Typography>

            </div>
        </Container>
    </div>
  )
}

export default Banner