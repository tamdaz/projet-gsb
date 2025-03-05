import axios from "axios";

/**
 * Permet de se connecter à l'API de GSB.
 * 
 * Bientôt, la variable de l'API d'URL sera mis dans le fichier .env
 * afin de la changer facilement.
 */
export default axios.create({
    baseURL: "http://172.20.10.2/restGSB"
})