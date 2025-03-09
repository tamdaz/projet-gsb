import React from "react";
import { useOutletContext } from "react-router-dom";
import { ajouterRapport, modifierRapport } from "../../../api/rapports";
import Alert from "../../Alert";

/**
 * Représente le formulaire pour l'ajout / modification d'un rapport.
 */
export default function FormulaireRapport() {
    const [status, setStatus] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    const [medecinTrouvee, choix, dataVisiteur] = useOutletContext();

    /**
     * Soumettre le formulaire pour l'ajout / modification d'un rapport.
     * @param {Event} e Évènement
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        let data = Object.fromEntries(new FormData(e.target));

        data.idMedecin = medecinTrouvee.id;
        data.idVisiteur = dataVisiteur.id
        
        if (choix === "ajouter") {
            ajouterRapport(data).then(res => {
                if (res.status === 200) {
                    setStatus("success");
                    setMessage("Rapport ajouté avec succès.");
                } else {
                    setStatus("error");
                    setMessage("Une erreur s'est produite lors de l'ajout d'un rapport.");
                }
            })
        } else if (choix === "modifier") {
            modifierRapport(data).then(res => {
                if (res.status === 200) {
                    setStatus("success");
                    setMessage(res.data.message);
                } else {
                    setStatus("error");
                    setMessage("Une erreur s'est produite lors de la modification d'un rapport.");
                }
            })
        }
    }

    return <>
        {status !== null && message !== null ? <Alert title={message} /> : null}
        <span>Ajouter un rapport pour le médecin {medecinTrouvee.value}</span>
        <form onSubmit={handleSubmit}>
            <label>
                Date de visite :
                <input type="date" name="date" required />
            </label>
            <label>
                Motif :
                <input type="text" name="motif" required />
            </label>
            <label>
                Bilan :
                <textarea name="bilan" required></textarea>
            </label>
            <button type="submit" className="w-full">Ajouter un rapport</button>
        </form>
    </>
}
