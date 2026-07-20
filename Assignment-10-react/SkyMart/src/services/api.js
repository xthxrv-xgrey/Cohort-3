import axios from "axios";

export const api = {
  get: (url) => axios.get(url),
};
