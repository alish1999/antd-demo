import axios from "axios";

// Load environment variables
const GEO_DB_API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const GEO_DB_HOST = process.env.REACT_APP_RAPIDAPI_HOST;

const apiClient = axios.create({
  baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo",
  headers: {
    "X-RapidAPI-Key": GEO_DB_API_KEY,
    "X-RapidAPI-Host": GEO_DB_HOST,
  },
});

export const fetchCountries = async () => {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  return data.map((country) => ({
    name: country.name.common,
    code: country.cca2,
  }));
};

export const fetchCities = async (countryCode) => {
  try {
    const { data } = await apiClient.get(`/cities`, {
      params: {
        countryIds: countryCode,
        limit: 10,
      },
    });
    return data.data.map((city) => ({
      id: city.id,
      name: city.name,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
