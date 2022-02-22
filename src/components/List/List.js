import {
  CircularProgress,
  Grid,
  Typograpshy,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Tooltip,
} from "@mui/material";

import { useState, useEffect } from "react";
import { getData } from "../../api";

import TourIcon from "@mui/icons-material/Tour";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { ObjectDetails } from "./ObjectDetails";

import styles from "./List.module.scss";

const List = ({ objects, setObjects, isClicked, setIsClicked }) => {
//   const [isClicked, setIsClicked] = useState([
//     {
//       car: false,
//       parking: false,
//       poi: false,
//     },
//   ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData(isClicked)
      .then((data) => {
        console.log(data);
        setObjects(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [isClicked, setIsClicked, setObjects]);

  return (
    <div className={styles.listContainer}>
      <h1>Lista obiektów</h1>
      <p>Wybierz elementy do wyświetlenia:</p>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={9}>
          <Tooltip title="Samochody">
            <DirectionsCarIcon
              color={isClicked?.car ? "primary" : "disabled"}
              fontSize="large"
              sx={{
                "&:hover": {
                  color: "#1975d2",
                  cursor: "pointer",
                  opacity: 0.8,
                },
              }}
              onClick={() => {
                setIsClicked({
                  car: !isClicked.car,
                  parking: false,
                  poi: false,
                });
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={9}>
          {" "}
          <Tooltip title="Parkingi">
            <LocalParkingIcon
              color={isClicked?.parking ? "primary" : "disabled"}
              fontSize="large"
              sx={{
                "&:hover": {
                  color: "#1975d2",
                  cursor: "pointer",
                  opacity: 0.8,
                },
              }}
              onClick={() => {
                setIsClicked({
                  car: false,
                  parking: !isClicked.parking,
                  poi: false,
                });
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={9}>
          <Tooltip title="POI">
            <TourIcon
              color={isClicked?.poi ? "primary" : "disabled"}
              fontSize="large"
              sx={{
                "&:hover": {
                  color: "#1975d2",
                  cursor: "pointer",
                  opacity: 0.8,
                },
              }}
              onClick={() => {
                setIsLoading(true);
                setIsClicked({
                  car: false,
                  parking: false,
                  poi: !isClicked.poi,
                });
              }}
            />
          </Tooltip>
        </Grid>
      </Grid>

      <Grid container spacing={3} className={styles.list}>
        {isLoading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : objects?.length > 0 ? (
          objects.map((object, i) => {
            return (
              <Grid item key={i} xs={12}>
                <ObjectDetails object={object} />
              </Grid>
            );
          })
        ) : (
          <Grid item key={1} xs={12}>
            <h5>Brak obiektów do wyświetlenia</h5>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default List;
