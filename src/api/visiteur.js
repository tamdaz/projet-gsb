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

/**
 * Permet de mettre à jour, de manière asyncrone, les informations du visiteur
 * auquel il s'est connecté.
 * @param medecin Informations du visiteur sous forme d'objet.
 */
export async function majVisiteur(medecin) {
  try {
    const response = await api.put(`/majVisiteur`, medecin);
    return response;
  } catch (err) {
    console.error("Une erreur s'est produite : ", err);
  }
}
