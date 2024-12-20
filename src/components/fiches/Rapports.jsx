import React from "react"
import { getRapports } from "../../api/rapports";

/**
 * Affiche des informations sur un médecin en question.
 */
export default function Rapports({ id }) {
  const [rapports, setRapports] = React.useState([]);

  React.useEffect(() => {
    getRapports(id).then(res => {
      setRapports(res.data);
    })
  }, []);

  return <table className="border w-full">
    <thead>
      <tr>
        <th className="border px-4 py-2 bg-blue-500 text-white">Date</th>
        <th className="border px-4 py-2 bg-blue-500 text-white">Motif</th>
        <th className="border px-4 py-2 bg-blue-500 text-white">Bilan</th>
        <th className="border px-4 py-2 bg-blue-500 text-white">Visiteur</th>
      </tr>
    </thead>
    <tbody>
      {
        rapports.map((v, k) => {
          return <tr key={`rapport-ligne-${k}`}>
            <td className="border px-4 py-2">{ new Date(v.date).toLocaleDateString() }</td>
            <td className="border px-4 py-2">{ v.motif }</td>
            <td className="border px-4 py-2">{ v.bilan }</td>
            <td className="border px-4 py-2">{ v.nom } { v.prenom }</td>
          </tr>
        })
      }
    </tbody>
  </table>
}