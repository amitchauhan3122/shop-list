import axios from "axios";
import { AUTH_HEADER_NAME, BASE_URL } from "../constant";

// export default createAPI();
const createAPI = () => {
  const apiHeader = {
    "Content-Type": "application/json",
  };

  const api = axios.create({
    baseURL: "https://628f5d070e69410599db165c.mockapi.io/api/v1/",
    headers: apiHeader,
  });

  return api;
};
export default createAPI();
