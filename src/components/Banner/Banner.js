import {Container, makeStyles,Typography } from '@material-ui/core';
import React from 'react'
import Image from './3648396.webp';
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
    Banner:{
        // backgroundImage:"url(./ezgif.com-gif-maker.jpg)"
        // background:'url(./ezgif.com-gif-maker.jpg)',
        // minHeight:'80vh'
        backgroundImage:`url(${Image})`
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
    },
}))

const Banner = () => {
    const classes=useStyles();

  return (
    <div className={classes.Banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
            <Typography
            variant="h2"
            style={{
                fontWeight: 'bold',
                marginBottom:15,
                fontFamily:'Montserrat',
            }}
            >Crypto Invest</Typography>
            <Typography
            variant="subtitle2"
            style={{
                color:'darkgrey',
                textTransform:'capitalize',
                fontFamily:'Montserrat',
            }}
            >Get All The Info Regarding Your Favourite Crypto Currency</Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
};

export default Banner;