import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Coin from "./Pages/Coin";
import Home from "./Pages/Home";
import Watchlist from "./Pages/Watchlist";

function App() {

  const webStyles = makeStyles(() =>({
    App:{ 
      backgroundColor: "#14161b",
      color:"white",
      minHeight: "100vh",

    },
  }));

  const classes = webStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Route path="/" component={Home} exact/>
        <Route path="/coin/:id" component={Coin}/>
        <Route path="/watchlist" component={Watchlist}/>
      </div>   
    </BrowserRouter>
  );
}

export default App;
