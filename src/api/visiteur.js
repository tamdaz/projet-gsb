import api from "./api";

/**
 * Retourne, de manière asyncrone, les informations du visiteur.
 * 
 * @param {string} login Nom d'utilisateur (ou nom du visiteur)
 * @param {string} mdp Mot de passe
 */
export async function getVisiteur(login, mdp) {
    try {
        const response = await api.get('/connexion', {
            params: { login, mdp }
        })

        return response;
    } catch (err) {
        console.log("Une erreur s'est produite : ", err);
    }
}