import axios from "axios";

/**
 * Permet de se connecter à l'API de GSB.
 */
export default axios.create({
  baseURL: import.meta.env.VITE_API_URL
})