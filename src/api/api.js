import axios from "axios";

/**
 * Permet de se connecter à l'API de GSB.
 * 
 * Bientôt, la variable de l'API d'URL sera mis dans le fichier .env
 * afin de la changer facilement.
 */
export default axios.create({
    baseURL: import.meta.env.VITE_API_URL
})