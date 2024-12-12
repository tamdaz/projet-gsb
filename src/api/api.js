import axios from "axios";

/**
 * Permet de se connecter à l'API de GSB.
 */
export default axios.create({
    baseURL: "http://127.0.0.1/restGSB"
})