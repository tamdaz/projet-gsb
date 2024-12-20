import api from "./api";

/**
 * Permet de récupérer des rapports, de manière asyncrone.
 * @param id .
 */
export async function getRapports(id) {
  try {
    const response = await api.get(`/rapports/${id}`);
    return response;
  } catch (err) {
    console.error("Une erreur s'est produite : ", err);
  }
}