import "./App.css";
import Header from "./components/Header/Header";
import Legend from "./components/Legend/Legend";
import Map from "./components/Map/Map";
import List from "./components/List/List";

import { CssBaseline, Grid } from "@material-ui/core";
import { useState } from "react";

function App() {
  const [objects, setObjects] = useState([]);
  const [isClicked, setIsClicked] = useState([
    {
      car: false,
      parking: false,
      poi: false,
    },
  ]);

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            objects={objects}
            setObjects={setObjects}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
          {/* <h3>Designed & Developed</h3>
          <h3>2022 Piotr Śmietanka</h3> */}
        </Grid>
        <Grid item xs={12} md={8}>
          <Map objects={objects} isClicked={isClicked} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
