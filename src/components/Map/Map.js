import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./Map.module.scss";
import mapStyles from "./mapStyles";

import { Tooltip, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";

import TourIcon from "@mui/icons-material/Tour";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Map = ({ objects }) => {
  const coordinates = { lat: 52.237049, lng: 19.017532 };
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={7}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, styles: mapStyles }}
        onChange={""}
        onChildClick={""}
      >
        {objects?.map((place, i) => {
          return (
            <div
              className={styles.markerContainer}
              lat={place.location.latitude}
              lng={place.location.longitude}
              key={i}
            >
              {place.discriminator === "vehicle" && (
                <Tooltip title={place.name}>
                  <DirectionsCarIcon
                    key={i}
                    lat={Number(place.location.latitude)}
                    lng={Number(place.location.longitude)}
                    color="primary"
                    fontSize="large"
                    onClick={(e) => setIsOpen(true)}
                  />
                </Tooltip>
              )}
              {place.discriminator === "parking" && (
                <Tooltip title={place?.name}>
                  <LocalParkingIcon
                    key={i}
                    lat={Number(place.location.latitude)}
                    lng={Number(place.location.longitude)}
                    color="primary"
                    fontSize="large"
                  />
                </Tooltip>
              )}

              {place.discriminator === "poi" && (
                <Tooltip title={place.name}>
                  <TourIcon
                    key={i}
                    lat={Number(place.location.latitude)}
                    lng={Number(place.location.longitude)}
                    color="primary"
                    fontSize="large"
                  />
                </Tooltip>
              )}

              {isOpen && (
                <Modal open={isOpen} onClose={handleClose} id="modal-container">
                  <Box>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                  </Box>
                </Modal>
              )}
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
