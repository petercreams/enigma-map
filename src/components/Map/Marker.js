import TourIcon from "@mui/icons-material/Tour";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import styles from "./Marker.module.scss";

import { Tooltip, Modal, Box, Typography } from "@mui/material";

const Marker = ({ discriminator, name, lat, lng, id, pointCount }) => {
  return (
    <div
      className={styles.markerContainer}
      lat={lat}
      lng={lng}
      key={id}
    >
      {discriminator === "vehicle" && (
        <Tooltip title={name}>
          <DirectionsCarIcon
            key={id}
            lat={Number(lat)}
            lng={Number(lng)}
            color="primary"
            fontSize="large"
            // onClick={(e) => setIsOpen(true)}
          />
        </Tooltip>
      )}
      {discriminator === "parking" && (
        <Tooltip title={name}>
          <LocalParkingIcon
            key={id}
            lat={Number(lat)}
            lng={Number(lng)}
            color="primary"
            fontSize="large"
          />
        </Tooltip>
      )}

      {discriminator === "poi" && (
        <Tooltip title={name}>
          <TourIcon
            key={id}
            lat={Number(lat)}
            lng={Number(lng)}
            color="primary"
            fontSize="large"
          />
        </Tooltip>
      )}
    </div>
  );
};

export default Marker;
