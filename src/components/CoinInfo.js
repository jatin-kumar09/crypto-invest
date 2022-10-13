import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { makeStyles, createTheme, ThemeProvider, CircularProgress } from '@material-ui/core';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

ChartJS.register(...registerables)

const useStyles = makeStyles(theme => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

  console.log("data", historicData);

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* chart */}
        {
          !historicData ? (
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1} />
          ) : (<>
            <Line
              data={{
                labels: historicData.map(coin => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                      : `${date.getHours()}: ${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [{
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                }],
              }}
              options={{
                elements:{
                  point:{
                    radius:1,
                  },
                },
              }}
            />
          </>
          )}

        {/* buttons */}

        <div 
        style={{
          display: 'flex',
          marginTop: 20,
          justifyContent: 'space-around',
          width:"100%",
        }}
        >
          {chartDays.map(day=>(
            <SelectButton
            key={day.value}
            onClick={()=>setDays(day.value)}
            selected={day.value===days}>{day.label}</SelectButton>
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo;