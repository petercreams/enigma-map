import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./Map.module.scss";
import mapStyles from "./mapStyles";

import { Tooltip, Modal, Box, Typography, Popover, Grid } from "@mui/material";
import { useState, useRef } from "react";

import TourIcon from "@mui/icons-material/Tour";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DescriptionIcon from "@mui/icons-material/Description";
import useSupercluster from "use-supercluster";

import Marker from "./Marker";
import Cluster from "./Cluster";

const Map = ({ objects, isClicked }) => {
  const coordinates = { lat: 52.237049, lng: 19.017532 };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [zoom, setZoom] = useState(7);
  const [bounds, setBounds] = useState(null);
  const [modalInfo, setModalInfo] = useState({});
  const mapRef = useRef();

  const open = Boolean(anchorEl);

  const points = objects.map((point) => ({
    type: "Feature",
    properties: {
      cluster: false,
      ...point,
    },
    geometry: {
      type: "Point",
      coordinates: [point.location.longitude, point.location.latitude],
    },
  }));

  // # get clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 150, maxZoom: 20 },
  });

  console.log("clusters", clusters);

  const handleModalShow = (id, event) => {
    // setModalInfo()
    // setIsOpen(true);

    console.log(id);
    const modalDataArray = clusters.filter(
      (cluster) => !cluster.properties.cluster && cluster.properties.id === id
    );

    console.log(modalDataArray[0].properties);
    setModalInfo(modalDataArray[0].properties);

    console.log(event);

    // setIsModalOpen(true);
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
        onChildClick={""}
        ref={mapRef}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters?.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <div
                lat={latitude}
                lng={longitude}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.setZoom(expansionZoom);
                  mapRef.current.panTo({ lat: latitude, lng: longitude });
                }}
              >
                {isClicked.car === true && (
                  <Cluster
                    key={cluster.properties.id}
                    lat={latitude}
                    lng={longitude}
                    id={cluster.properties.id}
                    discriminator="vehicle"
                    pointCount={pointCount}
                    pointsSize={points.length}
                  />
                )}
                {isClicked.parking === true && (
                  <Cluster
                    key={cluster.properties.id}
                    lat={latitude}
                    lng={longitude}
                    id={cluster.properties.id}
                    discriminator="parking"
                    pointCount={pointCount}
                    pointsSize={points.length}
                  />
                )}
                {isClicked.poi === true && (
                  <Cluster
                    key={cluster.properties.id}
                    lat={latitude}
                    lng={longitude}
                    id={cluster.properties.id}
                    discriminator="poi"
                    pointCount={pointCount}
                    pointsSize={points.length}
                  />
                )}
              </div>
            );
          }

          return (
            <div
              lat={latitude}
              lng={longitude}
              onClick={(e) => {
                console.log(e.currentTarget);
                if (anchorEl === null) {
                  handleModalShow(cluster.properties.id, e);
                  setAnchorEl(e.currentTarget);
                } else setAnchorEl(null);
              }}
            >
              <Marker
                key={cluster.properties.id}
                lat={latitude}
                lng={longitude}
                name={cluster.properties.name}
                id={cluster.properties.id}
                discriminator={cluster.properties.discriminator}
                // animation={anchorEl !== null}
                clickedEl={anchorEl}
              ></Marker>
              {
                <Popover
                  anchorEl={anchorEl}
                  open={open}
                  anchorOrigin={{
                    vertical: -13,
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  elevation={2}
                >
                  <Typography
                    sx={{
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "#1975d2 ",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {modalInfo.name}
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    textAlign="center"
                    alignItems="center"
                  >
                    {/* TODO: wyświetlanie informacji modalInfo?.category ? _.battery ? _.costam - zeby pasowalo do wszystkich w zaleznosci od dostepnosci */}
                    <Grid item xs={2}>
                      <DescriptionIcon fontSize="large" xs={2} />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography sx={{ p: 2 }}>
                        {modalInfo.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <DescriptionIcon fontSize="large" xs={2} />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography sx={{ p: 2 }}>
                        {modalInfo.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Popover>
              }
              {/* <Modal>
                  <Box>
                    <Typography variant="h6" component="h2">
                      {console.log(modalInfo.name)}
                    </Typography>
                  </Box>
                </Modal> */}
            </div>
          );
        })}
      </GoogleMapReact>

      {/* {isOpen && (
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
              )} */}
    </div>
  );
};

export default Map;
