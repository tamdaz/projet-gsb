import React from "react";
import { useOutletContext } from "react-router-dom";
import { getRapportsParDate, getRapportsParId } from "../../../api/rapports";
import Alert from "./../../../components/Alert";

export default function ModifierRapport() {
    const [status, setStatus] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    const [dateRapport, setDateRapport] = React.useState(null);
    const [dataVisiteur, medecinTrouvee] = useOutletContext();
    const [listeRapports, setListeRapports] = React.useState([]);

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
                    listeRapports.map((rapport, k) => {
                        return <tr key={`rapport-ligne-${k}`}>
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

    return <>
        {status !== null && message !== null ? <Alert title={message} /> : null}
        <label>
            Choisir la date :
            <div className="flex">
                <input type="date" onChange={(e) => setDateRapport(e.target.value)} value={dateRapport} />
            </div>
        </label>
        <br />
        { listeRapports.length !== 0 && <TableauRapports /> }
    </>
}