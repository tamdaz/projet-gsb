import axios from "axios";

/**
 * Permet de se connecter à l'API de GSB.
 * 
 * Bientôt, la variable de l'API d'URL sera mis dans le fichier .env
 * afin de la changer facilement.
 */
export default axios.create({
    baseURL: "http://127.0.0.1/restGSB"
})