import api from "./api";

/**
 * Obtenir, de manière asyncrone, des informations sur les médecins par leurs noms.
 * Utilisé pour l'autocomplétion.
 * 
 * @param {string} nom Nom du médecin
 */
export async function getMedecinsParNom(nom) {
    try {
        const response = await api.get(`/medecins?nom=${nom}`);

        return response;
    } catch (err) {
        console.log("Une erreur s'est produite : ", err);
    }
}

/**
 * Obtenir, de manière asyncrone, des informations sur les médecins.
 */
export async function getMedecins() {
	try {
        const response = await api.get(`/medecins?nom=`);

        return response;
    } catch (err) {
        console.log("Une erreur s'est produite : ", err);
    }
}
