import TourIcon from "@mui/icons-material/Tour";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import styles from "./Cluster.module.scss";

import { Tooltip, Modal, Box, Typography } from "@mui/material";

const Cluster = ({ discriminator, lat, lng, id, pointCount, pointsSize }) => {
  return (
    <div className={styles.clusterContainer} lat={lat} lng={lng} key={id}>
      <div className={styles.count}>{pointCount}</div>
      {discriminator === "vehicle" && (
        <Tooltip title="Pokaż więcej">
          <DirectionsCarIcon
            key={id}
            lat={Number(lat)}
            lng={Number(lng)}
            color="primary"
            fontSize="large"
          />
        </Tooltip>
      )}
      {discriminator === "parking" && (
        <Tooltip title="Pokaż więcej">
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
        <Tooltip title="Pokaż więcej">
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

export default Cluster;
