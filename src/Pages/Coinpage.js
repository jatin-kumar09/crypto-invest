import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { LinearProgress, makeStyles, ThemeProvider, createTheme, Typography, Button } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../components/Banner/Carousel';
import { Select, MenuItem } from "@material-ui/core";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",

    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const Coinpage = () => {
  const [languages, setLanguages] = useState(['en'])
  const [choosenLanguage, setChoosenLanguage] = useState('en')
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, setAlert, watchlist } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
    const { description } = data;
    let arr = []
    for (let i in description) if (description[i].length > 0) arr.push(i)
    console.log(arr)
    setLanguages([...arr])
  };

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    }
    catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {coin?.name}
          </Typography>
          <Select variant="outlined" style={{
            width: 100,
            height: 40,
            marginLeft: 15,
          }}
            value={choosenLanguage}
            onChange={(e) => {
              setChoosenLanguage(e.target.value)
              console.log(e.target.value)
            }}
          >

            {
              languages.map((language, i) => (

                <MenuItem value={language} key={language}>{language}</MenuItem>
              ))
            }

          </Select>
          <Typography variant="subtitle1" className={classes.description}>
            {ReactHtmlParser(coin?.description[choosenLanguage].split(". ")[0])}.
          </Typography>
          <div className={classes.marketData}>
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' className={classes.heading}>
                Rank:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant='h5'
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant='h5'
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' className={classes.heading}>
                Market Cap:{" "}
              </Typography>
              &nbsp;&nbsp;
              <Typography variant='h5'
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}M
              </Typography>
            </span>
            {user && (
              <Button
                variant="outlined"
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: inWatchlist ? "#ff0000" : "#eebc1d",
                }}
                onClick={inWatchlist ? removeFromWatchlist : addToWatchList}
              >{inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}</Button>
            )}
          </div>
        </div>
        {/* chart */}
        <CoinInfo coin={coin} />
      </div>
    </ThemeProvider>
  )
}

export default Coinpage