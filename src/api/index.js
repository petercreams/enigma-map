import axios from "axios";

export const getData = async ({ car, parking, poi }) => {
  let name;
  if (car) name = "VEHICLE";
  else if (parking) name = "PARKING";
  else if (poi) name = "POI";
  const URL = `https://dev.vozilla.pl/api-client-portal/map?objectType=${name}`;

  try {
    const {
      data: { objects: result },
    } = await axios.get(URL);
    return result;
  } catch (error) {
    console.log(error);
  }
};
