import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./Map.module.scss";
import mapStyles from "./mapStyles";

import { Tooltip, Modal, Box, Typography } from "@mui/material";
import { useState, useRef } from "react";

import TourIcon from "@mui/icons-material/Tour";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import useSupercluster from "use-supercluster";

import Marker from "./Marker";
import Cluster from "./Cluster";

const Map = ({ objects, isClicked }) => {
  const coordinates = { lat: 52.237049, lng: 19.017532 };
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(7);
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef();

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
            <Marker
              key={cluster.properties.id}
              lat={latitude}
              lng={longitude}
              name={cluster.properties.name}
              id={cluster.properties.id}
              discriminator={cluster.properties.discriminator}
            />
          );
        })}
        {/* {objects?.map((place, i) => {
          return (
            <Marker
              key={place.id}
              lat={place.location.latitude}
              lng={place.location.longitude}
              name={place.id}
              id={place.id}
              discriminator={place.discriminator}
            />
          );
        })} */}
      </GoogleMapReact>

      {/* <div
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
            </div> */}
    </div>
  );
};

export default Map;
