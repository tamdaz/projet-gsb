import api from "./api";

/**
 * Obtenir, de manière asyncrone, les informations du visiteur.
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
        console.error("Une erreur s'est produite : ", err);
    }
}