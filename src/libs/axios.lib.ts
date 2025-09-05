// create an axios instance for making http requests
import axios from "axios";

const httpClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Access-Control-Allow-Origin": true,
  },
});

export default httpClient;
