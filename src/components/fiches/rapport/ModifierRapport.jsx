import React from "react";
import Alert from "./../../../components/Alert";
import { useOutletContext } from "react-router-dom";
import { getRapportsParDate, modifierRapport } from "../../../api/rapports";

export default function ModifierRapport() {
    const [status, setStatus] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    const [dateRapport, setDateRapport] = React.useState(null);
    const [listeRapports, setListeRapports] = React.useState([]);
    const [selectedRapport, setSelectedRapport] = React.useState({});
    const [dataVisiteur] = useOutletContext();

    React.useEffect(() => {
        if (dateRapport !== undefined) {
            const regexDate = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/

            if (regexDate.test(dateRapport)) {
                rechercherRapports();
                setStatus(null);
                setMessage(null);
            }
        }
    }, [dateRapport]);

    /**
     * Permet de rechercher des rapports une fois que la date est choisie.
     */
    const rechercherRapports = async () => {
        const rapportsTrouves = await getRapportsParDate(dataVisiteur.id, dateRapport);
        if (rapportsTrouves.data.length === 0) {
            setStatus("error");
            setMessage("Aucun rapport trouvé à cette date.");

            setTimeout(() => {
                setStatus(null);
                setMessage(null);
            }, 5000);
        } else {
            setStatus(null);
            setMessage(null);
        }

        setListeRapports(rapportsTrouves.data);
    }

    /**
     * Permet d'afficher un ensemble de rapports.
     */
    const TableauRapports = () => {
        const isRapportsEmpty = listeRapports.length === 0;
        const isRapportSelected = Object.keys(selectedRapport).length !== 0;

        if (isRapportsEmpty || isRapportSelected) {
            return null;
        }

        return <table className="border w-full">
            <thead>
                <tr>
                    <th className="border px-4 py-2 bg-blue-500 text-white">ID Rapport</th>
                    <th className="border px-4 py-2 bg-blue-500 text-white">Motif</th>
                    <th className="border px-4 py-2 bg-blue-500 text-white">Bilan</th>
                    <th className="border px-4 py-2 bg-blue-500 text-white">Medecin</th>
                </tr>
            </thead>
            <tbody>
                {
                    listeRapports != [] && listeRapports.map((rapport, k) => {
                        return <tr onClick={() => setSelectedRapport(rapport)} className="hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer" key={`rapport-ligne-${k}`}>
                            <td className="border px-4 py-2">{rapport.idRapport}</td>
                            <td className="border px-4 py-2">{rapport.motif}</td>
                            <td className="border px-4 py-2">{rapport.bilan}</td>
                            <td className="border px-4 py-2">{rapport.nomMedecin} {rapport.prenomMedecin}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    }

    /**
     * Permet de mettre à jour un rapport une fois le formulaire soumis.
     * @param {Event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        let data = Object.fromEntries(new FormData(e.target));
        data.idRapport = selectedRapport.idRapport;

        modifierRapport(data).then(res => {
            if (res.status === 200) {
                setStatus("success");
                setMessage("Rapport mis à jour avec succès.");
            } else {
                setStatus("error");
                setMessage("Une erreur s'est produite lors de la modification de ce rapport.");
            }
        });
    }

    /**
     * Permet d'afficher le formulaire.
     */
    const FormulaireRapport = () => {
        if (Object.keys(selectedRapport).length === 0) {
            return null;
        }

        return <form onSubmit={handleSubmit}>
            <label>
                Motif :
                <input type="text" name="motif" defaultValue={selectedRapport.motif} required />
            </label>
            <label>
                Bilan :
                <textarea name="bilan" defaultValue={selectedRapport.bilan} required></textarea>
            </label>
            <button type="submit" className="w-full">Ajouter un rapport</button>
        </form>
    }

    return <>
        {status !== null && message !== null ? <Alert title={message} /> : null}
        {
            Object.keys(selectedRapport).length === 0 && <label>
                Choisir la date :
                <div className="flex">
                    <input type="date" onChange={(e) => setDateRapport(e.target.value)} value={dateRapport} />
                </div>
                <br />
            </label>
        }
        <TableauRapports />
        <FormulaireRapport />
    </>
}