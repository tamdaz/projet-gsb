import React from "react";
import Alert from "./../../components/Alert";
import { useOutletContext } from "react-router-dom";
import { majVisiteur } from "../../api/visiteur";

export default function Visiteur() {
    // Statut de l'alerte.
    const [status, setStatus] = React.useState(null);

    // Message de l'alerte.
    const [message, setMessage] = React.useState(null);

    // Données du visiteur venant du composant parent (Accueil).
    const [dataVisiteur, setDataVisiteur] = useOutletContext();

    /**
     * Effectuer une mise à jour des informations du visteur concerné.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convertit les informations saisis dans le formulaire en JSON.
        let data = Object.fromEntries(new FormData(e.target));
        data.id = dataVisiteur.id;

        const response = await majVisiteur(data);

        try {
            setStatus("success");
            setMessage(response.data.message);
            setDataVisiteur(data);
        } catch {
            setStatus("error");
            setMessage("Une erreur s'est produite lors de la mise à jour de vos informations personnelles.");
        }

        setTimeout(() => {
            setStatus(null);
            setMessage(null);
        }, 5000);
    }

    return <>
        <h2 className="text-2xl mb-2">Modifier vos informations personnelles</h2>
        {status !== null && message !== null ? <Alert title={message} status={status} /> : null}
        <form onSubmit={handleSubmit} method="post">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <label>
                    Nom :
                    <input
                        type="text" name="nom"
                        defaultValue={dataVisiteur.nom ?? ""}
                    />
                </label>
                <label>
                    Prénom :
                    <input
                        type="text" name="prenom"
                        defaultValue={dataVisiteur.prenom ?? ""}
                    />
                </label>
                <label className="col-span-2">
                    Adresse :
                    <input
                        type="text" name="adresse"
                        defaultValue={dataVisiteur.adresse ?? ""}
                    />
                </label>
                <label>
                    Code postal :
                    <input
                        type="text" name="cp"
                        defaultValue={dataVisiteur.cp ?? ""}
                    />
                </label>
                <label>
                    Ville :
                    <input
                        type="text" name="ville"
                        defaultValue={dataVisiteur.ville ?? ""}
                    />
                </label>
            </div>
            <button type="submit" className="w-full">Mettre à jour</button>
        </form>
    </>
}