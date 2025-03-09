import api from "./api";

/**
 * Permet de récupérer des rapports, de manière asyncrone.
 * @param id
 */
export async function getRapports(id) {
  try {
    const response = await api.get(`/rapports/${id}`);
    return response;
  } catch (err) {
    console.error("Une erreur s'est produite : ", err);
  }
}

/**
 * Permet de récupérer des rapports, de manière asyncrone.
 * @param id
 */
export async function getRapportsParId(id) {
  try {
    const response = await api.get(`/rapport/${id}`);
    return response;
  } catch (err) {
    console.error("Une erreur s'est produite : ", err);
  }
}

/**
 * Permet d'ajouter un rapport.
 * @param data 
 */
export async function ajouterRapport(data) {
  try {
    const response = await api.put(`/ajouterRapport`, data);
    return response;
  } catch (err) {
    console.error("Une erreur s'est produite : ", err);
  }
}

/**
 * Permet d'ajouter un rapport.
 * @param data 
 */
export async function modifierRapport(data) {
  try {
    const response = await api.put(`/majRapports`, data);
    return response;
  } catch (err) {
    console.error("Une erreur s'est produite : ", err);
  }
}