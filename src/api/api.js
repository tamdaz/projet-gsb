import axios from "axios";

/**
 * Permet de se connecter à l'API de GSB.
 */
export default axios.create({
    baseURL: "http://172.16.61.61/restGSB"
})