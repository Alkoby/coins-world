import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../data/geckoApi";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { CoinState } from "../ChoosenCurrency";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import SelectChartTime from "./SelectChartTime";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CoinState();
  const [flag,setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    //get info Async (wait for data to arrive)
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

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
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "#2596be"}}
            size={250}
            thickness={1}
          />
        ) : (
          <>
          <h2 style={{
            fontFamily:"Rubik",
            fontWeight:100,
            bold:false,
            color:"cornflowerblue" 
          }}>
          Price Past {days} Days in {currency}
          </h2>
          <div
              style={{
                display: "flex",
                marginTop: 20,
                marginBottom: 10,
                justifyContent: "center",
                width: "105%",
              }}
            >
              <SelectChartTime
                  key={1}
                  onClick={() => {setDays(1);
                    setflag(false);
                  }}
                  selected={1 === days}>
                  {"1d"}
              </SelectChartTime>
              <SelectChartTime
                  key={7}
                  onClick={() => {setDays(7);
                    setflag(false);
                  }}
                  selected={7 === days}>
                  {"7d"}
              </SelectChartTime>
              <SelectChartTime
                  key={30}
                  onClick={() => {setDays(30);
                    setflag(false);
                  }}
                  selected={30 === days}>
                  {"1m"}
              </SelectChartTime>  
              <SelectChartTime
                    key={90}
                    onClick={() => {setDays(90);
                      setflag(false);
                    }}
                    selected={90 === days}>
                    {"3m"}
                 </SelectChartTime> 
                 <SelectChartTime
                    key={180}
                    onClick={() => {setDays(180);
                      setflag(false);
                    }}
                    selected={180 === days}>
                    {"6m"}
                 </SelectChartTime>
                 <SelectChartTime
                    key={365}
                    onClick={() => {setDays(365);
                      setflag(false);
                    }}
                    selected={365 === days}>
                    {"1y"}
                 </SelectChartTime>
                 <SelectChartTime
                    key={1095}
                    onClick={() => {setDays(1095);
                      setflag(false);
                    }}
                    selected={1095 === days}>
                    {"3y"}
                 </SelectChartTime>
                 <SelectChartTime
                    key={1825}
                    onClick={() => {setDays(1825);
                      setflag(false);
                    }}
                    selected={1825 === days}>
                    {"All"}
                 </SelectChartTime>
            </div>
            <Line 
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =   
                       `${date.getHours()}:${date.getMinutes()}`;
                  return days === 1 ? time : date.toLocaleDateString("he-IL");
                }),

                datasets: [
                  {
                    fill: {
                      target: 'origin',
                      above: '#6495ed',  
                      below: '#6495ed',
                      
                    },
                    data: historicData.map((coin) => coin[1]),
                    borderColor: "white",
                  },
                ],
              }}
              options={{
                
                plugins: {
                  legend: {
                     display: false
                  },
               },
                elements: {
                  point: {
                    radius: 1,
                  },
                  
                },
                
                
                
                }}
              
            />
            

          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;